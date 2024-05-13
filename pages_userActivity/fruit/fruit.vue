<template>
	<div class="pages">
		<!-- banner -->
		<div v-if="list1.length" class="banner-box">
			<u-swiper
				:list="list1"
				keyName="img"
				height="220rpx"
				:interval="5000"
				:duration="400"
				:circular="true"
				@click="goOwnPageOrThirdParty()"
			></u-swiper>
		</div>
		<div class="slot-machine">
			<img
				class="slot-bg-img"
				src="https://www.zairongyifang.com:8080/filePath/app/20243/compressed_9d3c46a876.png"
				alt=""
			/>
			<!-- <img class="slot-content-img" src="https://www.zairongyifang.com:8080/filePath/resource/xkj/5.png" alt="" /> -->
			<div style="width: 100%; height: 310rpx"></div>
			<SlotMachine
				v-show="lookSlotMachine"
				ref="myLucky"
				width="510rpx"
				height="180rpx"
				:blocks="blocks"
				:slots="slots"
				:prizes="prizes"
				:defaultConfig="defaultConfig"
				@end="endCallBack"
			/>
			<view
				v-show="bottingAgain"
				class="slot-btn"
				@click="botting"
			></view>
		</div>
		<div class="play-intro">
			<div>玩法说明</div>
			<div>1、每次下注不低于5颗星星即可参与水果拼盘；</div>
			<div>2、当3个画面都是苹果时，则抽中“飞天茅台500ml ”1瓶；</div>
			<div>3、当3个画面都是西瓜时，则获得您下注星星数量的10倍；</div>
			<div>4、当3个画面都是香蕉时，则获得您下注星星数量的5倍；</div>
			<div>5、当3个画面都是樱桃时，则获得您下注星星数量的2倍；</div>
			<div>6、当3个画面都是葡萄时，则获得您下注星星数量的1倍；</div>
			<div>7、当3个画面不完全一样时，即未中奖。</div>
			<div class="play-record" @click="toPrizeRecordList">
				<img src="../../static/send-list.png" alt="" />
				<div>我的奖品</div>
			</div>
		</div>
		<div class="record-btn">中奖榜单</div>
		<div class="record-list">
			<div class="record" v-for="i in allPrizeRecordList" :key="i">
				{{ i.userInfo.username }}抽中了
				{{
					i.prizeInfo.type === 1
						? i.prizeInfo.name
						: i.prizeInfo.starTimes * i.starNum + '星星'
				}}
			</div>
			<div class="record">....</div>
		</div>
		<!-- 兑换 -->
		<!-- <img class="get-gift" @click="showClaim = true" src="https://www.zairongyifang.com:8080/filePath/app/20243/compressed_504220fbd4.png" alt="" /> -->

		<!-- 确认兑换 -->
		<u-popup
			:show="showClaim"
			:round="20"
			:closeOnClickOverlay="false"
			mode="center"
			:safeAreaInsetBottom="false"
		>
			<div class="pop-borders pop-claim">
				<div class="claim-text">25W颗星星换茅台</div>
				<div class="pop-btn-box">
					<div
						class="pop-oks claim-oks"
						@click="getExchangeMaoTaiCheck"
					>
						确定
					</div>
					<div
						class="pop-cencels claim-cencels"
						@click="showClaim = false"
					>
						取消
					</div>
				</div>
			</div>
		</u-popup>
		<!-- 填写收货信息弹窗 -->
		<u-modal
			title="填写收货信息"
			:show="showGetMaterial"
			@confirm="confirmGetMaterial"
			:showCancelButton="!prizeInfo.id"
			@cancel="showGetMaterial = false"
			confirmColor="#e89406"
		>
			<view class="slot-content">
				<u--form
					labelPosition="left"
					:model="materialForm"
					ref="materialForm"
					id="materialForm"
					:rules="rules"
					labelWidth="120rpx"
					:labelStyle="{ color: '#515151' }"
				>
					<u-form-item label="姓名" prop="name"
						><u-input
							border="none"
							placeholder="姓名"
							v-model="materialForm.name"
						></u-input
					></u-form-item>
					<u-form-item label="联系电话" prop="mobile"
						><u-input
							:type="number"
							border="none"
							placeholder="联系电话"
							v-model="materialForm.mobile"
						></u-input
					></u-form-item>
					<u-form-item label="收货地址" prop="address">
						<u--textarea
							placeholder="收货地址"
							v-model="materialForm.address"
							:confirmType="null"
							style="white-space: pre-wrap"
							autoHeight
							border="none"
							:show-confirm-bar="false"
							maxlength="-1"
						></u--textarea>
					</u-form-item>
				</u--form>
			</view>
		</u-modal>
		<!-- 下注弹窗 -->
		<u-popup
			:show="showBotting"
			:round="20"
			:closeOnClickOverlay="false"
			mode="center"
			:safeAreaInsetBottom="false"
		>
			<div class="pop-borders pop-botting">
				<img class="botting-img" src="../../static/money.png" alt="" />
				<u--input
					type="number"
					placeholder="5以上的数额"
					border="null"
					clearable
					shape="circle"
					placeholderStyle="color:#fff"
					color="#000"
					inputAlign="center"
					v-model="startNum"
					:min="5"
				></u--input>

				<div class="botting-intro">5-10000颗星星</div>
				<div class="pop-btn-box">
					<div
						class="pop-oks claim-oks"
						@click="
							showBotting = false
							startCallBack()
						"
					>
						下注
					</div>
					<div
						class="pop-cencels claim-cencels"
						@click="showBotting = false"
					>
						取消
					</div>
				</div>
			</div>
		</u-popup>
		<!-- 中奖弹窗 -->
		<u-popup
			:show="showGetGift"
			:round="20"
			:closeOnClickOverlay="false"
			mode="center"
			:safeAreaInsetBottom="false"
		>
			<div
				class="pop-borders"
				:class="prizeInfo ? 'pop-prize' : 'pop-prize-no'"
			>
				<img
					class="prize-top-img"
					:src="
						prizeInfo
							? '../../static/prize-has.png'
							: '../../static/prize-no-has.png'
					"
					alt=""
				/>
				<div
					class="prize-title"
					:style="{ color: prizeInfo ? '#F86200' : '#3E3E3E' }"
				>
					{{ prizeInfo ? '恭喜您抽中' : '未中奖' }}
				</div>
				<img
					v-if="prizeInfo && prizeInfo.type === 1"
					class="prize-has-img"
					src="../../static/money.png"
					alt=""
				/>
				<div
					v-if="prizeInfo && prizeInfo.type !== 1"
					class="prize-text"
				>
					{{ startNum * prizeInfo.starTimes }}星星
				</div>
				<img
					v-if="!prizeInfo || !prizeInfo.id"
					class="prize-no-img"
					src="../../static/prize-no-img.png"
					alt=""
				/>
				<div class="pop-btn-box">
					<div class="pop-cencels" @click="confirmGetGift">确定</div>
				</div>
				<img
					class="prize-bottom-img prize-close-img"
					src="../../static/prize-close.png"
					alt=""
					@click="confirmGetGift"
				/>
			</div>
		</u-popup>
	</div>
