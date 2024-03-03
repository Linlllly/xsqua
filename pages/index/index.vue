<template>
	<div class="pages">
		<div class="get-gift" @click="showClaim = true">兑换礼物</div>
		<div class="get-gift" @click="showGetMaterial = true">
			继续填写兑换地址
		</div>
		<div class="slot-machine">
			<SlotMachine
				v-show="lookSlotMachine"
				ref="myLucky"
				width="600rpx"
				height="400rpx"
				:blocks="blocks"
				:slots="slots"
				:prizes="prizes"
				:defaultStyle="defaultStyle"
				:defaultConfig="defaultConfig"
				@end="endCallBack"
			/>
			<div
				v-show="!lookSlotMachine"
				style="width: 600rpx; height: 400rpx"
			>
				zhanwei
			</div>
			<view>
				<button @click="botting">开始</button>
			</view>
		</div>
		<div class="record" v-for="i in recordList">
			中奖记录-----呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜1111111111111111111111111111
		</div>
		<div class="area-all">
			<image
				src="https://www.zairongyifang.com:8080/filePath/app/202311/compressed_25cb83852d.png"
				mode="widthFix"
				style="width: 100%"
			></image>

			<div
				class="city-select"
				v-for="i in areaList"
				:key="i.cateId"
				@click="goCitySelect(i.cateId)"
			></div>
		</div>
		<div class="who-are-you">
			<image
				src="https://www.zairongyifang.com:8080/filePath/app/20241/compressed_c99ab46582.jpg"
				mode="widthFix"
				style="width: 100%"
				@click="toOtherUser()"
			></image>
		</div>

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
		<!-- 排行榜 -->
		<RankingList ref="rankingListComponent"></RankingList>
		<!-- 确认兑换吗 -->
		<u-modal
			title="兑换"
			:show="showClaim"
			@confirm="confirmClaim"
			confirmColor="#e89406"
			showCancelButton
			@cancel="showClaim = false"
		>
			<view class="slot-content"> 确认兑换xxx？</view>
		</u-modal>
		<!-- 填写收货信息弹窗 -->
		<u-modal
			title="填写收货信息"
			:show="showGetMaterial"
			@confirm="confirmGetMaterial"
			showCancelButton
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
		<u-modal
			title="下注"
			:show="showBotting"
			@confirm="
				showBotting = false
				startCallBack()
			"
			confirmColor="#e89406"
			showCancelButton
			@cancel="showBotting = false"
		>
			<view class="slot-content">
				<div style="display: flex">
					<u-number-box
						integer
						v-model="startNum"
						:step="5"
						:min="5"
					></u-number-box>
					<u-icon name="play-circle" size="28"></u-icon>
				</div>
				<div>（最低限额5颗星星）</div>
			</view>
		</u-modal>
		<!-- 中奖弹窗 -->
		<u-modal
			title="恭喜您中奖啦"
			:show="showGetGift"
			@confirm="confirmGetGift"
			confirmColor="#e89406"
		>
			<view class="slot-content"> 恭喜您获得{{ gtifName }}!!! </view>
		</u-modal>
	</div>
</template>

<script>
import { banner, randomRoom } from '@/api/index.js'
import { prize, draw, prizeRecord, receive } from '@/api/game.js'
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
				return true // 当 firstLookSlotMachine 为 false 时，直接返回 true
			} else {
				// 当 firstLookSlotMachine 为 true 时，根据其他参数的取值来确定结果
				if (
					this.showClaim ||
					this.showGetMaterial ||
					this.showBotting ||
					this.showGetGift
				) {
					return false // 如果有任一参数为 true，则返回 false
				} else {
					return true // 如果前四个参数都为 false，则返回 true
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
			blocks: [
				{
					padding: '10px',
					background: '#869cfa',
					borderRadius: '10px'
				},
				{ padding: '10px', background: '#e9e8fe', borderRadius: '10px' }
			],
			slots: [{ direction: 1 }, { direction: -1 }, { direction: 1 }],
			prizes: [
				{
					background: '#bac5ee',
					borderRadius: '10px',
					imgs: [
						{
							width: '70%',
							height: '70%',
							top: '15%',
							src: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
						}
					]
				},
				{
					background: '#bac5ee',
					borderRadius: '10px',
					imgs: [
						{
							width: '70%',
							height: '70%',
							top: '15%',
							src: 'https://cdn.uviewui.com/uview/swiper/swiper2.png'
						}
					]
				},
				{
					background: '#bac5ee',
					borderRadius: '10px',
					imgs: [
						{
							width: '70%',
							height: '70%',
							top: '15%',
							src: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
						}
					]
				}
			],
			defaultStyle: {
				borderRadius: Infinity,
				background: '#bac5ee',
				fontSize: '32px',
				fontColor: '#333'
			},
			defaultConfig: {
				rowSpacing: '25px',
				colSpacing: '10px'
			},
			//地区列表
			areaList: [],
			list1: [],
			recordList: [],
			//兑换
			showClaim: false,
			//实物地址
			showGetMaterial: false,
			materialForm: { name: '', mobile: '', address: '' },
			//下注
			showBotting: false,
			startNum: 5,
			//中奖
			showGetGift: false,
			gtifName: '',
			firstLookSlotMachine: true,
			prizeType: 2,
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
		this.getBanner()
		this.getList()
		this.getRecordList()
	},
	methods: {
		...mapMutations(['updateUid']),
		getRecordList() {
			// prizeRecord({page:1,limit:10000}).then(res=>{
			// 	this.recordList=res
			// })
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
					this.list1[index].url === '../pages/index3/index3'
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
		},
		//有无资格兑换
		confirmClaim() {
			this.showClaim = false
			this.showGetMaterial = true
			this.materialForm = { name: '', mobile: '', address: '' }
		},
		//实物
		confirmGetMaterial() {
			this.$refs.materialForm
				.validate()
				.then((res) => {
					// receive(this.materialForm).then(res=>{
					// uni.$u.toast('信息已提交，等待后台发货')
					//this.prizeType=2
					// })
				})
				.catch((errors) => {
					uni.$u.toast('校验失败')
				})
		},
		//下注/填写地址
		botting() {
			if (this.prizeType === 1) {
				this.showGetMaterial = true
				return
			}
			this.showBotting = true
		},
		//抽奖开始和结束
		startCallBack() {
			this.firstLookSlotMachine = false
			this.$refs.myLucky.play()
			// draw({num:this.startNum}).then(res=>{
			// 	this.$refs.myLucky.stop(res.xxx)
			// })
			this.$refs.myLucky.stop([0, 0, 1])
		},
		endCallBack(prize) {
			// 奖品详情
			console.log('---------中奖的：', prize)
			this.prizeType = 1
			this.gtifName = '1111'
			this.showGetGift = true
		},
		confirmGetGift() {
			this.showGetGift = false
			if (this.prizeType === 1) {
				this.showGetMaterial = true
			}
		}
	}
}
</script>

<style lang="less" scoped>
.record {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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
</style>
