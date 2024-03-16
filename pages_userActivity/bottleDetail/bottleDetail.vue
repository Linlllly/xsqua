<template>
	<div class="pages">
		<img
			class="bg-img"
			:src="
				type === 0
					? 'https://www.zairongyifang.com:8080/filePath/resource/xkj/3.png'
					: 'https://www.zairongyifang.com:8080/filePath/resource/xkj/6.png'
			"
			alt=""
		/>
		<div class="bg-box">
			<div class="bottle-box">
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
							aImgList.length !== 0 &&
							!avideo &&
							aImgList.length > 4
						"
						:urls="aImgList"
						singleSize="300rpx"
						multipleSize="140rpx"
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
							multipleSize="180rpx"
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
						<div class="dy-name record-comment">
							{{ i.comment }}
						</div>
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
							@click="pickBottle()"
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
		</div>
		<!-- 回复弹窗 -->
		<u-popup
			:show="showInput"
			:round="20"
			:closeOnClickOverlay="false"
			mode="center"
			:safeAreaInsetBottom="false"
		>
			<div class="pop-borders pop-input">
				<div class="input-text">
					<textarea
						placeholder="回复这个漂流瓶..."
						v-model="recordsList[0].comment"
						@focus="inputHight"
						:adjust-position="false"
						@blur="inputLow"
						maxlength="300"
						:show-confirm-bar="false"
						@linechange="inputLine"
					/>
				</div>

				<div class="pop-btn-box">
					<div class="pop-oks" @click="sendText">回复</div>
					<div
						class="pop-cencels"
						@click="
							showInput = false
							recordsList[0].comment = ''
						"
					>
						取消
					</div>
				</div>
			</div>
		</u-popup>

		<!-- 再捡一次 -->
		<u-popup
			:show="showPickAgain"
			:round="20"
			:closeOnClickOverlay="false"
			mode="center"
			:safeAreaInsetBottom="false"
		>
			<div class="pop-borders pop-pick">
				<div class="pick-text">每次捡漂流瓶都须送出五颗星星</div>
				<div class="pop-btn-box">
					<div
						class="pop-oks"
						@click="
							showPickAgain = false
							second = false
							pickBottle()
						"
					>
						确定
					</div>
					<div class="pop-cencels" @click="showPickAgain = false">
						取消
					</div>
				</div>
			</div>
		</u-popup>
	</div>
</template>

<script>
import {
	detailPickBottle,
	detailLostBottle,
	commentBottle,
	pickBottle,
	todayCount
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
	onShow() {
		this.getTodayCount()
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
			console.log(this.recordsList[0].uid)
			console.log(this.bottleUserInfo.uid)
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
		async getTodayCount() {
			let res = await todayCount()
			console.log('请求今日捡瓶子数量')
			console.log(res)
			if (res.code !== 0) {
				uni.$u.toast(res.msg)
				return
			}
			this.second = res.result === 2 ? true : false
		},
		pickBottle() {
			if (this.second) {
				this.showPickAgain = true
				return
			}
			pickBottle().then((res) => {
				console.log('再捡一次瓶子')
				console.log(res)
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					return
				}

				this.showPickAgain = false
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
	height: 100vh;
}
.bg-img {
	position: absolute;
	flex-wrap: wrap;
	width: 750rpx;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: -1;
}
.bg-box {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.bottle-box {
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
}
.record-box {
	margin-top: 20rpx;
}
.record-userinfo {
	flex-direction: row-reverse;
	align-items: flex-start;
	.record-comment {
		width: 430rpx;
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
.pop-input {
	width: 597rpx;
	height: 470rpx;
	.input-text {
		width: 80%;
		background-color: #f2f2f2;
		margin: 30rpx auto;
		padding: 20rpx;
		border-radius: 24rpx;
		box-sizing: border-box;
	}
}
/deep/textarea {
	width: 100%;
}
.pop-pick {
	width: 629rpx;
	height: 230rpx;
	.pick-text {
		text-align: center;
		margin: 40rpx;
	}
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
	width: 300rpx;
}
</style>
