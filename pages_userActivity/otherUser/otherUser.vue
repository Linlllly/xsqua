<template>
	<div class="pages">
		<!-- <bgMusic class="bg-music"></bgMusic> -->
		<!-- 渲染其他用户 -->
		<div>
			<div class="box-title">
				<!-- 小背景 -->
				<img
					:src="coverImage === '' ? 'https://www.zairongyifang.com:8080/filePath/resource/default_room_bg.png' : coverImage"
					alt=""
					class="my-img"
				/>
				<!-- 底部淡出 -->
				<div class="width-bottom"></div>
				<img v-if="isFollow" class="chat" src="../ua_static/likes.png" alt="" @click="changeMylikes" />
				<img v-else class="chat" src="../ua_static/no-likes.png" alt="" @click="changeMylikes" />
				<img class="setting" src="../ua_static/chat-with.png" alt="" @click="toChatWith" />

				<!-- 头像和说明 -->
				<img class="portrait" :src="avatar" alt="" @click="previewImg([avatar])" />
				<!-- 标识 -->
				<div class="flower" @click="popMoney = true">
					<div class="box1">
						<img class="money-img" src="../../static/money.png" alt="" />
						<text :style="{ flex: 1, 'text-align': 'center' }">{{ silverNum }}</text>
					</div>
					<div class="box2">
						<img class="flower-img" src="../../static/flower.png" alt="" />
						<text :style="{ flex: 1, 'text-align': 'center' }">{{ flowerNum }}</text>
					</div>
					<div class="box3">
						<img class="eggs-img" src="../../static/poo.png" alt="" />
						<text :style="{ flex: 1, 'text-align': 'center' }">{{ eggNum }}</text>
					</div>
				</div>
				<!-- 房间名 -->
				<div class="focus">
					<div class="attention">关注：{{ follow }}</div>
					<div class="fans">粉丝：{{ fans }}</div>
				</div>
				<!-- 名字 -->
				<div class="name">{{ username }}</div>
				<!-- 盔甲 -->
				<img class="armor" v-if="armour" src="../../static/has-head.png" alt="" />
				<img class="armor" v-else src="../../static/no-head.png" alt="" />
				<div class="medal">
					<!-- 奖牌123  -->
					<div class="me1">
						<img v-if="silverNo === 1" src="../../static/first-money.png" alt="" />
						<img v-if="silverNo === 2" src="../../static/second-money.png" alt="" />
						<img v-if="silverNo === 3" src="../../static/third-money.png" alt="" />
					</div>
					<!-- 鲜花123 -->
					<div class="me2">
						<img v-if="flowerNo === 1" src="../../static/first.png" alt="" />
						<img v-if="flowerNo === 2" src="../../static/second.png" alt="" />
						<img v-if="flowerNo === 3" src="../../static/third.png" alt="" />
					</div>
				</div>
			</div>
			<!-- 签名 -->
			<div class="my-des">{{ myDes ? myDes : ' ' }}</div>
			<!--列表 -->
			<div v-if="type === 1 && otherList.length !== 0" class="list-item" v-for="(i, index) in otherList" :key="i.id">
				<!-- 头 -->
				<div class="list-title">
					<div class="dates">
						<img v-if="i.postTop" src="../../static/placed-top.png" alt="" />
						<text>{{ i.createTime }}</text>
						<text style="margin-left: 20rpx;">
							{{ i.meeting === 4 || i.meeting === 0 ? '欢喜的人' : i.meeting === 2 ? '随手文字' : '好玩的手艺' }}
						</text>
					</div>
				</div>
				<!-- 图 -->
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
					<!-- 一张-->
					<image
						class="singleImg"
						v-if="i.img && i.media.length === 1"
						:src="i.media[0]"
						mode="widthFix"
						@click="previewImg(i.media)"
					></image>
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
			<div v-if="type === 3" class="bg"><img class="biguan" src="../ua_static/biguan.png" mode="" /></div>
			<!-- 消息 发布和客服 -->
			<!-- 	<button class="issue" @click="toIssue"></button>
			<button class="message" @click="toMessage"><div v-if="messageDot" class="mes-dot"></div></button> -->
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
					<u--input
						placeholder="请输入赠送数量"
						prefixIcon="../../../../static/flower.png"
						prefixIconStyle="font-size: 38px;color: #909399"
						v-model="sendFlower"
						inputAlign="center"
						fontSize="18"
					></u--input>
					<u--input
						placeholder="请输入赠送数量"
						prefixIcon="../../../../static/poo.png"
						prefixIconStyle="font-size: 38px;color: #909399"
						v-model="sendPoo"
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
import { giveSilver, giveFlower } from '@/api/index.js';
import { giveEgg } from '@/api/articleDes.js';
import { redDot, getUserStatistics, getUserRank } from '@/api/user.js';
import { getArmourConfig } from '@/api/exchangeArmor.js';
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
			//花
			flowerNum: '',
			//臭鸡蛋
			eggNum: '',
			//鲜花名次
			flowerNo: '',
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
			//送花
			sendFlower: '',
			//送便便
			sendPoo: '',
			//---------------
			//密码
			password: '',
			//是否闭关 0不是1是
			isClose: '',
			otherList: [],
			isFollow: false,
			close: false,
			armour: false
		};
	},
	computed: {
		...mapState(['uid', 'house', 'myWs'])
	},
	onLoad(option) {
		this.ocateId = option.ocateId;
		this.ouid = option.ouid;
		this.getUserStatistics(option.ouid);
		this.getUserRank(option.ouid);
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
			getUserStatistics({ uid: uid }).then(res => {
				console.log('请求他人关注/粉丝数');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: '请求他人关注/粉丝数失败',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.fans = res.result.fans;
				this.follow = res.result.follow;
			});
		}, //获取用户各数量情况
		getUserRank(uid) {
			getUserRank({ uid: uid }).then(res => {
				console.log('获取其他用户各数量情况');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: '获取其他用户各数量情况失败',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.silverNum = res.result.silverNum;
				this.flowerNum = res.result.flowerNum;
				this.eggNum = res.result.eggNum;
			});
		},
		//盔甲状态
		getArmourConfig() {
			getArmourConfig({ uid: this.ouid }).then(res => {
				console.log('获取该用户盔甲状态');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: '获取该用户盔甲状态失败',
						icon: 'none',
						duration: 2000
					});
				} else {
					this.armour = res.result.armourStatus === 0 ? false : true;
				}
			});
		},
		async getObtainSliver() {
			let res = await obtainSliver({ sendUid: this.ouid });
			console.log('进马甲用户空间获得银两');
			console.log(res);
			if (res.code === 0) {
				uni.showToast({
					title: '触发好运~恭喜获得银两',
					icon: 'none',
					duration: 3000
				});
				//----------
				var content = { fromUid: this.ouid - 0, toUid: this.uid, text: `赠送了` + res.msg + `两银子给您`, type: 'silver' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws进马甲用户空间获得银两提示成功');
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
					title: '获取用户信息失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.avatar = res.result.avatar;

			this.myDes = res.result.intro;
			this.username = res.result.username;
			this.flowerNo = res.result.flowerNo;
			this.silverNo = res.result.silverNo;
			this.isFollow = res.result.isFollow;
		},
		//请求空间信息
		async getEnterRoom() {
			let res = await enterRoom({ cateId: this.ocateId });
			console.log('获取他人空间信息');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取空间信息失败',
					icon: 'none',
					duration: 2000
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
			let res = await getPostListByCateId({ cateId: this.ocateId, limit: this.limit, page: this.page, password: this.password });
			console.log('他人房间-动态列表分页');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取动态列表失败',
					icon: 'none',
					duration: 2000
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
				query.exec(res => {
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
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (!this.isFollow) {
				//关注
				let res = await addFollow({ id: this.ouid });
				if (res.code !== 0) {
					uni.showToast({
						title: '关注失败',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.isFollow = true;
				//-----------
				var content = { fromUid: this.uid, toUid: this.ouid - 0, text: '关注了您', type: 'follow' };
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
						title: '取消关注失败',
						icon: 'none',
						duration: 2000
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
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.popMoney = true;
			//
		},
		//去发布  没房子不能点
		toIssue() {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			uni.navigateTo({
				url: '../artcleIssue/artcleIssue'
			});
		},
		//确认密码
		confirmMima() {
			if (this.password === this.inputMima) {
				this.type = 1;
				this.getGetPostListByCateId();
			} else {
				uni.showToast({
					title: '密码输入不正确',
					icon: 'none',
					duration: 2000
				});
			}
		},
		//去聊天  没房子不能点
		toChatWith() {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人',
					icon: 'none',
					duration: 2000
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
					icon: 'none',
					duration: 2000
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
			if ((!this.sendMoney || this.sendMoney <= 0) && (!this.sendFlower || this.sendFlower <= 0) && (!this.sendPoo || this.sendPoo <= 0)) {
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
			if (this.sendMoney) {
				let res1 = await giveSilver({ num: this.sendMoney, receiveUid: this.ouid, type: 1 });
				uni.hideLoading();
				if (res1.code !== 0) {
					uni.showToast({
						title: '赠送银元失败',
						icon: 'none',
						duration: 2000
					});
					this.sending = false;
					return;
				}
				this.silverNum = parseInt(this.silverNum) + parseInt(this.sendMoney);
				//----------
				var content = { fromUid: this.uid, toUid: this.ouid - 0, text: `赠送了` + this.sendMoney + `两银子给您`, type: 'silver' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送银元发送成功');
					}
				});
			}
			if (this.sendFlower) {
				let res2 = await giveFlower({ num: this.sendFlower, receiveUid: this.ouid, type: 2 });
				uni.hideLoading();
				if (res2.code !== 0) {
					uni.showToast({
						title: '赠送鲜花失败',
						icon: 'none',
						duration: 2000
					});
					this.sending = false;
					return;
				}
				this.flowerNum = parseInt(this.flowerNum) + parseInt(this.sendFlower);
				//----------
				var content = { fromUid: this.uid, toUid: this.ouid - 0, text: `赠送了` + this.sendFlower + `朵鲜花给您`, type: 'flower' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送鲜花发送成功');
					}
				});
			}
			if (this.sendPoo) {
				let res3 = await giveEgg({ num: this.sendPoo, receiveUid: this.ouid, type: 3 });
				uni.hideLoading();
				if (res3.code !== 0) {
					uni.showToast({
						title: '赠送粪便失败',
						icon: 'none',
						duration: 2000
					});
					this.sending = false;
					return;
				}
				this.eggNum = parseInt(this.eggNum) + parseInt(this.sendPoo);
				//----------
				var content = { fromUid: this.uid, toUid: this.ouid - 0, text: `向你丢了` + this.sendPoo + `坨便便`, type: 'shit' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送便便发送成功');
					}
				});
			}
			this.sending = false;
			this.popMoney = false;
			this.sendMoney = '';
			this.sendFlower = '';
			this.sendPoo = '';
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
	height: 750rpx;
	.my-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 514rpx;
	}
	.width-bottom {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 752rpx;
		background: linear-gradient(transparent 60%, white 68%);
		// background: linear-gradient(transparent 60%, white 90%);
		color: #888586;
		text-align: center;
		line-height: 400rpx;
		font-size: 32rpx;
		letter-spacing: 10rpx;
	}
	.img-my-name {
		position: absolute;
		width: 288rpx;
		height: 148rpx;
		background: url('../../static/my-name.png') no-repeat;
		background-size: 288rpx 148rpx;
		top: 0rpx;
		left: 20rpx;
		text-align: center;
		color: white;
		padding-top: 54rpx;
	}
	.img-my-name-guanf {
		position: absolute;
		width: 288rpx;
		height: 148rpx;
		background: url('../../static/my-name.png') no-repeat;
		background-size: 288rpx 148rpx;
		top: 0rpx;
		left: 20rpx;
		text-align: center;
		color: white;
		padding-top: 72rpx;
	}
	.dynamic,
	.chat,
	.setting {
		position: absolute;
		width: 90rpx;
		height: 110rpx;
		top: 24rpx;
	}
	.dynamic {
		left: 444rpx;
	}
	.chat {
		left: 544rpx;
	}

	.setting {
		left: 644rpx;
	}
	.portrait {
		position: absolute;
		width: 160rpx;
		height: 160rpx;
		right: 32rpx;
		bottom: 94rpx;
		border-radius: 50%;
	}
	.flower {
		position: absolute;
		height: 46rpx;
		width: 520rpx;
		right: 210rpx;
		bottom: 98rpx;
		.box1,
		.box2,
		.box3 {
			padding: 0rpx 20rpx;
			float: left;
			display: flex;
			width: 172rpx;
			height: 44rpx;
			box-sizing: border-box;
		}
		.box1 {
			border-right: 2rpx solid #000000;
			.money-img {
				width: 46rpx;
				height: 46rpx;
			}
		}
		.box2 {
			border-right: 2rpx solid #000000;
			.flower-img {
				width: 40rpx;
				height: 40rpx;
			}
		}
		.box3 {
			.eggs-img {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.focus {
		position: absolute;
		right: 4rpx;
		bottom: 14rpx;
		height: 76rpx;
		width: 212rpx;
		text-align: center;
		color: #767374;
	}
	.name {
		position: absolute;
		right: 210rpx;
		bottom: 162rpx;
		width: 382rpx;
		height: 90rpx;
		background: url('../../static/my-name.png') no-repeat;
		background-size: 382rpx 90rpx;
		font-size: 30rpx;
		text-align: center;
		line-height: 90rpx;
	}
	.armor {
		position: absolute;
		right: 610rpx;
		bottom: 182rpx;
		width: 42rpx;
		height: 52rpx;
	}
	.medal {
		position: absolute;
		right: 210rpx;
		bottom: 14rpx;
		width: 520rpx;
		height: 80rpx;
		.me1,
		.me2 {
			float: left;
			width: 172rpx;
			height: 100%;
			image {
				width: 158rpx;
				height: 74rpx;
			}
		}
	}
}
.my-des {
	box-sizing: border-box;
	width: 94%;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
	border-radius: 16rpx;
	margin: 0 auto;
	padding: 6rpx 16rpx;
	opacity: 0.8;
	color: #333;
	/deep/.u-textarea {
		padding: 0 !important;
		background-color: transparent !important;
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

.issue {
	position: fixed;
	width: 128rpx;
	height: 128rpx;
	top: 966rpx;
	right: 18rpx;
	z-index: 50;
	background: url(../../static/issue.png) no-repeat;
	background-size: 128rpx 128rpx;
}
.message {
	position: fixed;
	width: 128rpx;
	height: 128rpx;
	top: 810rpx;
	right: 18rpx;
	z-index: 50;
	background: url(../../static/message.png) no-repeat;
	background-size: 128rpx 128rpx;
	.mes-dot {
		width: 20rpx;
		height: 20rpx;
		background-color: #f56c6c;
		margin-top: 12rpx;
		margin-left: -18rpx;
		border-radius: 50%;
	}
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
	justify-content: space-between;
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
	}
}
.next {
	margin-top: 10rpx;
	width: 100%;
	color: #a7a3a5;
	text-align: center;
}
</style>
