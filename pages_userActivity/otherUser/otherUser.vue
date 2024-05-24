<template>
	<div class="pages">
		<div class="reload2">
			<u-icon @click="reloadUser" v-if="index" name="../../../../static/reload.png" color="#000" size="34" label="换一换" labelPos="bottom"></u-icon>
		</div>
		<!-- 渲染其他用户 -->
		<div>
			<div class="box-title">
				<div class="my-img-box">
					<img class="my-img" :src="coverImage === '' ? 'https://www.zairongyifang.com:8080/filePath/app/20245/compressed_3cb0cd9dbf.png' : coverImage" alt="" />
				</div>
				<div class="my-info">
					<div class="infos-1">
						<img class="portrait" :src="avatar" alt="" @click="previewImg([avatar])" />
						<div class="info">
							<div class="name-kj">
								<div class="name">{{ username }}</div>
								<div class="armor-box">
									<img class="armor-img" :src="armour ? '../../static/armor.png' : '../../static/armor-no.png'" alt="" />
									<div>安全盔甲</div>
								</div>
							</div>
							<div class="about">
								<div>关注：{{ follow }}</div>
								<div>粉丝：{{ fans }}</div>
							</div>
						</div>
					</div>
					<div class="infos-2">{{ myDes ? myDes : ' ' }}</div>
					<div class="cost-start" @click="popMoney = true">
						<div class="cost-level">
							<img
								class="level-img"
								:src="vipLevel === 1 ? '../../static/vip-1.png' : vipLevel === 2 ? '../../static/vip-2.png' : vipLevel === 3 ? '../../static/vip-3.png' : ''"
								alt=""
							/>
							<div class="level-img-says">LV{{ nmberLevel }}</div>
							<div class="level-intro">
								<img class="level-start" src="../../static/money.png" alt="" />
								<div>{{ silverNum }}</div>
							</div>
						</div>
						<div class="cost-step">
							<div class="step-progress"></div>
							<u-line-progress :percentage="percentage" height="8" inactiveColor="#fff" activeColor="#FEDA7A" :showText="false"></u-line-progress>
						</div>
					</div>
					<div class="infos-3">
						<img v-if="isFollow" class="contorl-1" src="../ua_static/likes.png" alt="" @click="changeMylikes" />
						<img v-else class="contorl-1" src="../ua_static/no-likes.png" alt="" @click="changeMylikes" />
						<img class="contorl-2" src="../ua_static/chat-with.png" alt="" @click="toChatWith" />
						<div class="contorl-3"></div>
						<div class="contorl-4"></div>
					</div>
				</div>
			</div>

			<!--列表 -->
			<div v-if="type === 1 && otherList.length !== 0" class="list-item" v-for="(i, index) in otherList" :key="i.id">
				<!-- 头 -->
				<div class="list-title">
					<div class="dates">
						<img v-if="i.postTop" src="../../static/placed-top.png" alt="" />
						<text>{{ i.createTime }}</text>
					</div>
				</div>
				<!-- 图 -->
				<div class="looks">
					<!-- 标题 -->
					<div class="content-title">
						<div v-if="i.more === '1'" class="real-more-inner">
							{{ i.content }}
						</div>
						<div v-else-if="i.more === '2'" class="real-inner">
							{{ i.content }}
						</div>
						<div v-else class="inner">{{ i.content }}</div>
					</div>
					<div v-if="i.more === '1'" class="content-des" @click="toArticleDes(i)">查看详情 ></div>
					<video v-if="!i.img && i.media.length !== 0" :src="i.media[0]" :controls="true" :show-center-play-btn="true"></video>
					<!-- 四张以上 -->
					<div class="five" v-if="i.img && i.media.length !== 0 && i.media.length > 4">
						<image class="fiveImg" v-for="(j, jndex) in i.media" :key="jndex" :src="j" mode="aspectFill" @click="previewImg(i.media, jndex)"></image>
					</div>
					<!-- 四张 -->
					<div class="four" v-if="i.img && i.media.length > 1 && i.media.length < 5">
						<image class="fourImg" v-for="(q, qndex) in i.media" :key="qndex" :src="q" mode="aspectFill" @click="previewImg(i.media, qndex)"></image>
					</div>
					<!-- 一张-->
					<image class="singleImg" v-if="i.img && i.media.length === 1" :src="i.media[0]" mode="widthFix" @click="previewImg(i.media)"></image>
				</div>
				<!-- 分享评论转发 -->
				<div class="funcs" @click="toArticleDes(i)">
					<!-- 按钮 -->
					<img src="../../static/I.png" alt="" />
					<img src="../../static/want.png" alt="" />
					<img src="../../static/to.png" alt="" />
					<img src="../../static/more.png" alt="" />
				</div>
			</div>
			<u-loading-icon v-if="isloading" color="#767374" size="16"></u-loading-icon>
			<div v-if="type === 1 && !isloading && page >= lastPage" class="next">———— 没有更多数据了 ————</div>
			<!-- 列表留底 -->
			<div v-if="type === 1" class="bottom"></div>
			<!--  密码 -->
			<div v-if="type === 2" class="bg">
				<img class="mimasuo" src="../ua_static/mimasuo2.png" mode="" />
				<u--input placeholder="请输入密码" border="none" v-model="inputMima" inputAlign="center" fontSize="20" maxlength="6"></u--input>
				<div class="mima-button" @click="confirmMima"></div>
			</div>
			<!-- 闭关 -->
			<div v-if="type === 3" class="bg">
				<img class="biguan" src="../ua_static/biguan.png" mode="" />
			</div>
			<!-- 花钱窗-->
			<u-popup :show="popMoney" @close="popMoney = false" bgColor="rgba(255,255,255,0.9)">
				<div class="send-box">
					<u--input
						placeholder="请输入赠送数量"
						prefixIcon="../../../../static/money.png"
						prefixIconStyle="font-size: 38px;color: #909399"
						v-model="sendMoney"
						inputAlign="center"
						fontSize="18"
					></u--input>

					<div class="send-ok" @click="sendMoneyOrFlowerOrPoo">确认</div>
				</div>
			</u-popup>
		</div>
	</div>
