<template>
	<div class="pages">
		<!-- <img class="bg-img" src="../cm_static/costMoney.png" alt="" /> -->
		<div class="bg-box">
			<div class="dynamic">
				<img class="dy-img" :src="bottleUserInfo.avatar" alt="" />
				<div class="dy-name">{{ bottleUserInfo.username }}</div>
			</div>
			<!-- 文本内容 -->
			<div class="content">
				<div class="content-c">{{ bottleInfo.content }}</div>
				<video
					v-if="aImgList.length === 0 && avideo"
					:src="avideo"
				></video>
				<u-album
					v-if="
						aImgList.length !== 0 && !avideo && aImgList.length > 4
					"
					:urls="aImgList"
					singleSize="300rpx"
					multipleSize="120rpx"
				></u-album>
				<div
					class="ua-box"
					v-if="
						aImgList.length !== 0 &&
						!avideo &&
						aImgList.length < 5 &&
						aImgList.length > 1
					"
				>
					<u-album
						:urls="aImgList"
						singleSize="300rpx"
						multipleSize="140rpx"
						rowCount="2"
					></u-album>
				</div>
				<image
					class="singleImg"
					v-if="aImgList.length === 1"
					:src="aImgList"
					mode="widthFix"
					@click="previewImg"
				></image>
			</div>
			<!-- 回复 -->
			<div v-for="i in recordsList" :key="i.uid" class="record-box">
				<div v-if="i.comment" class="dynamic record-userinfo">
					<img
						class="dy-img"
						:src="type !== 0 ? i.avatar : i.userInfo.avatar"
						alt=""
					/>
					<div class="dy-name record-comment">{{ i.comment }}</div>
				</div>
				<div class="action-box">
					<div
						v-if="type === 1 && !i.comment"
						class="action-btns record-then"
						@click="showInput = true"
					>
						回复
					</div>
					<div
						v-if="type === 1"
						class="action-btns pick-again"
						@click="showPickAgain = true"
					>
						再捡一次
					</div>
					<div
						v-if="type !== 1 && i.comment"
						class="action-btns open-chat"
						@click="goChatWith(i)"
					>
						开启私聊
					</div>
				</div>
			</div>
		</div>

		<!-- 底部输入栏 -->
		<!-- <view
			v-show="showInput"
			class="input-box cu-bar tabbar"
			@touchmove.stop.prevent="discard"
			:style="{ bottom: messBotton + 'px' }"
		>
			<view class="textbox">
				<view class="text-mode" :class="isVoice ? 'hidden' : ''">
					<view class="box">
						<view class="box">
							<textarea
								placeholder="回复这个漂流瓶..."
								auto-height="true"
								v-model="recordsList[0].comment"
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
			<view
				class="send"
				:class="isVoice ? 'hidden' : ''"
				@click="sendText"
				><view class="btn">发送</view></view
			>
		</view> -->
		<!-- 输入栏背景 -->
		<!-- <div
			v-if="showInput"
			class="cancel-input"
			@click="showInput = false"
		></div> -->
		<!-- 再捡一次 -->
		<!-- <u-modal
			:show="showPickAgain"
			title=" "
			content="确定花费5个星星再捡一次？"
			@confirm="confirmPickAgain"
			showCancelButton
			@cancel="showPickAgain = false"
			confirmColor="#e89406"
		></u-modal> -->
	</div>
</template>

<script>
import {
	detailPickBottle,
	detailLostBottle,
	commentBottle,
	pickBottle
} from '@/api/currentBottle.js'
import { checkContent } from '@/api/artcleIssue.js'
import { bottleRecord } from '@/api/currentBottle.js'
import { mapGetters, mapMutations, mapState } from 'vuex'

const app = getApp()

