<template>
	<view class="pages">
		<img class="bg-img" src="../../static/area-select-bg.png" alt="" />
		<!-- 超级盔甲 -->
		<div class="content-list" @click="checkType">
			<u-icon name="level" color="#e89406" size="20"></u-icon>
			<div class="info-name">超级安全盔甲</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<!-- 档案 -->
		<!-- <div class="content-list" @click="goSecret">
			<u-icon name="coupon" color="#e89406" size="20"></u-icon>
			<div class="info-name">X档案</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div> -->
		<!-- 邀请微信好友 -->
		<!-- <div class="content-list" @click="showFriend = true">
			<u-icon name="weixin-fill" color="#e89406" size="20"></u-icon>
			<div class="info-name">邀请微信好友</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div> -->
		<!-- 查看拉黑用户 -->
		<div class="content-list" @click="goShieldList">
			<u-icon name="minus-people-fill" color="#e89406" size="20"></u-icon>
			<div class="info-name">查看拉黑用户</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<!-- 查看或修改房间密码 -->
		<!-- <div class="content-list" @click="changeSecret = true">
			<u-icon name="edit-pen" color="#e89406" size="20"></u-icon>
			<div class="info-name">设置房间密码</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div> -->
		<!-- 空间介绍 -->
		<!-- <div class="content-list" @click="goIntroduce()">
			<u-icon name="pushpin" color="#e89406" size="20"></u-icon>
			<div class="info-name">空间介绍</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div> -->
		<!-- 客服 -->
		<button class="content-list" type="primary" open-type="contact">
			<u-icon name="server-man" color="#e89406" size="20"></u-icon>
			<div class="info-name">联系管家</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</button>
		<!-- 退出 -->
		<div class="content-list" @click="showByeBye = true">
			<u-icon name="setting" color="#e89406" size="20"></u-icon>
			<div class="info-name">退出登录</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<div class="admin" @click="goAdminLogin"></div>
		<u-modal
			:show="showByeBye"
			title="确定退出吗"
			confirmColor="#e89406"
			showCancelButton="true"
			@cancel="showByeBye = false"
			@confirm="confirmByeBye"
			width="550rpx"
		></u-modal>
		<!-- 留言 -->
		<u-overlay
			:show="showFriend"
			@click="
				showFriend = false;
				shengcheng = true;
			"
		>
			<div v-if="shengcheng" class="req-friend" @tap.stop>
				<img src="https://www.zairongyifang.com:8080/filePath/app/20236/dce268614f.png" alt="" />
				<div v-if="showFriend && shengcheng">
					<u--textarea
						class="say-box"
						border="null"
						v-model="inviteContent"
						placeholder="请输入留言"
						height="100px"
						maxlength="15"
						placeholderStyle="color: #767374"
						color="#767374"
						:adjustPosition="true"
						:showConfirmBar="false"
					></u--textarea>
				</div>
				<div class="get-erweima" @click="createQRCode()">下一步</div>
			</div>
			<div v-else class="my-friend" @tap.stop>
				<image class="code_view" :src="imagePath"></image>
				<img src="https://www.zairongyifang.com:8080/filePath/app/20236/b928ccf85c.png" alt="" />
				<div class="invite-content">{{ inviteContent }}</div>
				<button open-type="share" class="share-box">分享</button>
				<div class="back-to" @click="shengcheng = true">上一步</div>
			</div>
		</u-overlay>
	</view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { getArmourConfig } from '@/api/exchangeArmor.js';
