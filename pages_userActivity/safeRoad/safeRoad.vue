<template>
	<view class="pages">
		<img class="bg-img" src="../../static/area-select-bg.png" alt="" />

		<div class="content-list" @click="toChatList">
			<u-icon name="../../../../static/m1.png" color="#e89406" size="20"></u-icon>
			<div class="info-name">私密聊天列表</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<div class="content-list" @click="changeSecret = true">
			<u-icon name="../../../../static/m2.png" color="#e89406" size="20"></u-icon>
			<div class="info-name">安全聊天密钥</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<div class="content-list" @click="showSearch = true">
			<u-icon name="search" color="#e89406" size="20"></u-icon>
			<div class="info-name">空间好友搜索</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<div class="content-list" @click="showFriend = true">
			<u-icon name="../../../../static/m4.png" color="#e89406" size="20"></u-icon>
			<div class="info-name">邀请微信好友</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>

		<div class="content-list" @click="goSecret">
			<u-icon name="../../../../static/m5.png" color="#e89406" size="20"></u-icon>
			<div class="info-name">安全档案</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>

		<div class="content-list" @click="showSub = true">
			<u-icon name="bell-fill" color="#e89406" size="20"></u-icon>
			<div class="info-name">微信消息通知</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<!-- 空间介绍 -->
		<div class="content-list" @click="goIntroduce">
			<u-icon name="../../../../static/m7.png" color="#e89406" size="20"></u-icon>
			<div class="info-name">空间介绍</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<!-- 订阅弹窗 -->
		<u-modal :show="showSub" :title="'订阅消息提示'" :content="'每次离开空间时，点击:“允许订阅”即可在微信页面收到空间新消息提醒'" @confirm="doSub"></u-modal>
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
		<!-- 修改密码框 -->
		<u-modal
			title="修改房间密码"
			:show="changeSecret"
			@confirm="confirmChangeSecret"
			showCancelButton
			@cancel="
				changeSecret = false;
				newSecret = '';
				oldSecret = '';
			"
			confirmColor="#e89406"
		>
			<view class="slot-content">
				<u--form labelPosition="left" ref="form1" labelWidth="100rpx" :labelStyle="{ color: '#515151' }">
					<u-form-item label="原密码"><u-input placeholder="请输入原密码" v-model="oldSecret" maxlength="6"></u-input></u-form-item>
					<u-form-item label="新密码"><u-input placeholder="请输入新密码" v-model="newSecret" maxlength="6"></u-input></u-form-item>
				</u--form>
				<div
					:style="{
						color: '#888888',
						textAlign: 'center',
						fontSize: '26rpx',
						margin: '10rpx 0 0 0'
					}"
				>
					* 新用户设置房间密码，填写新密码即可
				</div>
				<div
					:style="{
						color: '#888888',
						textAlign: 'center',
						fontSize: '26rpx',
						margin: '10rpx 0 0 0'
					}"
				>
					* 新密码不填写即代表不设密码
				</div>
			</view>
		</u-modal>
		<!-- 展示搜索 -->
		<u-overlay :show="showSearch" @click="showSearch = false">
			<div class="search">
				<div class="search-text">·对方需已入住空间·</div>
				<div class="search-box">
					<u-search
						placeholder="空间好友: 房号/个性签名"
						v-model="searchText"
						:clearabled="true"
						actionText="搜索"
						@search="getSelectRoom"
						@custom="getSelectRoom"
						@tap.stop
					></u-search>
				</div>
			</div>
		</u-overlay>
		<!-- 搜索结果 -->
		<u-popup :show="popSearch" @close="popSearch = false" :safeAreaInsetBottom="false">
			<div>
				<div class="search-result">搜索结果</div>
				<scroll-view v-if="peopleList.length !== 0" :scroll-y="true" style="width: 100%; height: 696rpx">
					<div class="people-item" v-for="(i, index) in peopleList" :key="index" @click="toOtherUser(i)">
						<img :src="i.userInfo.avatar" alt="" />
						<div class="des">
							<div class="des-room">
								{{ i.userInfo.username }}
							</div>
							<div class="des-say">
								{{ i.userInfo.intro ? i.userInfo.intro : ' ' }}
							</div>
						</div>
					</div>
				</scroll-view>
				<div v-else class="no-more">———— 没有匹配到相关用户 ————</div>
			</div>
		</u-popup>
	</view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
