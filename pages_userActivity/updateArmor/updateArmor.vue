<template>
	<view class="pages">
		<img class="bg-img" src="../../static/area-select-bg.png" alt="" />
		<!-- 设置房间为不可查看 -->
		<div class="content-list">
			<div class="info-name">设置闭关修炼(动态仅自己可见)</div>
			<u-switch v-model="unlookMyRoom" @change="changeMyRoomLookState" activeColor="#e89406"></u-switch>
		</div>
		<!-- 是否允许关注 -->
		<div class="content-list">
			<div class="info-name">是否允许他人关注</div>
			<u-switch
				v-model="othersAttention"
				:activeValue="1"
				:inactiveValue="0"
				@change="changeOthersAttentionState"
				activeColor="#e89406"
			></u-switch>
		</div>
		<!-- 修改私聊状态 -->
		<div class="content-list" @click="showChat = true">
			<div class="info-name">修改私聊状态</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<!-- 更换房间 -->
		<div class="content-list" @click="changeHouse">
			<div class="info-name">更换房间</div>
			<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
		</div>
		<!-- 盔甲剩余时间 -->
		<div class="content-list" @click="changeHouse">
			<div class="info-name">到期时间：{{ armourTime }}</div>
		</div>
		<!-- 修改状态 -->
		<u-modal
			:show="showChat"
			title="修改私聊状态"
			confirmColor="#e89406"
			showCancelButton="true"
			@cancel="showChat = false"
			@confirm="changeChatState"
			width="620rpx"
		>
			<view class="slot-content">
				<u-radio-group v-model="chat" placement="column" activeColor="#e89406" size="20">
					<u-radio :name="1" shape="circle" label="允许私聊"></u-radio>
					<u-radio :name="2" shape="circle" label="允许他人发一句话,回复后开启后续聊天"></u-radio>
					<u-radio :name="3" shape="circle" label="不允许私聊"></u-radio>
				</u-radio-group>
			</view>
		</u-modal>
	</view>
</template>

<script>
import { getArmourConfig, updateArmourConfig, closeMyRoom, openMyRoom } from '@/api/updateArmor.js';
import { myRoom } from '@/api/loginSelect.js';

const App = getApp();
export default {
	computed: {},
	data() {
		return {
			//房间是否不可见
			unlookMyRoom: false,
			//是否允许关注
			othersAttention: null,
			//修改私聊状态
			showChat: false,
			chat: null,
			armourTime: null
		};
	},
	onLoad() {
		this.getMyRoom();
		this.getArmourConfig();
	},
	methods: {
		//获取配置
		getArmourConfig() {
			getArmourConfig().then(res => {
				console.log('获取当前盔甲状态');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					});
					return;
				}
				this.othersAttention = res.result.followMe === 0 ? 0 : 1;
				this.chat = res.result.chat === null ? 1 : res.result.chat;
				this.armourTime = res.result.armourTime;
			});
		},
		//修改是否允许他人查看
		async changeMyRoomLookState() {
			if (this.unlookMyRoom) {
				let res = await closeMyRoom();
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					});
					return;
				}
				uni.showToast({
					title: '闭关成功',
					
				});
			} else {
				let res = await openMyRoom();
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					});
					return;
				}
				uni.showToast({
					title: '开放空间成功',
					icon:'none'
				});
			}
		},
		changeOthersAttentionState() {
			updateArmourConfig({ followMe: this.othersAttention }).then(res => {
				console.log('修改允许他人关注');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					});
					return;
				}
				if (this.othersAttention === 1) {
					uni.showToast({
						title: '允许他人关注',
						icon:'none'
					});
				} else {
					uni.showToast({
						title: '拒绝他人关注',
						icon:'none'
					});
				}
			});
		},
		changeChatState() {
			updateArmourConfig({ chat: this.chat }).then(res => {
				console.log('修改私聊状态');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({ title: res.msg,icon:'none'  });
					return;
				}
				uni.showToast({
					title: '修改私聊状态成功',
					icon:'none'
				});
				this.showChat = false;
			});
		},
		//更换房间
		changeHouse() {
			uni.navigateTo({
				url: '../../pages/areaSelect/areaSelect?change=' + true
			});
		},
		async getMyRoom() {
			let res = await myRoom();
			console.log('请求空间详细数据');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon:'none'
				});
				return;
			}
			this.unlookMyRoom = res.room.isClose === 1 ? true : false;
			this.password = res.room.password;
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
/deep/.u-radio {
	padding: 10rpx 0;
}
</style>