import { userInfo, userInfoEdit, getQRCode } from '@/api/user.js';
import { myRoom } from '@/api/loginSelect.js';
import { ip } from '@/api/api.js';
import QRCode from '../../utils/weapp-qrcode.js';
const App = getApp();
export default {
	data() {
		return {
			myAudio: true,
			//房间是否不可见
			unlookMyRoom: false,
			haveMyRoomSecret: false,
			//原密码
			password: '',
			//展示密码
			changeSecret: false,
			oldSecret: '',
			newSecret: '',
			//退出
			showByeBye: false,
			showFriend: false,
			//二维码
			uid: null,
			shengcheng: true,
			inviteContent: '',
			imagePath: null,
			linshiImagePath: null,
			canva: true,
			showSub: false,
			armour: false
		};
	},
	onLoad(query) {
		this.getuserInfo();
		this.getMyRoom();
		this.showNowScrect = this.nowScrect;
	},
	onShareAppMessage() {
		return {
			title: this.inviteContent,
			path: '/pages_userActivity/erWeiMa/erWeiMa?imagePath=' + this.imagePath + '&&inviteContent=' + this.inviteContent
		};
	},
	methods: {
		//生成二维码
		async createQRCode() {
			if (!this.inviteContent) {
				this.inviteContent = '让我们一起在安全空间里聊天！';
			}
			this.changeMyInviteContent();
			uni.showLoading({
				title: '二维码生成中'
			});

			this.shengcheng = false;
			let res = await getQRCode({ page: 'pages/loginSelect/loginSelect', scene: this.uid.toString(), width: 430 }, 'arraybuffer');

			const fsm = wx.getFileSystemManager();
			const FILE_BASE_NAME = 'qrcode_base64src';
			const filePath = wx.env.USER_DATA_PATH + '/' + FILE_BASE_NAME + '.jpg';
			const _that = this;
			fsm.writeFile({
				filePath,
				data: res,
				encoding: 'binary',
				success() {
					_that.canva = false;
					wx.hideLoading();
					_that.doUpload3(filePath);
				},
				fail() {}
			});
		},
		async changeMyInviteContent() {
			let res = await userInfoEdit({ inviteContent: this.inviteContent ? this.inviteContent : '让我们一起在安全空间里聊天！' });
			if (res.code === 0) {
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.inviteContent = '';
			}
		},
		doUpload3(rsp) {
			this.linshiImagePath = rsp;
			uni.uploadFile({
				url: ip + '/app/common/upload',
				filePath: rsp,
				name: 'file',
				header: {
					token: uni.getStorageSync('token')
				},
				success: uploadFileRes => {
					let paths = JSON.parse(uploadFileRes.data);
					this.imagePath = paths.result[0].url;
				}
			});
		},
		checkType() {
			getArmourConfig().then(res => {
				console.log('获取当前盔甲状态');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				} else {
					this.armour = res.result.armourStatus === 0 ? false : true;
					if (!this.armour) {
						uni.navigateTo({
							url: '../../pages_costMoney/exchangeArmor/exchangeArmor'
						});
					} else {
						uni.navigateTo({
							url: '../updateArmor/updateArmor'
						});
					}
				}
			});
		},
		goIntroduce() {
			uni.navigateTo({
				url: '../xIntroduce/xIntroduce'
			});
		},
		goShieldList() {
			uni.navigateTo({
				url: '../shieldList/shieldList'
			});
		},
		confirmByeBye() {
			uni.reLaunch({
				url: '../../pages/loginSelect/loginSelect'
			});
		},
		//去x文件
		goSecret() {
			uni.navigateTo({
				url: '../mySecret/mySecret'
			});
		},
		//请求个人信息
		async getuserInfo() {
			let res = await userInfo();
			console.log('请求用户信息');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				return;
			}
			this.uid = res.result.uid;
			this.inviteContent = res.result.inviteContent;
		},
		async getMyRoom() {
			let res = await myRoom();
			console.log('请求空间详细数据');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				return;
			}
			this.unlookMyRoom = res.room.isClose === 1 ? true : false;
			this.password = res.room.password;
		},
		//管理员登录
		goAdminLogin() {
			uni.navigateTo({
				url: '../adminLogin/adminLogin'
			});
		}
	}
};
</script>

<style lang="less">
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
.content-list {
	height: 120rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 20rpx;
	margin: 30rpx;
	border-radius: 20rpx;
	background-color: white !important;
	box-shadow: 3rpx 3rpx 5rpx 0rpx #a4a4a4;

	.info-name {
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		color: #333;
		line-height: 1.5;
		margin: 0 20rpx;
	}
}
.admin {
	width: 100rpx;
	height: 100rpx;
	margin: 100rpx auto 0;
}

.req-friend {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 648rpx;
	height: 850rpx;
	margin: 22% auto;
	justify-content: center;

	img {
		width: 100%;
		height: 100%;
	}
	/deep/.u-textarea {
		white-space: pre;
		position: absolute !important;
		width: 424rpx !important;
		top: 520rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 0 20rpx !important;
		background-color: transparent !important;
	}
	/deep/.u-textarea__field {
		font-size: 36rpx !important;
		color: #694e31 !important;
	}
	.get-erweima {
		position: absolute;
		width: 468rpx;
		height: 66rpx;
		top: 706rpx;
		left: 50%;
		transform: translateX(-50%);
		color: transparent;
	}
}

.my-friend {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 648rpx;
	height: 850rpx;
	margin: 22% auto;
	justify-content: center;
	img {
		width: 100%;
		height: 100%;
	}
	.code_view {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 120rpx;
		margin: 40rpx auto;
		width: 170rpx;
		height: 170rpx;
		border-radius: 50%;
	}
	.invite-content {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 520rpx;
		color: #694e31;
		font-size: 34rpx;
		width: 416rpx;
		word-break: break-all;
	}
	.share-box {
		position: absolute;
		right: 108rpx;
		top: 706rpx;
		width: 200rpx;
		height: 70rpx;
		color: transparent;
		background-color: transparent;
		&::after {
			border: none; //黑色边框去掉了
		}
	}
	.back-to {
		position: absolute;
		left: 108rpx;
		top: 706rpx;
		width: 200rpx;
		height: 70rpx;
		color: transparent;
		background-color: transparent;
	}
}
</style>
