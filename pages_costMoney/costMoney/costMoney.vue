<template>
	<div class="pages">
		<img class="bg-img" src="../cm_static/costMoney.jpg" alt="" />
		<div class="send-list" @click="showSendList = true">礼单</div>
		<div class="record" @click="openRecord">充值记录</div>

		<div class="cost"><div class="cost-item" v-for="(i, index) in 4" :key="index" @click="payMoney(i)">花钱</div></div>

		<!-- 换盔甲 -->
		<div class="box-armor">
			<div class="learn-more" @click="goExchangeArmor">了解详情</div>
			<div class="armor-details">
				<u-number-box
					v-model="eArmor"
					integer
					min="0"
					max="1"
					bgColor="#00000000"
					iconStyle="color: #f08221"
					buttonSize="80rpx"
				></u-number-box>
				<div class="armor-confirm" @click="comfirmExchange('tk')">确认更换</div>
				<div class="armor-record" @click="openConvert('tk')">换购记录</div>
			</div>
		</div>
		<!-- 换鲜花便便 -->
		<div class="box-fp">
			<div class="fp-details">
				<u-number-box v-model="eFlower" integer min="0" bgColor="#00000000" iconStyle="color: #f08221" buttonSize="80rpx"></u-number-box>
				<u-number-box v-model="ePoo" integer min="0" bgColor="#00000000" iconStyle="color: #f08221" buttonSize="80rpx"></u-number-box>
			</div>
			<div class="fp-confirm-record">
				<div class="fp-confirm" @click="comfirmExchange">确认更换</div>
				<div class="fp-record" @click="openConvert">换购记录</div>
			</div>
		</div>
		<!-- 礼单列表 -->
		<u-popup :show="showSendList" @close="showSendList = false" @open="openSendList" bgColor="rgba(255,255,255,0.8)">
			<img class="send-img" src="../cm_static/send-list.png" alt="" />
			<div class="send-state">
				<div v-for="(i, index) in 2" :key="index" :class="bigLook === i ? 'select-send' : 'name-send'" @click="changeLookList(i)">
					{{ i === 0 ? '收到' : '送出' }}
				</div>
			</div>
			<div class="send-box">
				<div class="box-list">
					<!-- 图片-->
					<img class="list-title" src="../../static/flower.png" alt="" />
					<!-- 鲜花下拉列表 -->
					<div>
						<scroll-view
							v-if="flowerList && flowerList.length !== 0"
							:scroll-y="true"
							style="width:100%;height:696rpx;"
							@scrolltolower="lowerFlower"
						>
							<div class="list-tiem" v-for="(i, index) in flowerList" :key="index">
								<img class="ava" :src="bigLook === 0 ? i.sendUserAvatar : i.receiveUserAvatar" alt="" @click="toOtherUser(i)" />
								<div class="count">{{ i.num }}</div>
							</div>
						</scroll-view>
					</div>
					<!-- 底部加载提示 -->
					<u-loading-icon v-if="loadingFlower" color="#767374" size="16"></u-loading-icon>
				</div>
				<div class="box-list">
					<!-- 元宝图片 -->
					<img class="list-title" src="../../static/money.png" alt="" />
					<!-- 下拉列表 -->
					<div>
						<scroll-view
							v-if="moneyList && moneyList.length !== 0"
							:scroll-y="true"
							style="width:100%;height:696rpx;"
							@scrolltolower="lowerMoney"
						>
							<div class="list-tiem" v-for="(i, index) in moneyList" :key="index">
								<img class="ava" :src="bigLook === 0 ? i.sendUserAvatar : i.receiveUserAvatar" alt="" @click="toOtherUser(i)" />
								<div class="count">{{ i.num }}</div>
							</div>
						</scroll-view>
					</div>
					<!-- 底部加载提示 -->
					<u-loading-icon v-if="loadingMoney" color="#767374" size="16"></u-loading-icon>
					<!-- <div class="next" v-if="!loadingMoney && pageNumMoney >= lastPageNumMoney">已加载全部记录</div> -->
				</div>
				<div class="box-list">
					<!-- 便便图片 -->
					<img class="list-title" src="../../static/poo.png" alt="" />
					<!-- 下拉列表 -->
					<div>
						<scroll-view
							v-if="pooList && pooList.length !== 0"
							:scroll-y="true"
							style="width:100%;height:696rpx;"
							@scrolltolower="lowerPoo"
						>
							<div class="list-tiem" v-for="(i, index) in pooList" :key="index">
								<img class="ava" :src="bigLook === 0 ? i.sendUserAvatar : i.receiveUserAvatar" alt="" @click="toOtherUser(i)" />
								<div class="count">{{ i.num }}</div>
							</div>
						</scroll-view>
					</div>
					<!-- 底部加载提示 -->
					<u-loading-icon v-if="loadingPoo" color="#767374" size="16"></u-loading-icon>
				</div>
			</div>
		</u-popup>
		<!-- 充值记录遮罩层 -->
		<u-overlay :show="showRecordList" @click="showRecordList = false">
			<div class="box" @tap.stop>
				<!-- 列表 -->
				<div>
					<scroll-view v-if="recordList.length !== 0" :scroll-y="true" style="width:100%;height:710rpx;" @scrolltolower="lowerRecord">
						<div class="box-tiem" v-for="(i, index) in recordList" :key="index">
							<div>{{ i.createTime }}</div>
							<div>银子{{ i.num }}两</div>
						</div>
					</scroll-view>
				</div>
				<!-- 底部加载提示 -->
				<u-loading-icon v-if="loadingRecord" color="#767374" size="16"></u-loading-icon>
				<div v-if="!loadingRecord && pageNumRecord >= lastPageNumRecord" class="next">已加载全部充值记录</div>
			</div>
		</u-overlay>
		<!-- 盔甲鲜花粪便记录遮罩层 -->
		<u-overlay :show="showConvertList" @click="showConvertList = false">
			<div class="box" @tap.stop>
				<!-- 列表 -->
				<div>
					<scroll-view v-if="convertList.length !== 0" :scroll-y="true" style="width:100%;height:710rpx;" @scrolltolower="lowerConvert">
						<div class="box-tiem" v-for="(i, index) in convertList" :key="index">
							<div>{{ i.createTime }}</div>
							<div>
								{{ i.type === 2 ? '鲜花 ' : i.type === 3 ? '便便 ' : '头盔 ' }}{{ i.num
								}}{{ i.type === 2 ? '朵' : i.type === 3 ? '坨' : '个' }}
							</div>
						</div>
					</scroll-view>
				</div>
				<!-- 底部加载提示 -->
				<u-loading-icon v-if="loadingConvert" color="#767374" size="16"></u-loading-icon>
				<div v-if="!loadingConvert && pageNumConvert >= lastPageNumConvert" class="next">已加载全部兑换记录</div>
			</div>
		</u-overlay>
	</div>