</template>

<script>
import { banner, randomRoom } from '@/api/index.js'
import {
	prize,
	draw,
	prizeRecord,
	allPrizeRecord,
	receive,
	exchangeMaoTaiCheck,
	exchangeMaoTai
} from '@/api/game.js'
import { list } from '@/api/areaSelect.js'
import { mapGetters, mapMutations, mapState } from 'vuex'
import RankingList from '@/components/rankingList/rankingList.vue'
import SlotMachine from '@/components/@lucky-canvas/uni/slot-machine'
import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup'
export default {
	computed: {
		...mapState(['uid', 'house']),
		lookSlotMachine() {
			if (!this.firstLookSlotMachine) {
				return true
			} else {
				if (
					this.showClaim ||
					this.showGetMaterial ||
					this.showBotting ||
					this.showGetGift
				) {
					return false
				} else {
					return true
				}
			}
		}
	},
	components: {
		RankingList,
		SlotMachine
	},
	data() {
		return {
			blocks: [],
			slots: null,
			linshiSlots: null,
			defaultConfig: {
				rowSpacing: '22px',
				colSpacing: '22px'
			},
			//地区列表
			areaList: [],
			list1: [],
			//所有用户中奖列表
			allPrizeRecordList: [],
			//奖品列表
			prizeList: [],
			prizes: [],
			//兑换
			showClaim: false,
			//实物地址
			showGetMaterial: false,
			materialForm: { name: '', mobile: '', address: '' },
			//下注
			showBotting: false,
			bottingAgain: true,
			startNum: 10,
			//中奖
			showGetGift: false,
			nowPriceId: null,
			prizeInfo: null,
			firstLookSlotMachine: true,
			prizeToAddress: false,
			rules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				mobile: [
					{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur'
					},
					{
						pattern: /^1[3-9]\d{9}$/,
						message: '电话号码格式不正确',
						trigger: 'blur'
					}
				],
				address: [
					{
						required: true,
						message: '请输入收货地址',
						trigger: 'blur'
					}
				]
			}
		}
	},

	onLoad() {
		this.getPrizeList()
		this.getAllPrizeRecord()
		this.getBanner()
		this.getList()
	},
	methods: {
		...mapMutations(['updateUid']),
		getMyPrize() {
			prizeRecord({ page: 1, limit: 10 }).then((res) => {
				console.log('我的中奖记录')
				console.log(res)
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					return
				}
			})
		},
		getExchangeMaoTaiCheck() {
			exchangeMaoTaiCheck().then((res) => {
				console.log('判断是否有资格兑换')
				console.log(res)
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					return
				}
				this.showClaim = false
				this.showGetMaterial = true
				this.materialForm = { name: '', mobile: '', address: '' }
			})
		},
		getAllPrizeRecord() {
			allPrizeRecord({ page: 1, limit: 30 }).then((res) => {
				console.log('获取所有抽奖的人')
				console.log(res)
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					return
				}
				this.allPrizeRecordList = res.result.records
					.filter((record) => record.prizeInfo)
					.slice(0, 3)
			})
		},
		getPrizeList() {
			prize().then((res) => {
				console.log('获取奖品列表')
				console.log(res)
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					return
				}
				this.prizeList = res.result
				const length = this.prizeList.length
				this.slots = [
					{
						order: Array.from({ length: length }, (_, i) => i),
						direction: 1
					},
					{
						order: Array.from({ length: length }, (_, i) => i),
						direction: -1
					},
					{
						order: Array.from({ length: length }, (_, i) => i),
						direction: 1
					}
				]
				this.slots[1].order.push(this.slots[1].order.shift())
				this.slots[2].order.push(
					this.slots[2].order.shift(),
					this.slots[2].order.shift()
				)
				this.prizes = this.prizeList.map((prize, index) => {
					const image = {
						width: '80%',
						height: '80%',
						top: '8%',
						src: prize.imageUrl
					}
					return {
						imgs: [image]
					}
				})
			})
		},
		//实物
		confirmGetMaterial() {
			this.$refs.materialForm
				.validate()
				.then((res) => {
					const request = this.prizeInfo.id
						? receive({
								id: this.nowPriceId,
								...this.materialForm
						  })
						: exchangeMaoTai(this.materialForm)
					request.then((res) => {
						if (res.code !== 0) {
							uni.$u.toast(res.msg)
							return
						}
						uni.$u.toast('信息已提交，等待后台发货')
						this.showGetMaterial = false
						this.prizeToAddress = false
						this.prizeInfo = null
						this.nowPriceId = null
					})
				})
				.catch((errors) => {
					uni.$u.toast('校验失败')
				})
		},
		//下注/填写地址
		botting() {
			if (this.prizeToAddress) {
				this.showGetMaterial = true
				return
			}
			this.showBotting = true
		},
		//抽奖开始和结束
		startCallBack() {
			if (!this.startNum || this.startNum < 5 || this.startNum > 10000) {
				uni.$u.toast('请输入5~10000数值的星星')
				return
			}
			draw({ num: this.startNum }).then((res) => {
				console.log('点击抽奖')
				console.log(res)
				this.bottingAgain = false
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					this.bottingAgain = true
					return
				}
				this.firstLookSlotMachine = false
				this.$refs.myLucky.play()
				this.prizeInfo = res.result.prizeInfo
				this.nowPriceId = res.result.id
				this.prizeToAddress =
					res.result.prizeInfo?.type === 1 ? true : false
				let results
				if (res.result.prizeInfo?.id) {
					const index = this.prizeList.findIndex(
						(prize) => prize.id === res.result.prizeInfo.id
					)
					results = Array.from({ length: 3 }, () => index)
				} else {
					results = this.generatePrize()
				}
				//将中奖结果赋值给slot
				this.$refs.myLucky.stop(results)
			})
		},
		generatePrize() {
			let arr = Array.from({ length: 3 }, () => {
				return Math.floor(Math.random() * this.prizeList.length)
			})
			if (new Set(arr).size === 1) {
				arr[arr.length - 1] =
					arr[arr.length - 1] === arr.length - 1
						? arr[arr.length - 1] - 1
						: arr[arr.length - 1] + 1
			}
			return arr
		},
		endCallBack(prize) {
			this.getAllPrizeRecord()
			this.showGetGift = true
			this.bottingAgain = true
		},
		confirmGetGift() {
			this.showGetGift = false
			if (this.prizeToAddress) {
				this.showGetMaterial = true
			}
		},
		async getList() {
			let res = await list()
			console.log('1.一级居住地')
			console.log(res)
			if (res.code !== 0) {
				uni.$u.toast(res.msg)
				return
			}
			this.areaList = res.page.list
		},
		goCitySelect(a) {
			uni.navigateTo({
				url:
					'../citySelect/citySelect' +
					'?cateId=' +
					a +
					'&change=' +
					false +
					'&lookHouse=' +
					true
			})
		},
		async getBanner() {
			let res = await banner({ type: 4 })
			console.log('请求banner图')
			if (res.code !== 0) {
				uni.$u.toast(res.msg)
				return
			}
			console.log(res)
			this.list1 = res.result
		},
		toMeetingRoom() {
			uni.navigateTo({
				url: '../../pages_userActivity/meetingRoom/meetingRoom'
			})
		},
		toAreaSelect() {
			uni.navigateTo({
				url: '../areaSelect/areaSelect?lookHouse=' + true
			})
		},
		toRankingList() {
			uni.navigateTo({
				url: '../../pages_userActivity/rankingList/rankingList'
			})
		},
		toPrizeRecordList() {
			uni.navigateTo({
				url: '../../pages_userActivity/prizeRecordList/prizeRecordList'
			})
		},
		toOtherUser() {
			randomRoom().then((res) => {
				console.log('获取随机房间')
				console.log(res)
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					return
				}
				if (res.room.uid === this.uid) {
					//自己
					uni.switchTab({
						url: '../../pages/user/user'
					})
				} else {
					uni.navigateTo({
						url:
							'../../pages_userActivity/otherUser/otherUser?ocateId=' +
							res.room.cateId +
							'&ouid=' +
							res.room.uid +
							'&index=' +
							true
					})
				}
			})
		},
		goOwnPageOrThirdParty(index) {
			if (this.list1[index].linkType === 1) {
				wx.navigateToMiniProgram({
					appId: this.list1[index].appId,
					path: this.list1[index].url,
					envVersion: 'release',
					success(res) {
						console.log('跳转小程序成功！', res)
					}
				})
			} else if (this.list1[index].linkType === 0) {
				if (
					this.list1[index].url === '../pages/user/user' ||
					this.list1[index].url === '../pages/index/index' ||
					this.list1[index].url === '../pages/index2/index2' ||
					this.list1[index].url ===
						'../pages/currentBottle/currentBottle'
				) {
					uni.switchTab({
						url: this.list1[index].url
					})
				} else {
					uni.navigateTo({
						url: this.list1[index].url
					})
				}
			} else {
				return
			}
		}
	}
}
</script>