</template>

<script>
// 引入组件
import { mapGetters, mapMutations, mapState } from 'vuex';
import { enterRoom, getUserInfoById, getPostListByCateId, obtainSliver, addFollow, cancelFollow } from '@/api/otherUser.js';
import { giveSilver, giveFlower, randomRoom } from '@/api/index.js';
import { giveEgg } from '@/api/articleDes.js';
import { redDot, getUserStatistics, getUserRank } from '@/api/user.js';
import { getArmourConfig } from '@/api/updateArmor.js';
const app = getApp();

export default {
	data() {
		return {
			ws: '',
			//地区
			ocateId: '',
			//用户id
			ouid: '',
			//头像
			avatar: '',
			//背景
			coverImage: '',
			//元宝
			silverNum: '',
			//元宝名次
			silverNo: '',
			//个人签名
			myDes: '',
			//用户名
			username: '',
			//粉丝
			fans: '',
			//关注
			follow: '',
			//-------------
			//条数
			limit: 12,
			//页面
			page: 1,
			lastPage: '',
			isloading: false, // 节流阀 是否正在请求数据
			//---------------
			//弹出花费窗户
			popMoney: false,
			//查看类型 1看2密码3闭关
			type: 1,
			//输入的密码
			inputMima: '',
			//送钱
			sendMoney: '',

			//---------------
			//密码
			password: '',
			//是否闭关 0不是1是
			isClose: '',
			otherList: [],
			isFollow: false,
			close: false,
			armour: false,
			index: false,
			//充值金额
			accrualRecharge: 0,
			//vip显示
			vipLevel: 0,
			nmberLevel: 0
		};
	},
	computed: {
		...mapState(['uid', 'house', 'myWs']),
		percentage() {
			return (this.silverNum / 150000) * 100;
		}
	},
	watch: {
		myWs: {
			immediate: true,
			handler(news, olds) {
				console.log('chatList开启侦听');
				this.close = false;
				this.ws = app.globalData.ws;
			}
		},

		accrualRecharge: {
			handler(news, olds) {
				if (news < 10) {
					this.vipLevel = 0;
					this.nmberLevel = 0;
				} else if (10 <= news < 10 + 11 * 10 + 100) {
					this.vipLevel = 1;
					this.nmberLevel = Math.floor(news / 10);
				} else if (120 + 100 <= news < 130 + 11 * 100 + 1000) {
					this.vipLevel = 2;
					this.nmberLevel = Math.floor(news - (10 + 11 * 10) / 100);
				} else {
					this.vipLevel = 3;
					this.nmberLevel = Math.floor(news - (130 + 11 * 100) / 1000);
				}
			}
		}
	},
	onLoad(option) {
		this.index = option.index === 'true' ? true : false;
		this.ocateId = option.ocateId;
		this.ouid = option.ouid;
		this.getUserStatistics(option.ouid);

		this.getGetUserInfoById();
		this.otherList = [];
		this.getEnterRoom();
		this.getObtainSliver();
		this.getArmourConfig();
	},

	onShow() {},
	onUnload() {
		this.close = true;
	},
	onReachBottom() {
		if (this.type !== 1) {
			return;
		}
		if (this.page >= this.lastPage) {
			return;
		}
		if (this.isloading) return;
		this.page += 1;
		this.getGetPostListByCateId();
	},
	methods: {
		//关注/互关/粉丝统计数
		getUserStatistics(uid) {
			getUserStatistics({ uid: uid }).then((res) => {
				console.log('请求他人关注/粉丝数');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					return;
				}
				this.fans = res.result.fans;
				this.follow = res.result.follow;
			});
		},
		//盔甲状态
		getArmourConfig() {
			getArmourConfig({ uid: this.ouid }).then((res) => {
				console.log('获取该用户盔甲状态');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				} else {
					this.armour = res.result.armourStatus === 0 ? false : true;
				}
			});
		},
		async getObtainSliver() {
			let res = await obtainSliver({ sendUid: this.ouid });
			console.log('进马甲用户空间获得星星');
			console.log(res);
			if (res.code === 0) {
				uni.showToast({
					title: '触发好运~恭喜获得星星',
					icon: 'none'
				});
				//----------
				var content = {
					fromUid: this.ouid - 0,
					toUid: this.uid,
					text: `赠送了` + res.msg + `个星星给您`,
					type: 'silver'
				};
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws进马甲用户空间获得星星提示成功');
					}
				});
			}
		},
		//请求个人信息
		async getGetUserInfoById() {
			let res = await getUserInfoById({ uid: this.ouid });
			console.log('获取他人用户信息');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				return;
			}
			this.avatar = res.result.avatar;

			this.myDes = res.result.intro;
			this.username = res.result.username;
			this.silverNo = res.result.silverNo;
			this.silverNum = res.result.silverNum;
			this.isFollow = res.result.isFollow;
			this.accrualRecharge = res.result.accrualRecharge;
		},
		//请求空间信息
		async getEnterRoom() {
			let res = await enterRoom({ cateId: this.ocateId });
			console.log('获取他人空间信息');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				return;
			}
			this.coverImage = res.room.coverImage;
			this.isClose = res.room.isClose;
			this.password = res.room.password;
			if (this.isClose === 1) {
				this.type = 3;
			}
			// else if (this.password) {
			// this.type = 2;
			// }
			else {
				this.type = 1;
				this.getGetPostListByCateId();
			}
		},
		//请求列表
		async getGetPostListByCateId() {
			// ** 打开节流阀
			this.isloading = true;
			let res = await getPostListByCateId({
				cateId: this.ocateId,
				limit: this.limit,
				page: this.page,
				password: this.password
			});
			console.log('他人房间-动态列表分页');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				// ** 关闭节流阀
				this.isloading = false;
				return;
			}

			this.otherList = [...this.otherList, ...res.result.data];
			this.lastPage = res.result.last_page;
			for (var i = 0; i < this.otherList.length; i++) {
				let lins = this.otherList[i].media[0];
				let zhengze = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
				this.$set(this.otherList[i], 'img', zhengze.test(lins));
			}
			this.$nextTick(() => {
				let query = uni.createSelectorQuery().in(this);
				//所有title
				query.selectAll('.content-title').boundingClientRect();
				//所有inner
				query.selectAll('.inner').boundingClientRect();
				query.exec((res) => {
					for (var i = 0; i < res[0].length; i++) {
						let linsHeight = res[0][i].height - res[1][i].height;
						if (linsHeight >= 0) {
							this.$set(this.otherList[i], 'more', '2');
						} else {
							this.$set(this.otherList[i], 'more', '1');
						}
					}
				});
				// ** 关闭节流阀
				this.isloading = false;
			});
		},
		//修改关注状态 没房子不能点
		async changeMylikes() {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人',
					icon: 'none'
				});
				return;
			}
			if (!this.isFollow) {
				//关注
				let res = await addFollow({ id: this.ouid });
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					return;
				}
				this.isFollow = true;
				//-----------
				var content = {
					fromUid: this.uid,
					toUid: this.ouid - 0,
					text: '关注了您',
					type: 'follow'
				};
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws关注消息发送成功');
					}
				});
				//-----------
			} else {
				//取关
				let res = await cancelFollow({ id: this.ouid });
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					return;
				}
				this.isFollow = false;
			}
		},
		toArticleDes(i) {
			uni.navigateTo({
				url: '../../pages_userActivity/articleDes/articleDes?i=' + i.id
			});
		},
		//打开给别人花钱框 没房子不能点
		openPopMoney() {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人',
					icon: 'none'
				});
				return;
			}
			this.popMoney = true;
			//
		},
		//确认密码
		confirmMima() {
			if (this.password === this.inputMima) {
				this.type = 1;
				this.getGetPostListByCateId();
			} else {
				uni.showToast({
					title: '密码输入不正确',
					icon: 'none'
				});
			}
		},
		//去聊天  没房子不能点
		toChatWith() {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人'
				});
				return;
			}
			uni.navigateTo({
				url: '../chatWith/chatWith?ouid=' + this.ouid + '&&ocateId=' + this.ocateId
			});
		},
		//单图预览
		previewImg(i) {
			uni.previewImage({
				current: i[0], // 当前显示图片的http链接
				urls: i // 需要预览的图片http链接列表
			});
		},
		//查看消息列表 没房子不能点
		toMessage() {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人',
					icon: 'none'
				});
				return;
			}
			this.messageDot = false;
			uni.navigateTo({
				url: '../messageList/messageList'
			});
		},
		async sendMoneyOrFlowerOrPoo() {
			if (this.sending) {
				return;
			}
			if (!this.sendMoney || this.sendMoney <= 0) {
				uni.showToast({
					title: '助力数量有误',
					icon: 'none'
				});
				return;
			}
			this.sending = true;
			uni.showLoading({
				title: '赠送中'
			});
			if (this.sendMoney) {
				let res1 = await giveSilver({
					num: this.sendMoney,
					receiveUid: this.ouid,
					type: 1
				});
				uni.hideLoading();
				this.sending = false;
				if (res1.code !== 0) {
					uni.showToast({
						title: res1.msg,
						icon: 'none'
					});
					return;
				}
				uni.showToast({
					title: '赠送星星成功',
					icon: 'none'
				});
				this.silverNum = parseInt(this.silverNum) + parseInt(this.sendMoney);
				var content = {
					fromUid: this.uid,
					toUid: this.ouid - 0,
					text: `赠送了` + this.sendMoney + `个星星给您`,
					type: 'silver'
				};
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送银元发送成功');
					}
				});
			}
			this.popMoney = false;
			this.sendMoney = '';
		},
		reloadUser() {
			randomRoom().then((res) => {
				console.log('获取随机房间');
				console.log(res);
				if (res.code !== 0) {
					uni.$u.toast(res.msg);
					return;
				}
				if (res.room.uid === this.uid) {
					//自己
					uni.reLaunch({
						url: '../../pages/user/user'
					});
				} else {
					this.ocateId = res.room.cateId;
					this.ouid = res.room.uid;
					this.getUserStatistics(this.ouid);
					this.getGetUserInfoById();
					this.otherList = [];
					this.getEnterRoom();
					this.getObtainSliver();
					this.getArmourConfig();
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.pages {
	.bg-img {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -10;
	}
}
.box-title {
	position: relative;
	width: 750rpx;
	margin-bottom: 12rpx;
	.my-img-box {
		position: relative;
		width: 750rpx;
		height: 350rpx;
		.my-img {
			margin: 10rpx;
			width: 730rpx;
			height: 330rpx;
			border-radius: 20rpx;
		}
	}

	.my-info {
		position: relative;
		width: 670rpx;
		margin: 0 auto;
		padding: 14rpx 28rpx;
		.armor-box {
			position: absolute;
			top: 50rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			left: 50rpx;
			font-size: 24rpx;
			line-height: 1.8;
			.armor-img {
				width: 50rpx;
				height: 66rpx;
			}
		}
		.infos-1 {
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;
			.portrait {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}
			.info {
				flex: 1;
				padding-right: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				.name-kj {
					display: flex;
					flex-direction: row-reverse;
					align-items: center;
					.name {
						font-size: 44rpx;
						line-height: 2;
					}
				}
				.about {
					display: flex;
					align-items: flex-end;
					width: 308rpx;
					height: 55rpx;
					white-space: nowrap;
					padding-left: 196rpx;
					div {
						width: 50%;
					}
				}
			}
		}
		.infos-2 {
			margin: 16rpx 0;
			/deep/.u-textarea {
				padding: 0 !important;
				background-color: transparent !important;
			}
		}
		.cost-start {
			.cost-level {
				position: relative;
				display: flex;
				flex-direction: row-reverse;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 16rpx;
				.level-img {
					width: 154rpx;
					height: 40rpx;
				}
				.level-img-says {
					position: absolute;
					top: 0;
					right: 32rpx;
					font-size: 30rpx;
					color: white;
					font-family: 'MyFont1';
				}
				.level-intro {
					display: flex;
					align-items: center;

					.level-start {
						width: 34rpx;
						height: 34rpx;
						margin-left: 6rpx;
					}
				}
				.level-start {
				}
			}
			.cost-step {
				position: relative;
				display: flex;
				/deep/.u-line-progress {
					border: 2rpx solid #ffbf41;
					border-left: 0;
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}
				/deep/.u-line-progress__line {
					background: linear-gradient(90deg, #ca8b45 0%, #feda7a 100%);
				}
				/deep/ .u-line-progress__line {
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}
				.step-progress {
					width: 18rpx;
					height: 8px;
					background: #ca8b45;
					border: 2rpx solid #ffbf41;
					border-right: 2rpx solid #916331;
					border-radius: 30rpx 0 0 30rpx;
				}
			}
		}
		.infos-3 {
			display: flex;
			flex-direction: row-reverse;
			flex-wrap: wrap;
			justify-content: space-between;
			[class^='contorl'] {
				position: relative;
				width: 144rpx;
				height: 102rpx;
				margin-top: 20rpx;
				img {
					width: 100%;
					height: 100%;
				}
				.mes-dot {
					position: absolute;
					width: 20rpx;
					height: 20rpx;
					background-color: #f56c6c;
					top: 12rpx;
					left: 12rpx;
					border-radius: 50%;
				}
			}
		}
	}
}
.list-item {
	width: 750rpx;
	box-sizing: border-box;
	padding: 10rpx 16rpx;
	.list-title {
		display: flex;
		width: 100%;
		height: 52rpx;
		justify-content: space-between;
		box-sizing: border-box;
		.dates {
			display: flex;
			align-items: center;
			color: #767374;
			image {
				width: 36rpx;
				height: 36rpx;
				margin: 0 10rpx;
			}
		}
	}
	.looks {
		overflow: hidden;
		margin-top: 6rpx;
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
			height: 460rpx;
		}
	}
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
	.funcs {
		margin-top: 6rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
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

/*先去除掉button自带的边框*/
button::after {
	border: none;
}

.bottom {
	height: 40rpx;
}
.bg {
	position: relative;
	width: 100%;
	background-color: transparent;
	.mimasuo {
		display: block;
		width: 550rpx;
		height: 650rpx;
		margin: 50rpx auto 20rpx;
	}
	.biguan {
		display: block;
		width: 550rpx;
		height: 550rpx;
		margin: auto;
	}

	/deep/.u-input {
		position: absolute;
		width: 348rpx;
		height: 74rpx;
		top: 300rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.mima-button {
		position: absolute;
		width: 138rpx;
		height: 138rpx;
		top: 444rpx;
		left: 50%;
		transform: translateX(-50%);
	}
}
/deep/.u-popup__content {
	border-radius: 30rpx 30rpx 0 0;
}
.send-box {
	width: 100%;
	height: 750rpx;
	padding: 120rpx 180rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	// justify-content: space-between;
	align-items: center;
	/deep/.u-input {
		flex: 0;
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
.next {
	margin-top: 10rpx;
	width: 100%;
	color: #a7a3a5;
	text-align: center;
}
.reload2 {
	position: fixed;
	top: 804rpx !important;
	right: 26rpx;
	z-index: 50;
}
</style>