</template>

<script>
import { list, exchange, buy } from '@/api/costMoney.js';
import { exchangeArmour } from '@/api/exchangeArmor.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
	computed: {
		...mapState(['uid'])
	},
	data() {
		return {
			//兑换盔甲
			eArmor: 0,
			//兑换鲜花
			eFlower: 0,
			//兑换粪便
			ePoo: 0,
			//礼单选收到0或者送出1
			bigLook: 0,
			//礼单显示
			showSendList: false,
			//礼单鲜花-------------------------------
			//鲜花列表
			flowerList: [],
			//是否显示加载
			loadingFlower: false,
			//当前页和最后一页是同一页显示没有更多了
			pageNumFlower: 1,
			pageSizeFlower: 20,
			lastPageNumFlower: '',
			//礼单元宝-------------------------------
			//元宝列表
			moneyList: [],
			//是否显示加载
			loadingMoney: false,
			//当前页和最后一页是同一页显示没有更多了
			pageNumMoney: 1,
			pageSizeMoney: 20,
			lastPageNumMoney: '',
			//礼单便便--------------------------------
			//便便列表
			pooList: [],
			//是否显示加载
			loadingPoo: false,
			//当前页和最后一页是同一页显示没有更多了
			pageNumPoo: 1,
			pageSizePoo: 20,
			lastPageNumPoo: '',
			//充值记录显示
			showRecordList: false,
			//充值记录---------------------------------
			//充值列表
			recordList: [],
			//是否显示加载
			loadingRecord: false,
			//当前页和最后一页是同一页显示没有更多了
			pageNumRecord: 1,
			pageSizeRecord: 12,
			lastPageNumRecord: '',
			//兑换记录显示
			showConvertList: false,
			//兑换记录---------------------------------
			//兑换列表
			convertList: [],
			//是否显示加载
			loadingConvert: false,
			//当前页和最后一页是同一页显示没有更多了
			pageNumConvert: 1,
			pageSizeConvert: 12,
			lastPageNumConvert: '',
			//----------------------------------------
			// loading:false,
			timer: null,
			exchageing: false
		};
	},
	methods: {
		//充值
		payMoney(i) {
			i === 0 ? (this.num = 1) : i === 1 ? (this.num = 10) : i === 2 ? (this.num = 30) : (this.num = 50);
			// this.loading = true;
			if (this.timer) {
				return;
			}
			//1
			uni.showLoading({
				title: '请求支付中'
			});
			this.timer = setTimeout(() => {
				//2
				uni.hideLoading();
				this.wxPay();
				//3.
				this.timer = null;
			}, 1500);
		},
		async wxPay() {
			//请求后端获取参数
			let res = await buy({ num: this.num });
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				return;
			}
			//调用真实支付接口
			uni.requestPayment({
				provider: 'wxpay', // 服务提提供商
				orderInfo: '', //订单数据
				timeStamp: res.timeStamp, // 时间戳
				nonceStr: res.nonceStr, // 随机字符串
				package: res.package, //统一下单接口返回的 prepay_id 参数值
				signType: res.signType, // 签名算法
				paySign: res.paySign, // 签名
				success: function(res) {
					// this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '充值成功',
						duration: 1000
					});
				},
				fail: function(err) {
					uni.showToast({
						icon: 'none',
						title: err,
						duration: 1000
					});
				}
			});
			this.loading = false;
		},
		//-------------------------
		//打开充值记录
		openRecord() {
			this.showRecordList = true;
			this.recordList = [];
			this.pageNumRecord = 1;
			this.lastPageNumRecord = '';
			this.getRecordList();
		},
		//下拉加载更多充值记录
		lowerRecord() {
			if (this.pageNumRecord >= this.lastPageNumRecord) {
				return;
			}
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.loadingRecord) return;
			// 让页码值自增 +1
			this.pageNumRecord += 1;
			// 重新获取列表数据
			this.getRecordList();
		},
		//充值记录
		async getRecordList() {
			this.loadingRecord = true;
			let res = await list({ page: this.pageNumRecord, limit: this.pageSizeRecord, status: 1, type: 1 });
			console.log('充值记录');
			console.log(res);
			if (res.code !== 0) {
				this.loadingRecord = false;
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				this.loadingRecord = false;
				return;
			}
			this.recordList = [...this.recordList, ...res.page.data];
			this.lastPageNumRecord = res.page.last_page;
			this.loadingRecord = false;
		},
		//-------------------------
		//打开送礼层
		openSendList() {
			//默认请求收到送礼信息
			this.flowerList = [];
			this.pageNumFlower = 1;
			this.lastPageNumFlower = '';
			this.moneyList = [];
			this.pageNumMoney = 1;
			this.lastPageNumMoney = '';
			this.pooList = [];
			this.pageNumPoo = 1;
			this.lastPageNumPoo = '';
			this.getFlowerList();
			this.getMoneyList();
			this.getPooList();
		},
		//切换状态
		changeLookList(i) {
			this.bigLook = i;
			//切换请求收到送礼信息
			this.flowerList = [];
			this.moneyList = [];
			this.pooList = [];
			this.getFlowerList();
			this.getMoneyList();
			this.getPooList();
		},
		//--------------------
		async getFlowerList() {
			//请求送礼信息 0收到-16 1送出-8
			let state = 16;
			if (this.bigLook === 1) {
				state = 8;
			}
			this.loadingFlower = true;
			let res = await list({ page: this.pageNumFlower, limit: this.pageSizeFlower, status: state, type: 2 });
			console.log('收到/送出鲜花');
			console.log(res);
			if (res.code !== 0) {
				this.loadingFlower = false;
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				//关闭节流阀
				this.loadingFlower = false;
				return;
			}
			this.flowerList = [...this.flowerList, ...res.page.data];
			this.lastPageNumFlower = res.page.last_page;
			this.loadingFlower = false;
		},
		//下拉加载更多鲜花
		lowerFlower() {
			if (this.pageNumFlower >= this.lastPageNumFlower) {
				return;
			}
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.loadingFlower) return;
			// 让页码值自增 +1
			this.pageNumFlower += 1;
			// 重新获取列表数据
			this.getFlowerList();
		},
		//----------------------
		async getMoneyList() {
			//请求送礼信息 0收到-16 1送出-8
			let state = 16;
			if (this.bigLook === 1) {
				state = 8;
			}
			this.loadingMoney = true;
			let res = await list({ page: this.pageNumMoney, limit: this.pageSizeMoney, status: state, type: 1 });
			console.log('收到/送出银元');
			console.log(res);
			if (res.code !== 0) {
				this.loadingMoney = false;
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				//关闭节流阀
				this.loadingMoney = false;
				return;
			}
			this.moneyList = [...this.moneyList, ...res.page.data];
			this.lastPageNumMoney = res.page.last_page;
			this.loadingMoney = false;
		},
		//下拉加载更多元宝
		lowerMoney() {
			if (this.pageNumMoney >= this.lastPageNumMoney) {
				return;
			}
			if (this.loadingMoney) return;
			this.pageNumMoney += 1;
			this.getMoneyList();
		},
		//--------------------------------
		async getPooList() {
			//请求送礼信息 0收到-16 1送出-8
			let state = 16;
			if (this.bigLook === 1) {
				state = 8;
			}
			this.loadingPoo = true;
			let res = await list({ page: this.pageNumPoo, limit: this.pageSizePoo, status: state, type: 3 });
			console.log('收到/送出粪便');
			console.log(res);
			if (res.code !== 0) {
				this.loadingPoo = false;
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				this.loadingPoo = false;
				return;
			}
			this.pooList = [...this.pooList, ...res.page.data];
			this.lastPageNumPoo = res.page.last_page;
			this.loadingPoo = false;
		},
		//下拉加载更多粪便
		lowerPoo() {
			if (this.pageNumPoo >= this.lastPageNumPoo) {
				return;
			}
			if (this.loadingPoo) return;
			this.pageNumPoo += 1;
			this.getPooList();
		},
		//-------------------
		openConvert(n) {
			this.convertList = [];
			this.pageNumConvert = 1;
			this.lastPageNumConvert = '';
			this.showConvertList = true;
			this.getConvertList(n);
		},
		async getConvertList(n) {
			this.loadingConvert = true;
			let res;
			if (n === 'tk') {
				res = await list({ page: this.pageNumConvert, limit: this.pageSizeConvert, status: 2, type: 4 });
			} else {
				res = await list({ page: this.pageNumConvert, limit: this.pageSizeConvert, status: 2 });
			}
			console.log('兑换头盔/鲜花/粪便记录');
			console.log(res);
			if (res.code !== 0) {
				this.loadingConvert = false;
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				this.loadingConvert = false;
				return;
			}
			this.convertList = [...this.convertList, ...res.page.data];
			this.lastPageNumConvert = res.page.last_page;
			this.loadingConvert = false;
		},
		lowerConvert() {
			if (this.pageNumConvert >= this.lastPageNumConvert) {
				return;
			}
			if (this.loadingConvert) return;
			this.pageNumConvert += 1;
			this.getConvertList();
		},
		goExchangeArmor() {
			uni.navigateTo({
				url: '../exchangeArmor/exchangeArmor'
			});
		},
		//---------------
		comfirmExchange(n) {
			if (this.exchageing) {
				return;
			}
			if (n === 'tk') {
				if (this.eArmor === 0) {
					uni.showToast({
						title: '不可以兑换空数量',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.acquireArmor();
			} else {
				if (this.eFlower === 0 && this.ePoo === 0) {
					uni.showToast({
						title: '不可以兑换空数量',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (this.eFlower) {
					this.acquire(2);
				}
				if (this.ePoo) {
					this.acquire(3);
				}
			}
		},
		acquireArmor() {
			this.exchageing = true;
			uni.showLoading({
				title: '兑换中'
			});
			exchangeArmour().then(res => {
				uni.hideLoading();
				this.exchageing = false;
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}
				uni.showToast({
					title: '兑换盔甲成功',
					icon: 'none',
					duration: 2000
				});
				this.eArmor = 0;
			});
		},
		acquire(i) {
			this.exchageing = true;
			uni.showLoading({
				title: '兑换中'
			});
			exchange({ num: i === 2 ? this.eFlower : this.ePoo, receiveUid: this.uid, type: i }).then(res => {
				uni.hideLoading();
				this.exchageing = false;
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}
				uni.showToast({
					title: i === 2 ? '兑换鲜花成功' : '兑换便便成功',
					icon: 'none',
					duration: 2000
				});
				i === 2 ? (this.eFlower = 0) : (this.ePoo = 0);
			});
		},
		toOtherUser(i) {
			let ouid = this.bigLook === 0 ? i.sendUid : i.receiveUid;
			uni.navigateTo({
				url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + ouid
			});
		}
	}
};
</script>

<style lang="less">
.pages {
	position: relative;
	min-height: 100vh;
	color: transparent;
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
.send-list {
	width: 94rpx;
	height: 94rpx;
	margin: 30rpx 0 0 20rpx;
}
.record {
	width: 154rpx;
	height: 50rpx;
	margin-top: 154rpx;
	margin-left: 50%;
	transform: translateX(-50%);
}
.cost {
	display: flex;
	flex-wrap: wrap;
	margin-top: 0rpx;
	box-sizing: border-box;
	padding-left: 20rpx;
	z-index: 20;
	.cost-item {
		width: 48%;
		height: 140rpx;
		margin-right: 14rpx;
	}
}
.box-armor {
	.learn-more {
		margin-top: 93rpx;
		width: 150rpx;
		margin-left: 540rpx;
	}
	.armor-details {
		width: 680rpx;
		display: flex;
		margin: 16rpx auto;
		align-items: center;
		.armor-confirm {
			padding-left: 42rpx;
		}
		.armor-record {
			padding-left: 22rpx;
		}
	}
}
.box-fp {
	display: flex;
	width: 650rpx;
	margin: 248rpx auto 0;
	.fp-details {
	}
	.fp-confirm-record {
		margin-left: 70rpx;
		.fp-confirm {
			margin-top: 10rpx;
			width: 140rpx;
			height: 80rpx;
		}
		.fp-record {
			width: 140rpx;
			margin-top: 10rpx;
		}
	}
}
/deep/.u-number-box__input {
	width: 240rpx !important;
}
/deep/.u-number-box__plus--disabled {
	background-color: transparent !important;
}
/deep/.u-number-box__minus--disabled {
	background-color: transparent !important;
}
/deep/.u-input {
	padding: 12rpx 0 !important;
}
.send-img {
	width: 60rpx;
	height: 60rpx;
	margin-top: 30rpx;
	margin-left: 50%;
	transform: translateX(-50%);
}
.send-state {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 10rpx 0;
	.select-send {
		font-size: 48rpx;
		padding: 0 10rpx;
		color: #333;
	}
	.name-send {
		font-size: 36rpx;
		padding: 0 10rpx;
		color: #333;
	}
}
.send-box {
	display: flex;
	width: 100%;
	height: 850rpx;
	.box-list {
		position: relative;
		width: 33%;
		.list-title {
			width: 76rpx;
			height: 76rpx;
			margin: 18rpx 0;
			margin-left: 50%;
			transform: translateX(-50%);
		}
		.list-tiem {
			display: flex;
			justify-content: space-between;
			align-content: center;
			padding: 10rpx 20rpx;
			.ava {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
			.count {
				line-height: 70rpx;
				color: #333;
			}
		}
		.next {
			width: 100%;
			color: #767374;
			text-align: center;
		}
	}
}
.send-box .box-list:nth-child(2) {
	border: 2rpx solid #adadad;
	border-top: 0;
	border-bottom: 0;
	.list-title {
		width: 100rpx;
		height: 100rpx;
		margin-top: 8rpx;
		margin-bottom: 8rpx;
	}
}
.box {
	box-sizing: border-box;
	width: 600rpx;
	height: 800rpx;
	background-color: rgba(255, 255, 255, 0.8);
	margin-left: 50%;
	margin-top: 50%;
	transform: translateX(-50%);
	border-radius: 20rpx;
	padding: 24rpx 20rpx;
	.box-tiem {
		display: flex;
		justify-content: space-between;
		align-content: center;
		padding: 6rpx 20rpx;
		color: #333;
		font-size: 32rpx;
	}
	.next {
		width: 100%;
		color: #767374;
		text-align: center;
	}
}
img {
	display: block;
}
</style>