<style lang="less" scoped>
.slot-machine {
	position: relative;
	width: 750rpx;
	height: 724rpx;
	.slot-bg-img {
		position: absolute;
		flex-wrap: wrap;
		width: 750rpx;
		height: 724rpx;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.slot-content-img {
		position: absolute;
		flex-wrap: wrap;
		width: 626rpx;
		height: 256rpx;
		top: 290rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.slot-btn {
		margin: 44rpx auto 0;
		width: 600rpx;
		height: 145rpx;
	}
}

.get-gift {
	width: 722rpx;
	height: 186rpx;
	margin: 22rpx auto;
}
.pop-claim {
	width: 629rpx;
	height: 327rpx;
	.claim-text {
		text-align: center;
		margin: 88rpx 0;
	}
}
.pop-botting {
	width: 582rpx;
	height: 481rpx;
	.botting-img {
		width: 102rpx;
		height: 102rpx;
		margin: 30rpx auto;
	}
	.botting-intro {
		text-align: center;
		margin: 30rpx auto;
		color: #ff7f00;
		font-size: 28rpx;
	}
}
.pop-prize,
.pop-prize-no {
	position: relative;
	width: 580rpx;
	height: 700rpx;
	border-radius: 40rpx;
	background: #fef8f1;
	border: 12rpx solid #fead89;
	box-shadow: 0 0 10px 0 rgba(255, 235, 204, 0.8);
	.prize-top-img {
		position: absolute;
		width: 340rpx;
		height: 140rpx;
		top: -148rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.prize-bottom-img {
		position: absolute;
		width: 92rpx;
		height: 92rpx;
		bottom: -120rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.prize-title {
		font-size: 62rpx;
		font-weight: 700;
		text-align: center;
		margin: 46rpx auto;
	}
	.prize-has-img {
		width: 300rpx;
		height: 300rpx;
		margin: 40rpx auto 100rpx;
	}
	.prize-no-img {
		width: 400rpx;
		height: 400rpx;
		margin: 40rpx auto;
	}
	.prize-text {
		font-size: 90rpx;
		font-weight: 700;
		text-align: center;
		margin: 130rpx auto 180rpx;
		color: #f86200;
	}
}
.pop-prize-no {
	background: #f8f8f8;
	border: 12rpx solid #c6c6c6;
	box-shadow: 0 0;
}

.play-intro {
	position: relative;
	padding: 36rpx 20rpx 0;
	line-height: 2;
	.play-record {
		position: absolute;
		top: 14rpx;
		right: 14rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 100;
		font-size: 22rpx;
		img {
			width: 56rpx;
			height: 56rpx;
			padding: 6rpx;
			padding-bottom: 0;
		}
	}
}
.record-btn {
	font-family: 'MyFont1';
	width: 220rpx;
	height: 58rpx;
	background: #fe2f25;
	border-radius: 30rpx 30rpx 30rpx 30rpx;
	border: 2rpx solid #707070;
	color: #ffffff;
	text-align: center;
	font-size: 36rpx;
	line-height: 1.8;
	margin: 22rpx auto;
}
.record-list {
	width: 634rpx;
	height: 154rpx;
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	border: 2rpx solid #707070;
	margin: 22rpx auto;
	text-align: center;
	padding: 20rpx 0;
	.record {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.area-all {
	position: relative;
	width: 710rpx;
	margin: 0 auto 10rpx;
	border-radius: 20rpx 20rpx 30rpx 30rpx;
	overflow: hidden;
	image {
		z-index: -2;
	}
	.city-select {
		position: absolute;
		width: 140rpx;
		height: 140rpx;
	}
	.city-select:nth-of-type(1) {
		//繁华都市
		top: 144rpx;
		left: 430rpx;
	}

	.city-select:nth-of-type(2) {
		//世外桃源
		bottom: 30rpx;
		right: 10rpx;
	}

	.city-select:nth-of-type(3) {
		//神秘之地
		bottom: 30rpx;
		left: 60rpx;
	}

	.city-select:nth-of-type(4) {
		//江湖之颠
		top: 290rpx;
		left: 326rpx;
	}

	.city-select:nth-of-type(5) {
		//星际家园
		top: 262rpx;
		left: 20rpx;
	}

	.city-select:nth-of-type(6) {
		//千年古镇
		top: 200rpx;
		left: 178rpx;
	}

	.city-select:nth-of-type(7) {
		//梦幻世界
		top: 46rpx;
		left: 24rpx;
	}
}
.who-are-you {
	width: 710rpx;
	margin: 0 auto 10rpx;
	border-radius: 20rpx 20rpx 30rpx 30rpx;
	overflow: hidden;
}
.banner-box {
	background-color: #ffffff;
	/deep/ .u-swiper {
		height: 200rpx !important;
	}
	/deep/ .u-swiper__wrapper {
		height: 200rpx !important;
	}
	/deep/ .u-swiper__wrapper__item__wrapper {
		padding: 10rpx 20rpx;
		background-color: #ffffff;
		align-content: center !important;
		.u-swiper__wrapper__item__wrapper__image {
			width: 682rpx;
			height: 176rpx !important;
			border-radius: 14rpx !important;
		}
	}
}

button::after {
	border: none;
}
/deep/.u-input__content {
	padding: 10rpx 6rpx;
	background-color: #e5e5e5;
	border-radius: 20rpx;
}
/deep/ .u-textarea {
	padding: 14rpx 6rpx !important;
	background-color: #e5e5e5 !important;
	border-radius: 20rpx !important;
}
.gift-img {
	width: 400rpx;
}
</style>
