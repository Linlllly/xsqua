<template>
	<view class="pages">
		<img class="bg-img" src="../../static/area-select-bg.png" alt="" />
		<!-- 关闭背景音乐 -->
		<!-- <div class="content-list">
			<u-icon name="volume" color="#e89406" size="20"></u-icon>
			<div class="info-name">开启/关闭背景音</div>
			<u-switch v-model="myAudio" @change="changeBgcState" activeColor="#e89406"></u-switch>
		</div>
 -->
		<!-- 设置房间为不可查看 -->
		<div class="content-list">
			<u-icon name="close-circle" color="#e89406" size="20"></u-icon>
			<div class="info-name">设置闭关修炼</div>
			<u-switch v-model="unlookMyRoom" @change="changeMyRoomLookState" activeColor="#e89406"></u-switch>
		</div>

		<!-- 设置房间有密码 -->
		<div class="content-list" @click="goSecret">
			<u-icon name="coupon" color="#e89406" size="20"></u-icon>
			<div class="info-name">X档案</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>

		<!-- 更换页面 -->
		<div class="content-list" @click="changeHouse">
			<u-icon name="grid" color="#e89406" size="20"></u-icon>
			<div class="info-name">更换房间</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>

		<!-- 查看或修改房间密码 -->
		<div class="content-list" @click="changeSecret = true">
			<u-icon name="edit-pen" color="#e89406" size="20"></u-icon>
			<div class="info-name">设置房间密码</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<!-- 注销 -->
		<!-- 	<div class="content-list" @click="showLoginOut = true">
			<u-icon name="pushpin" color="#e89406" size="20"></u-icon>
			<div class="info-name">注销空间</div>
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
				<u--form labelPosition="left" ref="form1" labelWidth="100rpx" :labelStyle="{ color: '#767676' }">
					<u-form-item label="原密码">
						<u-input placeholder="请输入原密码" v-model="oldSecret" maxlength="6">
							<!-- <template slot="suffix">
										<u-icon name="eye-off" color="#82969c" size="24"></u-icon>
									</template> -->
						</u-input>
					</u-form-item>
					<u-form-item label="新密码">
						<u-input placeholder="请输入新密码" v-model="newSecret" maxlength="6">
							<!-- <template slot="suffix">
										<u-icon name="eye-off" color="#82969c" size="24"></u-icon>
									</template> -->
						</u-input>
					</u-form-item>
				</u--form>
				<div :style="{ color: '#b3b3b3', textAlign: 'center', fontSize: '26rpx', margin: '10rpx 0 0 0' }">
					* 新用户设置房间密码，填写新密码即可
				</div>
				<div :style="{ color: '#b3b3b3', textAlign: 'center', fontSize: '26rpx', margin: '10rpx 0 0 0' }">* 新密码不填写即代表不设密码</div>
			</view>
		</u-modal>

		<!-- 注销框 -->
		<u-modal
			:show="showLoginOut"
			title="注销"
			content="空间的一切内容都会被清除"
			@confirm="confirmLoginOut"
			showCancelButton
			@cancel="showLoginOut = false"
			confirmColor="#e89406"
		></u-modal>
		<!-- 注销框 -->
		<u-modal
			:show="showByeBye"
			title="退出"
			content="点击确认退出当前账号"
			@confirm="confirmByeBye"
			showCancelButton
			@cancel="showByeBye = false"
			confirmColor="#e89406"
		></u-modal>
	</view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { unBind, closeMyRoom, openMyRoom, updatePassword } from '@/api/settings/settings.js';
import { userInfo } from '@/api/user/user.js';
import { myRoom } from '@/api/loginSelect/loginSelect.js';
const App = getApp();
export default {
	computed: {
		...mapState(['playAudio'])
	},
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
			//展示注销框
			showLoginOut: false,
			showByeBye: false,
			type: 0
		};
	},
	onLoad() {
		this.myAudio = this.playAudio;
		this.getuserInfo();
		this.getMyRoom();
		//加载房间状态
		//加载密码
		//赋值用户可见
		this.showNowScrect = this.nowScrect;
	},
	methods: {
		//查看修改音频状态
		...mapMutations(['updatePlayAudio']),
		changeBgcState() {
			// //如果开启了 直接开启声音且 app下次开启也有声音
			// //如果关闭了 直接停止声音且 app下次开启也没声音
			uni.setStorageSync('playAudio', this.myAudio);
			this.updatePlayAudio();
			//先操作播放与否再存储本地
			App.changeAudioState(this.myAudio);
		},
		//修改是否允许他人查看
		async changeMyRoomLookState() {
			if (this.unlookMyRoom) {
				let res = await closeMyRoom();
				if (res.code !== 0) {
					uni.showToast({
						title: '闭关失败',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				uni.showToast({
					title: '闭关成功',
					icon: 'none',
					duration: 2000
				});
			} else {
				let res = await openMyRoom();
				if (res.code !== 0) {
					uni.showToast({
						title: '开放空间失败',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				uni.showToast({
					title: '开放空间成功',
					icon: 'none',
					duration: 2000
				});
			}
		},
		//更新密码
		async confirmChangeSecret() {
			if (this.oldSecret !== this.password) {
				uni.showToast({
					title: '原密码输入错误',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.newSecret !== '' && this.newSecret.length !== 6) {
				uni.showToast({
					title: '密码长度必须设置为6位',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let res = await updatePassword({ password: this.newSecret });
			if (res.code !== 0) {
				uni.showToast({
					title: '修改密码失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			uni.showToast({
				title: '修改密码成功',
				icon: 'none',
				duration: 2000
			});
			this.changeSecret = false;
			this.password = this.newSecret;
			this.newSecret = '';
			this.oldSecret = '';
		},
		//确认注销
		async confirmLoginOut() {
			this.showLoginOut = false;
			let res = await unBind();
			console.log('注销');
			console.log(res);
			if (res.code === 0) {
				uni.showToast({
					title: '注销成功',
					icon: 'none',
					duration: 2000
				});
				uni.removeStorageSync('token');
				uni.removeStorageSync('house');
				uni.removeStorageSync('uid');
				uni.removeStorageSync('ava');
				uni.reLaunch({
					url: '../../pages/loginSelect/loginSelect'
				});
			} else {
				uni.showToast({
					title: '注销失败',
					icon: 'none',
					duration: 2000
				});
			}
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
		//更换房间
		changeHouse() {
			uni.navigateTo({
				url: '../../pages/areaSelect/areaSelect?change=' + true
			});
		},
		//请求个人信息
		async getuserInfo() {
			let res = await userInfo();
			console.log('请求用户信息');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取用户信息失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.type = res.result.type;
		},
		async getMyRoom() {
			let res = await myRoom();
			console.log('请求空间详细数据');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取空间信息失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.unlookMyRoom = res.room.isClose === 1 ? true : false;
			this.password = res.room.password ? res.room.password : '';
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
	// /deep/.u-switch {
	// 	width: 120rpx !important;
	// 	height: 40rpx !important;
	// }
}
.admin {
	width: 100rpx;
	height: 100rpx;
	margin: 100rpx auto 0;
	// background-color: aquamarine;
}
</style>