// import { getArmourConfig } from '@/api/updateArmor.js'
import { selectRoom } from '@/api/loginSelect.js';
import { userInfo, userInfoEdit, getQRCode, updatePassword } from '@/api/user.js';
import { myRoom } from '@/api/loginSelect.js';
import { ip } from '@/api/api.js';
import QRCode from '../../utils/weapp-qrcode.js';
const App = getApp();
export default {
	data() {
		return {
			showSearch: false,
			searchText: '',
			popSearch: false,
			peopleList: [],
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
		async getSelectRoom() {
			if (this.searchText === '') {
				return;
			}
			let res = await selectRoom({ key: this.searchText });
			console.log('搜索用户');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.popSearch = true;
			this.peopleList = res.room;
		},
		toOtherUser(i) {
			if (i.uid === this.uid) {
				uni.navigateBack();
			}
			uni.navigateTo({
				url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + i.uid
			});
		},
		//获取用户订阅消息与否
		doSub() {
			this.showSub = false;
			let that = this;
			if (!uni.getStorageSync('openId')) {
				uni.$u.toast('只有微信用户才可以选择消息推送！');
				return;
			}
			wx.requestSubscribeMessage({
				tmplIds: ['CQQcQ9HEHzAyrhtIu3hbFciZ6IZylcB0j1e-9mRYrOA'],
				success: function (res) {
					// 判断用户是否选择了订阅
					if (res['CQQcQ9HEHzAyrhtIu3hbFciZ6IZylcB0j1e-9mRYrOA'] === 'accept') {
						that.updatePush();
					} else {
						uni.showModal({
							title: '提示',
							content: '您已取消微信订阅，如需开启，请打开右上角“···”-设置-订阅消息-未读消息提醒-接收',
							showCancel: false, // 不显示取消按钮
							confirmText: '确认' // 确认按钮的文本
						});
						// 引导用户手动打开授权设置页面
						wx.openSetting({
							success: function (res) {
								if (res.authSetting['scope.subscribeMessage'] === true) {
									that.pushMyMessage();
								}
							}
						});
					}
				},
				fail: function (err) {
					// 订阅消息失败的回调处理
					console.error(err);
				}
			});
		},
		//更新密码
		async confirmChangeSecret() {
			if (this.oldSecret !== this.password) {
				uni.$u.toast('原密码输入错误');

				return;
			}
			if (this.newSecret !== '' && this.newSecret.length !== 6) {
				uni.$u.toast('密码长度必须设置为6位');
				return;
			}
			let res = await updatePassword({ password: this.newSecret });
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			uni.showToast({
				title: '修改密码成功',
				icon: 'none'
			});
			this.changeSecret = false;
			this.password = this.newSecret;
			this.newSecret = '';
			this.oldSecret = '';
		},
		toChatList() {
			uni.navigateTo({
				url: '../../pages_userActivity/chatList/chatList'
			});
		},
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
			let res = await getQRCode(
				{
					page: 'pages/loginSelect/loginSelect',
					scene: this.uid.toString(),
					width: 430
				},
				'arraybuffer'
			);

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
			let res = await userInfoEdit({
				inviteContent: this.inviteContent ? this.inviteContent : '让我们一起在安全空间里聊天！'
			});
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
				success: (uploadFileRes) => {
					let paths = JSON.parse(uploadFileRes.data);
					this.imagePath = paths.result[0].url;
				}
			});
		},
		checkType() {
			getArmourConfig().then((res) => {
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
							url: '../../pages_costMoney/costMoney/costMoney'
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
		top: 494rpx;
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

.search {
	width: 750rpx;
	position: fixed;
	bottom: 0upx;
	padding: 20rpx 0 420rpx;
	.search-text {
		background: #fff;
		color: #fd7b41;
		border-radius: 22rpx;
		border: 2rpx solid #fd7b41;
		text-align: center;
		margin: 0 200rpx;
	}
	.search-box {
		width: 600rpx;
		height: 44rpx;
		margin: 10rpx auto;
		/deep/.u-search__content {
			border: 2rpx solid #979797 !important;
		}
		/deep/.u-search__action {
			color: #626262;
			font-size: 36rpx;
		}
	}
}
/deep/.u-popup__content {
	border-radius: 30rpx 30rpx 0 0 !important;
}
.search-result {
	font-size: 40rpx;
	color: #e99300;
	text-align: center;
	margin: 30rpx 20rpx 10rpx;
	padding-bottom: 30rpx;
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
.no-more {
	margin: 30rpx auto;
	width: 100%;
	height: 668rpx;
	color: #767374;
	text-align: center;
}
</style>
