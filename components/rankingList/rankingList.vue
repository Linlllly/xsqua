<template>
	<div class="pages">
		<!-- 打投列表 -->
		<div class="pick-list">
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
			</div>
		</div>
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
import { flowerRank, silverRank, giveSilver, giveFlower } from '@/api/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

const app = getApp();

export default {
	computed: {
		...mapState(['uid'])
	},
	data() {
		return {
			silverRankList: [],
			//弹窗给钱给花
			showMoneyOrFlower: false,
			//1送钱 2送花
			type: 1,
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
		this.getSilverRank();
	},
	methods: {
		async getSilverRank() {
			let res = await silverRank();
			console.log('银两排行榜');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast('排行榜获取失败');
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
			if (!(this.sendCount && this.sendCount > 0)) {
				uni.$u.toast('助力数量有误');
				return;
			}
			this.sending = true;
			uni.showLoading({
				title: '赠送中'
			});

			let res = await giveSilver({
				num: this.sendCount,
				receiveUid: receiveUid,
				type: this.type
			});

			uni.hideLoading();
			if (res.code !== 0) {
				this.sending = false;
				uni.$u.toast('赠送星星失败');
				return;
			}
			uni.$u.toast('赠送星星成功');
			//----------
			var content = {
				fromUid: this.uid,
				toUid: receiveUid,
				text: `赠送了` + this.sendCount + `个星星给您`,
				type: 'silver'
			};
			this.ws.send({
				data: JSON.stringify(content),
				success: () => {
					console.log('ws赠送银元发送成功');
				}
			});

			this.sending = false;
			this.sendCount = '';
			this.showMoneyOrFlower = false;
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
	.mouth-img-money {
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

	.show-img-money {
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
</style>