export default {
	computed: {
		...mapState(['uid'])
	},
	data() {
		return {
			ws: '',
			//帖子id
			id: '',
			//0 我丢的 1 我捡到的 2别人捡到我的
			type: null,
			bottleUserInfo: {},
			createTime: '',
			bottleInfo: {},
			aImgList: [],
			avideo: '',
			userInfo: {},
			recordsList: [],
			showInput: false,
			showPickAgain: false,
			messBotton: 0
		}
	},
	onLoad(option) {
		this.ws = app.globalData.ws
		this.id = Number(option.i)
		this.type = Number(option.type)
		this.detailLostOrPickBottle()
		if (this.type === 0) {
			this.getBottleRecord()
		}
	},
	methods: {
		//获取详情
		async detailLostOrPickBottle() {
			let res =
				this.type === 0
					? await detailLostBottle({ id: this.id })
					: await detailPickBottle({ id: this.id })
			console.log('漂流瓶内容详情')
			console.log(res)
			if (res.code !== 0) {
				uni.$u.toast(res.msg)
				return
			}
			if (this.type === 1 || this.type === 2) {
				//单人回复
				this.bottleUserInfo = res.result.bottleUserInfo
				this.createTime = res.result.createTime
				this.bottleInfo = res.result.bottleInfo
				this.bottleInfo.media = JSON.parse(this.bottleInfo.media) || []
				this.recordsList = [
					{ ...res.result.userInfo, comment: res.result.comment }
				]
			} else if (this.type === 0) {
				//所有回复
				this.bottleUserInfo = res.result.userInfo
				this.bottleInfo = res.result
				this.bottleInfo.media = JSON.parse(this.bottleInfo.media) || []
			}

			if (this.bottleInfo.media.length === 0) {
				return
			}
			let medias = this.bottleInfo.media[0]
			let zhengze = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/
			if (zhengze.test(medias)) {
				this.aImgList = this.bottleInfo.media
			} else {
				this.avideo = this.bottleInfo.media[0]
			}
		},
		getBottleRecord() {
			bottleRecord({ page: 1, limit: 10000, bottleId: this.id }).then(
				(res) => {
					console.log('请求我的瓶子的所有回复')
					console.log(res)
					this.recordsList = res.result.records
				}
			)
		},
		async sendText() {
			if (!this.recordsList[0].comment) {
				uni.$u.toast('不可以回复空文字噢')
				return
			}
			uni.showLoading({
				title: '回复发表中'
			})
			let res = await checkContent({
				content: this.recordsList[0].comment
			})
			if (res.code !== 0 || res.result.errcode !== 0) {
				uni.hideLoading()
				uni.$u.toast('发布的内容包含违规信息，请修改')
				return
			}
			this.sendReallyText()
		},
		//真发送文字
		async sendReallyText() {
			let res = await commentBottle({
				id: this.id,
				comment: this.recordsList[0].comment
			})
			console.log('发送文字')
			console.log(res)
			this.showInput = false
			if (res.code !== 0) {
				uni.$u.toast(res.msg)
				return
			}
			uni.$u.toast('回复成功')
			var content = {
				fromUid: this.recordsList[0].uid,
				toUid: this.bottleUserInfo.uid,
				text: this.recordsList[0].comment,
				type: 'bottle'
			}
			this.ws.send({
				data: JSON.stringify(content),
				success: () => {
					console.log('ws漂流瓶回复消息发送成功')
				}
			})
		},
		// 再捡
		confirmPickAgain() {
			pickBottle().then((res) => {
				console.log('再捡一次瓶子')
				console.log(res)
				this.showPickAgain = false
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					return
				}
				this.id = res.result.bottleRecordId
				this.detailLostOrPickBottle()
			})
		},
		goChatWith(i) {
			console.log(9999, i)
			let ocateId = this.type === 2 ? i.cateId : i.userInfo.cateId
			uni.navigateTo({
				url:
					'../chatWith/chatWith?ouid=' +
					i.uid +
					'&&ocateId=' +
					ocateId
			})
		},
		//单图预览
		previewImg() {
			uni.previewImage({
				current: this.aImgList[0], // 当前显示图片的http链接
				urls: this.aImgList // 需要预览的图片http链接列表
			})
		},
		inputHight(e) {
			this.messBotton = e.detail.height
		},
		inputLow(e) {
			this.messBotton = 0
		},
		inputLine(e) {}
	}
}
</script>

<style lang="less">
.pages {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}
.pages::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #fff6e5;
	z-index: -1;
}
.bg-img {
	position: absolute;
	flex-wrap: wrap;
	width: 750rpx;
	height: 1280rpx;
	top: 0;
	left: 0;
	z-index: -1;
}
.bg-box {
	position: relative;
	width: 692rpx;
	max-height: 1000rpx;
	background: #ffffff;
	border-radius: 48rpx;
	border: 4rpx solid #556eef;
	margin: auto;
	padding: 50rpx;
	box-sizing: border-box;
	overflow-y: auto;
	white-space: pre-wrap;
	word-wrap: break-word;
}
.dynamic {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	.dy-img {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}
	.dy-name {
		font-size: 32rpx;
		margin: 0 20rpx;
	}
}
.content {
	font-size: 32rpx;
	overflow: hidden;
	video {
		width: 100%;
	}
	.content-c {
		margin: 20rpx 0;
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
.record-box {
	margin-top: 20rpx;
}
.record-userinfo {
	flex-direction: row-reverse;
	align-items: flex-start;
	.record-comment {
		width: 478rpx;
		padding: 10rpx;
		background: #e6e6e6;
		border-radius: 16rpx;
		margin-top: 16rpx;
	}
}
.action-box {
	display: flex;
	justify-content: space-around;
	margin-top: 38rpx;
	.action-btns {
		width: 280rpx;
		height: 88rpx;
		font-size: 40rpx;
		color: #ffffff;
		font-weight: 700;
		text-align: center;
		line-height: 2;
		border-radius: 44rpx;
		box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
	}
	.record-then {
		background: #ff7d05;
	}
	.pick-again {
		background: #049dfc;
	}
	.open-chat {
		background: #251eff;
	}
}
//------------------------
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
//--------------
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
	width: 300rpx;
}
</style>
