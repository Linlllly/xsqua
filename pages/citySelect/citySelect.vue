<template>
	<view class="reg">
		<img class="bg-img" :src="city.coverImage" alt="" />
		<div class="reg-title">
			<u-icon size="28" label="换一换" labelColor="#fff" labelPos="bottom" name="reload" color="#fff" @click="reloadArea"></u-icon>
		</div>
		<!-- 锚点小区 -->
		<div class="reg-content">
			<div
				class="content-item"
				v-for="(i, index) in it"
				:key="i.addr.uid"
				:style="{ marginBottom: i.bigBox ? '34rpx' : '', marginTop: !i.bigBox ? '34rpx' : '' }"
				@click="changeSelectState(i, index)"
			>
				<div
					class="btn"
					:style="{
						width: i.width,
						height: i.height,
						margin: `${i.mtop} 0 0 ${i.mleft}`,
						borderRadius: i.bdr,
						transform: i.transform ? i.transform : '',
						fontSize: i.fsize
					}"
				>
					<div class="text">
						<span class="street-title" :style="{ transform: i.transform ? 'rotate(-45deg)' : '' }">{{ i.addr.cateName }}</span>
					</div>
					<img
						class="local"
						src="../../static/坐标-fill.png"
						alt=""
						:style="{ top: i.top, left: i.left, transform: i.transform ? 'rotate(-45deg)' : '' }"
					/>
				</div>
			</div>
			<!-- ---- -->
		</div>
		<!-- 注册按钮的房间 -->
		<div v-if="showRoom" class="rooms">
			<div class="rooms-content">
				<u-icon name="close" color="#000" size="28" @click="showRoom = false"></u-icon>
				<div class="rooms-name">钦点主人房</div>
				<!-- <u-icon name="reload" color="#000" size="28"></u-icon> -->
				<div class="rooms-street-name">{{ roomTitle }}</div>
				<div class="content-box">
					<div
						v-for="(i, index) in roomList"
						:key="i.cateId"
						class="rooms-item"
						:class="[mySelect.cateId === i.cateId ? 'room-yes' : 'room-no']"
						@click="changeRoomState(i)"
					>
						{{ i.cateName }}
					</div>
				</div>
				<div class="rooms-prev" @click="reqRoomList(1)"></div>
				<div class="rooms-comfirm" @click="toRoomSet()">确认</div>
				<div class="rooms-next" @click="reqRoomList(2)"></div>
			</div>
		</div>
		<!-- 显示选择的房间 -->
		<div v-if="showPeoPle" class="people">
			<div class="people-content">
				<div class="title">
					<div class="title-left">
						<span class="wenzi">{{ roomTitle }}</span>
						<div class="icon-box" @click="reloadPeople">
							<u-icon name="reload" label="换一换" labelPos="bottom" color="#333" size="22"></u-icon>
						</div>
					</div>
					<div class="icon-box" @click="showPeoPle = false"><u-icon name="close" color="#333" size="22"></u-icon></div>
				</div>
				<div class="people-item" v-for="(i, index) in peopleList" :key="index" @click="toOtherUser(i)">
					<img :src="i.userInfo.avatar" alt="" />
					<div class="des">
						<div class="des-room">{{ i.cateName }}</div>
						<div class="des-say">{{ i.userInfo.intro ? i.userInfo.intro : ' ' }}</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import { list } from '@/api/citySelect.js';
