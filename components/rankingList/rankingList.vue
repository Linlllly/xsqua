<template>
	<div class="pages">
		<!-- 打投列表 -->
		<div class="pick-list">
			<div class="list-all-title">X自由空间榜单：富豪榜、迷人榜</div>
			<div>
				<!-- 钱币 -->
				<div class="list-item">
					<img class="mouth-img-money" src="../../static/money.png" alt="" />
					<div class="mouth-title">——— 富豪榜 ———</div>
					<div class="mouth-list" v-for="(i, index) in silverRankList" :key="i.uid">
						<img @click="toOtherUser(i)" class="mouth-portrait" :src="i.avatar" alt="" />
						<img v-if="index === 0" class="mouth-medal" src="../../static/mouth-one.png" alt="" />
						<img v-if="index === 1" class="mouth-medal" src="../../static/mouth-two.png" alt="" />
						<img v-if="index === 2" class="mouth-medal" src="../../static/mouth-three.png" alt="" />
						<div v-if="index >= 3" class="mouth-no-medel">NO.{{ index + 1 }}</div>
						<div class="mouth-info">
							<div class="info-addr">{{ i.username }}</div>
						</div>
						<div class="mouth-count">{{ i.silverNum }}两</div>
						<div class="mouth-btn" @click="addMoneyOrFlower(i, 1)">助力</div>
					</div>
				</div>
				<!-- 鲜花 -->
				<div class="list-item2">
					<img class="mouth-img" src="../../static/flower.png" alt="" />
					<div class="mouth-title">——— 迷人榜 ———</div>
					<div class="mouth-list" v-for="(i, index) in flowerRankList" :key="i.uid">
						<img class="mouth-portrait" @click="toOtherUser(i)" :src="i.avatar" alt="" />
						<img v-if="index === 0" class="mouth-medal" src="../../static/mouth-one-flower.png" alt="" />
						<img v-if="index === 1" class="mouth-medal" src="../../static/mouth-two-flower.png" alt="" />
						<img v-if="index === 2" class="mouth-medal" src="../../static/mouth-three-flower.png" alt="" />
						<div v-if="index >= 3" class="mouth-no-medel">NO.{{ index + 1 }}</div>
						<div class="mouth-info">
							<!-- <div class="info-street">五一街</div> -->
							<div class="info-addr">{{ i.username }}</div>
						</div>
						<div class="mouth-count">{{ i.flowerNum }}朵</div>
						<div class="mouth-btn" @click="addMoneyOrFlower(i, 2)">助力</div>
					</div>
				</div>
			</div>
			<!-- 	<div class="next"><u-icon v-if="rankRich" name="arrow-down" color="#b8b8b8" size="22" @click="rankRich = !rankRich"></u-icon></div> -->
		</div>
		<!-- 结束语 -->
		<!-- 	<div class="end">神秘空间 自由奔放</div> -->
		<!-- 给钱给花  -->
		<u-overlay
			:show="showMoneyOrFlower"
			@click="
				showMoneyOrFlower = false;
				sendCount = '';
			"
		>
			<div class="give-box" @tap.stop>
				<img class="show-img-money" v-if="type === 1" src="../../static/money.png" alt="" />
				<img class="show-img" v-if="type === 2" src="../../static/flower.png" alt="" />

				<u--input
					type="number"
					placeholder="0-100"
					border="null"
					clearable
					shape="circle"
					placeholderStyle="color:#fff"
					color="#000"
					inputAlign="center"
					v-model="sendCount"
				></u--input>

				<div class="giving" @click="confirmSendCount">助力</div>
			</div>
		</u-overlay>
	</div>
</template>

<script>
import { flowerRank, silverRank, giveSilver, giveFlower } from '@/api/index/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

const app = getApp();

export default {
	computed: {
		...mapState(['uid'])
	},
	data() {
		return {
			flowerRankList: [],
			silverRankList: [],
			//弹窗给钱给花
			showMoneyOrFlower: false,
			//1送钱 2送花
			type: null,
			//送出数量
			sendCount: '',
			//送出详细人
			sendDes: '',
			//富豪榜
			rankRich: true,
			// 正在送出
			sending: false,
			ws: ''
		};
	},
	mounted() {
		this.ws = app.globalData.ws;
		this.getFlowerRank();
		this.getSilverRank();
	},
	methods: {
		async getFlowerRank() {
			let res = await flowerRank();
			console.log('鲜花排行榜');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '鲜花排行榜获取失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.flowerRankList = res.result.slice(0, 10);
		},
		async getSilverRank() {
			let res = await silverRank();
			console.log('银两排行榜');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '银两排行榜获取失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.silverRankList = res.result.slice(0, 10);
		},
		//加钱或者加花弹窗
		addMoneyOrFlower(i, type) {
			this.type = type;
			this.sendDes = i;
			if (this.sendDes.uid === this.uid) {
				return;
			}
			this.showMoneyOrFlower = true;
		},
		//确认送出
		async confirmSendCount() {
			let receiveUid = this.sendDes.uid;
			if (this.sending) {
				return;
			}
			if (!this.sendCount || this.sendCount <= 0) {
				uni.showToast({
					title: '助力数量有误',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.sending = true;
			uni.showLoading({
				title: '赠送中'
			});
			if (this.type === 1) {
				//送钱this.type === 1送花this.type === 2
				let res = await giveSilver({ num: this.sendCount, receiveUid: receiveUid, type: this.type });

				uni.hideLoading();
				if (res.code !== 0) {
					this.sending = false;
					uni.showToast({
						title: '赠送银子失败',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				uni.showToast({
					title: '赠送银子成功',
					icon: 'none',
					duration: 2000
				});
				//----------
				var content = { fromUid: this.uid, toUid: receiveUid, text: `赠送了` + this.sendCount + `两银子给您`, type: 'silver' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送银元发送成功');
					}
				});
			}
			if (this.type === 2) {
				let res = await giveFlower({ num: this.sendCount, receiveUid: receiveUid, type: this.type });
				uni.hideLoading();
				if (res.code !== 0) {
					this.sending = false;
					uni.showToast({
						title: '赠送鲜花失败',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				uni.showToast({
					title: '赠送鲜花成功',
					icon: 'none',
					duration: 2000
				});
				//----------
				var content = { fromUid: this.uid, toUid: receiveUid, text: `赠送了` + this.sendCount + `朵鲜花给您`, type: 'flower' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送鲜花发送成功');
					}
				});
			}
			this.sending = false;
			this.sendCount = '';
			this.showMoneyOrFlower = false;
			this.getFlowerRank();
			this.getSilverRank();
		},
		toOtherUser(i, n) {
			console.log(i);
			if (i.uid === this.uid) {
				//自己
				uni.switchTab({
					url: '../../pages/user/user'
				});
			} else {
				uni.navigateTo({
					url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + i.uid
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.pick-list {
	// height: 1590rpx;

	background: #ffffff;
	border-radius: 60rpx;
	margin: 0 20rpx 16rpx;
	border: 12rpx solid rgba(226, 168, 103, 0.39);
	.last,
	.next {
		height: 44rpx;
		display: flex;
		justify-content: center;
	}
	.list-all-title {
		font-style: italic;
		font-size: 34rpx;
		color: #ff7f00;
		text-align: center;
		line-height: 2;
	}
	.list-item {
		width: 686rpx;
	}
	.mouth-img {
		display: block;
		width: 66rpx;
		height: 66rpx;
		margin: 18rpx auto 16rpx;
	}
	.mouth-img-money {
		display: block;
		width: 86rpx;
		height: 76rpx;
		margin: 14rpx auto 10rpx;
	}
	.mouth-title {
		font-size: 38rpx;
		font-weight: bold;
		color: #333333;
		line-height: 1.3;
		text-align: center;
		margin-bottom: 14px;
	}
	.mouth-list {
		position: relative;
		display: flex;
		align-items: center;
		height: 120rpx;
		color: #3e3e3e;
		background: #eeeeee;
		border-radius: 60rpx;
		margin: 12rpx 18rpx 14rpx;
		.mouth-portrait {
			width: 90rpx;
			height: 90rpx;
			margin: 0 16rpx 0 20rpx;
			border-radius: 50%;
		}
		.mouth-info {
			flex: 1;
			display: flex;
			flex-direction: column;

			.info-street {
				font-size: 34rpx;
			}
			.info-addr {
				font-size: 28rpx;
			}
		}
		.mouth-count {
			text-align: right;
			font-size: 28rpx;
		}
		.mouth-btn {
			width: 136rpx;
			height: 66rpx;
			line-height: 66rpx;
			background: linear-gradient(360deg, #ffa200 0%, #ffe65c 100%);
			box-shadow: 0px 8rpx 0px 2rpx #ff7f00;
			border-radius: 34rpx;
			color: #fff;
			font-size: 38rpx;
			font-weight: 400;
			text-align: center;
			margin: 0 20rpx;
		}
		.mouth-medal {
			position: absolute;
			left: 4rpx;
			top: 28rpx;
			width: 46rpx;
			height: 50rpx;
		}
		.mouth-no-medel {
			position: absolute;
			bottom: 14rpx;
			left: 24rpx;
			width: 86rpx;
			height: 32rpx;
			text-align: center;
			line-height: 32rpx;
			font-size: 22rpx;
			background: #cccccc;
			border-radius: 16rpx;
		}
	}
}
//nth-child指代所有元素
.pick-list .mouth-list:nth-child(3) {
	background: linear-gradient(90deg, #eeb655 0%, #f5cd80 100%);
}
.pick-list .mouth-list:nth-child(4) {
	background: linear-gradient(90deg, #97a5ac 0%, #c6d3d9 100%);
}
.pick-list .mouth-list:nth-child(5) {
	background: linear-gradient(90deg, #c0774a 0%, #f4c0a1 100%);
}
.end {
	width: 210rpx;
	font-size: 24rpx;
	font-weight: normal;
	color: #4f4f4f;
	line-height: 1.5;
	margin: 20rpx auto 36rpx;
	white-space: pre-wrap;
}

.give-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 400rpx;
	height: 290rpx;
	background: #ffffff;
	border-radius: 40rpx;
	border: 8rpx solid #f4ddc4;
	margin: 400rpx auto 0;
	box-sizing: border-box;
	padding: 20rpx 30rpx 30rpx;

	.show-img {
		display: block;
		width: 56rpx;
		height: 56rpx;
	}
	.show-img-money {
		display: block;
		width: 66rpx;
		height: 66rpx;
	}
	/deep/.u-input--circle {
		width: 90%;
		background: #d8d8d8 !important;
		flex: 0;
		margin: 20rpx 20rpx !important;
	}

	.giving {
		width: 114rpx;
		height: 54rpx;
		font-size: 30rpx;
		color: #f56600;
		line-height: 54rpx;
		text-align: center;
		background: linear-gradient(360deg, #ffa200 0%, #ffe65c 100%);
		box-shadow: 0px 8rpx 0px 2rpx #ff7f00;
		border-radius: 28rpx;
	}
}
image {
	display: block;
}
</style>