import { bind, fchange } from '@/api/accessPossword.js';
import { myRoom } from '@/api/loginSelect.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			//这个页面属于哪个区域
			cateId: '',
			//背景图片
			bgImg: '',
			//所有街道的街道列表
			cityList: [],
			//随机选择到的街道信息
			city: '',
			//街道下面的锚点
			addrList: [],
			//it是结果 装style  每个街name  或许需要接跳转
			it: [],
			//==========================================================
			//显示房间列表
			showRoom: false,
			//房间列表(房间有没有被占用) true表示被占用了
			roomList: [],
			//小区名字
			roomTitle: '',
			//修改房间的i
			selectRoomItem: '',
			//请求页面
			pageNum: 1,
			//总页面
			totalPageNum: '',
			//请求数据条数
			pageSize: 20,
			//true代表从首页进来的 看别人的房间 false代表从注册页/设置页进来的
			lookHouse: false,
			//我现在正在选择的
			mySelect: '',
			//数据总数
			totalCount: 0,
			//=============================================
			showPeoPle: false,
			xiaoquPeople: '',
			peopleList: [],
			//仅传递到下一级用
			change: '',
			password: ''
		};
	},
	onLoad(option) {
		//获取传参
		this.cateId = option.cateId;
		this.change = option.change;
		this.lookHouse = option.lookHouse !== 'undefined' ? true : false;
		//随机获取页面详情
		this.getCityList();
		if (option.change === 'true') {
			this.getMyRoom();
		}
	},
	methods: {
		...mapMutations(['updateUid', 'updateAva', 'updateHouse']),
		//随机获取街道
		async getCityList() {
			let res = await list({ parentId: this.cateId });
			console.log('2.所有街道列表');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '请求街道失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			//所有街道的街道名称
			this.cityList = res.page.list;
			//没有街道
			if (this.cityList.length === 0) {
				uni.showToast({
					title: '该区域下暂未开放街道，请选择别的区域吧~',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			//随机一个街道
			let streetNum = Math.floor(Math.random() * this.cityList.length);
			this.city = this.cityList[streetNum];
			this.getStreetList();
		},
		//获取街道下面的锚点小区
		async getStreetList() {
			let res = await list({ parentId: this.city.cateId });
			console.log('3.随机街道下所有小区列表');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取小区失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			//所有小区名称
			this.addrList = res.page.list;
			//没有小区
			if (this.addrList.length === 0) {
				uni.showToast({
					title: '该街道下暂未开放小区，请选择别的街道吧~',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			//一切ok再生成页面
			this.generate();
		},
		//初始化锚点等生成页面
		generate() {
			//保证初始化渲染节点
			this.it = [];
			//获取节点
			for (let i = 0; i < this.addrList.length; i++) {
				let style = {};
				style.addr = this.addrList[i];
				//区域的padding是上边距还是下边距
				let bigBox = Math.floor(Math.random() * 2) + 1;
				if (bigBox === 1) {
					style.bigBox = true;
				} else {
					style.bigBox = false;
				}

				let sample = Math.floor(Math.random() * 4) + 1;
				//随机样子 正 圆 长 菱
				if (sample === 1 || sample === 2) {
					//正方形
					//随机大小
					let size = Math.floor(Math.random() * 2) + 1;
					let wd = null;
					let hd = null;
					let mgl = null;
					let mgt = null;

					if (size === 1) {
						//大
						wd = 208;
						hd = 208;
						style.width = wd + 'rpx';
						style.height = hd + 'rpx';
						style.fsize = '44rpx';
					} else if (size === 2) {
						//中
						wd = 190;
						hd = 190;
						style.width = wd + 'rpx';
						style.height = hd + 'rpx';
						style.fsize = '40rpx';
					}
					// //随机左边
					mgl = Math.floor(Math.random() * (278 - wd));
					// //随机顶部
					mgt = Math.floor(Math.random() * (208 - hd));

					// 随机四周
					let around = Math.floor(Math.random() * 4) + 1;

					if (around === 1) {
						style.top = '-48rpx';
						style.left = Math.floor(Math.random() * wd) + 'rpx';
					} else if (around === 2) {
						style.top = hd + 'rpx';
						style.left = Math.floor(Math.random() * wd) + 'rpx';
					} else if (around === 3) {
						style.left = '-48rpx';
						style.top = Math.floor(Math.random() * hd) + 'rpx';
					} else {
						style.left = wd + 'rpx';
						style.top = Math.floor(Math.random() * hd) + 'rpx';
					}
					let cOrS = Math.floor(Math.random() * 2) + 1;
					if (cOrS === 1) {
						style.bdr = '50%';
					} else {
						style.bdr = '20rpx';
					}

					this.it.push(style);
				} else if (sample === 3) {
					//长方形
					//随机大小
					let size = Math.floor(Math.random() * 2) + 1;
					let wd = null;
					let hd = null;
					let mgl = null;
					let mgt = null;

					if (size === 1) {
						//大
						wd = 278;
						hd = 200;
						style.width = wd + 'rpx';
						style.height = hd + 'rpx';
						style.fsize = '48rpx';
					} else if (size === 2) {
						//中
						wd = 260;
						hd = 168;
						style.width = wd + 'rpx';
						style.height = hd + 'rpx';
						style.fsize = '44rpx';
					}
					// //随机左边
					mgl = Math.floor(Math.random() * (278 - wd));
					// //随机顶部
					mgt = Math.floor(Math.random() * (208 - hd));

					style.mleft = mgl + 'rpx';
					style.mtop = mgt + 'rpx';

					// 随机四周
					let around = Math.floor(Math.random() * 4) + 1;

					if (around === 1) {
						style.top = '-48rpx';
						style.left = Math.floor(Math.random() * wd) + 'rpx';
					} else if (around === 2) {
						style.top = hd + 'rpx';
						style.left = Math.floor(Math.random() * wd) + 'rpx';
					} else if (around === 3) {
						style.left = '-48rpx';
						style.top = Math.floor(Math.random() * hd) + 'rpx';
					} else {
						style.left = wd + 'rpx';
						style.top = Math.floor(Math.random() * hd) + 'rpx';
					}
					style.bdr = '20rpx';
					this.it.push(style);
				} else {
					//菱形
					//随机大小
					let size = Math.floor(Math.random() * 1) + 1;
					let wd = null;
					let hd = null;
					let mgl = null;
					let mgt = null;

					if (size === 1) {
						//大
						wd = 202;
						hd = 202;
						style.width = wd + 'rpx';
						style.height = hd + 'rpx';
						style.fsize = '44rpx';
					}
					// //随机左边
					mgl = Math.floor(Math.random() * (278 - wd));
					// //随机顶部
					mgt = Math.floor(Math.random() * (208 - hd));

					style.mleft = mgl + 'rpx';
					style.mtop = mgt + 'rpx';

					// 随机四周
					let around = Math.floor(Math.random() * 4) + 1;

					if (around === 1) {
						style.top = '-48rpx';
						style.left = Math.floor(Math.random() * wd) + 'rpx';
					} else if (around === 2) {
						style.top = hd + 'rpx';
						style.left = Math.floor(Math.random() * wd) + 'rpx';
					} else if (around === 3) {
						style.left = '-48rpx';
						style.top = Math.floor(Math.random() * hd) + 'rpx';
					} else {
						style.left = wd + 'rpx';
						style.top = Math.floor(Math.random() * hd) + 'rpx';
					}

					style.transform = 'rotate(45deg)';
					style.bdr = '20rpx';
					//旋转
					this.it.push(style);
				}
			}
		},
		//lookHouse存在是查看 lookHouse不存在是注册
		changeSelectState(i, index) {
			if (!this.lookHouse) {
				this.selectRoomItem = this.it[index];
				this.getRoom(this.it[index]);
			} else {
				this.xiaoquPeople = this.it[index];
				this.getPeople(this.it[index]);
			}
		},
		//===============如果是注册====================
		//选择小区 查看具体房间
		async getRoom(i) {
			this.showRoom = true;
			this.roomTitle = i.addr.cateName;
			//开始请求
			let res = await list({ page: this.pageNum, limit: this.pageSize, parentId: i.addr.cateId, isLock: 0 });
			console.log('4.点击小区显示所有没被选择的房间');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取房间失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.roomList = res.page.list;
			this.totalPageNum = res.page.totalPage;
			this.totalCount = res.page.totalCount;
			//如果没有房间
			if (this.roomList.length === 0) {
				uni.showToast({
					title: '该小区下暂未开放房间，请选择别的房间吧~',
					icon: 'none',
					duration: 2000
				});
				return;
			}
		},

		//暂选房间改变状态
		changeRoomState(i) {
			this.mySelect = i;
		},
		async getMyRoom() {
			let res = await myRoom();
			if (res.code !== 0) {
				uni.showToast({
					title: '获取用户密码失败，请稍后再更换房间',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.password = res.room.password ? res.room.password : '';
		},
		//点击按钮确定选定房间
		async toRoomSet() {
			//是空房间跳转选择密码
			// this.showRoom = false;
			// uni.navigateTo({
			// 	url: '/pages/accessPossword/accessPossword?type=' + 1 + '&id=' + this.mySelect.cateId + '&change=' + this.change
			// });
			if (this.change === 'true') {
				//换绑
				let res = await fchange({ cateId: this.mySelect.cateId, password: this.password });
				if (res.code === 0) {
					uni.reLaunch({
						url: '../user/user'
					});
				} else {
					uni.showToast({
						title: '换绑失败',
						icon: 'none',
						duration: 2000
					});
				}
			} else {
				//注册成功
				let res = await bind({ cateId: this.mySelect.cateId, password: '' });
				if (res.code === 0) {
					//有房了
					uni.setStorageSync('house', true);
					this.updateHouse();
					uni.reLaunch({
						//注册完成 重定向到个人中心
						url: '../user/user'
					});
				} else {
					uni.showToast({
						title: '注册失败',
						icon: 'none',
						duration: 2000
					});
				}
			}
		},
		// 刷新选择页面
		reloadArea() {
			//刷新街区
			this.getCityList();
		},
		//上一页和下一页
		reqRoomList(i) {
			if (i === 1) {
				if (this.pageNum === 1) {
					uni.showToast({
						title: '已经在第一页了~',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.pageNum -= 1;
				//请求接口
				this.getRoom(this.selectRoomItem);
			} else if (i === 2) {
				if (this.pageNum >= this.totalPageNum) {
					uni.showToast({
						title: '已经在最后一页了~',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.pageNum += 1;
				this.getRoom(this.selectRoomItem);
			}
			//请求接口
		},
		//===============如果是查看====================
		//选择小区 查看随机人
		getPeople(i) {
			this.showPeoPle = true;
			this.roomTitle = i.addr.cateName;
			this.getPeopleAgain();
		},
		async getPeopleAgain() {
			//获取后台用户
			let res = await list({ page: 1, limit: 8, parentId: this.xiaoquPeople.addr.cateId, isLock: 1, isRandom: 1 });
			console.log('4.随机用户');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取随机用户列表失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.peopleList = res.page.list;
		},
		reloadPeople() {
			this.getPeopleAgain();
			uni.showToast({
				title: '已刷新',
				icon: 'none',
				duration: 1500
			});
		},
		toOtherUser(i) {
			if (i.uid === this.uid) {
				//自己
				uni.switchTab({
					url: '../user/user'
				});
			}
			uni.navigateTo({
				url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + i.uid
			});
		}
	}
};
</script>

<style lang="less">
// /deep/.u-icon--right {
// 	position: absolute;
// }
.reg {
	position: relative;
	width: 100%;
	min-height: 1480rpx;
	background-color: rgba(0, 0, 0, 0.1);
}

// /deep/.uicon-reload {
// 	position: absolute;
// 	top: 60rpx !important;
// 	left: 30rpx;
// 	background-color: rgba(0, 0, 0, 0.5);
// 	border-radius: 50%;
// 	padding: 15rpx;
// }
.reg-title {
	width: 170rpx;
	height: 150rpx;
	box-sizing: border-box;
	padding: 36rpx 36rpx 0;

	/deep/.uicon-reload {
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
	}
}

.reg-content {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	.content-item {
		box-sizing: border-box;
		width: 360rpx;
		// height: 40vh;
		padding: 46rpx;
	}
}
.reg-content .content-item:nth-child(2n) {
	padding-left: 36rpx;
}
.reg-content .content-item:nth-child(2n + 1) {
	padding-right: 36rpx;
}
.reg-content .content-item:nth-child(1) {
	height: 556rpx;
}
.reg-content .content-item:nth-child(2) {
	height: 556rpx;
}
.reg-content .content-item:nth-child(3) {
	height: 706rpx;
}
.reg-content .content-item:nth-child(4) {
	height: 706rpx;
}
.btn {
	position: relative;
	color: white;
	background-color: rgba(0, 0, 0, 0.4);
	box-shadow: 0rpx 1rpx 0.5rpx 0rpx white inset;
}

.text {
	position: absolute;
	display: flex;
	width: 100%;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
	flex-direction: column;
	justify-content: center;
	text-align: center;
	.street-title {
	}
}

.local {
	position: absolute;
	width: 44rpx;
	height: 44rpx;
}
.bg-img {
	position: absolute;
	width: 100%;
	height: 1480rpx;
	z-index: -5;
	img {
		width: 100%;
		height: 100%;
	}
}
.rooms {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);

	.rooms-content {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		align-content: flex-start;
		width: 664rpx;
		height: 1080rpx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.75);
		border-radius: 16rpx;
		margin: 166rpx auto 0;
		padding: 72rpx 35rpx 110rpx;
		box-sizing: border-box;

		// /deep/.uicon-reload {
		// 	position: absolute;
		// 	top: -55rpx !important;
		// 	left: 552rpx;
		// }
		/deep/.uicon-close {
			position: absolute;
			top: 25rpx !important;
			left: 25rpx;
		}
		.rooms-name {
			position: absolute;
			top: 20rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 90px;
			height: 25px;
			font-size: 18px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 25px;
		}
		.rooms-street-name {
			width: 100%;
			height: 42px;
			font-size: 30px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #f04f2f;
			line-height: 42px;
			text-align: center;
			margin: 6rpx 0;
		}

		.content-box {
			display: flex;
			flex-wrap: wrap;
			// align-items: start;
			align-content: flex-start;
			width: 100%;
			height: 800rpx;
			.rooms-item {
				width: 136rpx;
				height: 140rpx;
				margin: 10rpx 7rpx;
				color: #333;
				font-weight: 600;
				font-size: 36rpx;
				text-align: center;
				line-height: 140rpx;
			}
		}
		.rooms-prev,
		.rooms-next {
			position: absolute;
			bottom: 26rpx;
			width: 72rpx;
			height: 72rpx;
			background-size: 72rpx 72rpx;
		}
		.rooms-comfirm {
			position: absolute;
			bottom: 26rpx;
			width: 122rpx;
			height: 72rpx;
			line-height: 72rpx;
			text-align: center;
			left: 41%;
			border-radius: 19px 19px 19px 19px;
			border: 4rpx solid #fcd621;
			background-color: rgba(255, 255, 255, 0.7);
		}
		.rooms-prev {
			background: url(../../static/left.png) no-repeat;
			left: 27%;
		}
		.rooms-next {
			background: url(../../static/right.png) no-repeat;
			right: 27%;
		}
	}
}
.room-yes {
	background: url(../../static/room-yes.png) no-repeat;
	background-size: 136rpx 140rpx;
}
.room-no {
	background: url(../../static/room-no.png) no-repeat;
	background-size: 136rpx 140rpx;
}
.people {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);

	.people-content {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		align-content: flex-start;
		width: 620rpx;
		height: 1200rpx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 30rpx;
		margin: 156rpx auto 0;
		padding: 30rpx 50rpx 20rpx;
		box-sizing: border-box;
		.title {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 90rpx;
		}
		.title-left {
			display: flex;
			.wenzi {
				font-size: 44rpx;
				line-height: 1.8;
				padding-bottom: 8rpx;
				border-bottom: 4rpx solid #727272;
			}
		}

		.icon-box {
			width: 90rpx;
			height: 100%;
			padding-top: 20rpx;
			padding-left: 10rpx;
			/deep/.uicon-reload {
				top: 0 !important;
				left: 0 !important;
				background-color: transparent;
				padding: 0;
			}
			/deep/.uicon-close {
				margin-left: 40rpx;
			}
		}
	}
	.people-item {
		display: flex;
		width: 100%;
		height: 130rpx;
		align-items: center;
		padding: 10rpx 0;
		box-sizing: border-box;
		border-bottom: 2rpx solid #a6a6a6;
		image {
			width: 90rpx;
			height: 90rpx;
			margin: 0 10rpx;
			border-radius: 50%;
		}
		.des {
			flex: 1;
			display: flex;
			flex-direction: column;
			.des-room {
				font-size: 32rpx;
			}
			.des-say {
				flex: 1;
				font-size: 28rpx;
				overflow: hidden !important;
				text-overflow: ellipsis !important; /* 超出部分省略号 */
				word-break: break-all !important; /* break-all(允许在单词内换行。) */
				display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
				-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
				-webkit-line-clamp: 1 !important; /* 显示的行数 */
			}
		}
	}
}
</style>
