<template>
	<div class="pages">
		<img class="bg-img" src="../../static/area-select-bg.png" alt="" />
		<!-- 注册来确定密码 -->
		<div v-if="type === '1'" class="password">
			<div class="password-content">
				<img class="password-img" src="https://www.zairongyifang.com:8080/filePath/app/20236/edd104f2a1.png" alt="" />
				<u-code-input v-model="zcPassword" :focus="true" :space="3" color="#fff" borderColor="#fff" size="26"></u-code-input>
				<div class="password-confirm" @click="confirmOrNullPassword(1)"></div>
				<div class="password-null" @click="confirmOrNullPassword(2)"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { bind, fchange } from '@/api/accessPossword/accessPossword.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
	data() {
		return {
			//注册初始密码
			zcPassword: '',
			//登录密码
			dlPassword: '',
			//1是注册2是访问
			type: '',
			//注册的cateId
			id: '',
			//用户验证身份密码
			usPassword: '',
			change: ''
		};
	},
	onLoad(option) {
		this.type = option.type;
		this.change = option.change;
		this.id = option.id ? option.id : '';
		this.usPassword = option.usPassword ? option.usPassword : '';
	},
	methods: {
		...mapMutations(['updateHouse']),

		//点击确认密码或者不设密码
		async confirmOrNullPassword(p) {
			//1设置密码 2 不设置密码
			this.zcPassword = p === 2 ? '' : this.zcPassword;
			if (p === 1 && this.zcPassword.toString().length !== 6) {
				uni.showToast({
					title: '密码长度必须设置为为六位数！',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.change === 'true') {
				//换绑
				let res = await fchange({ cateId: this.id, password: this.zcPassword });
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
				let res = await bind({ cateId: this.id, password: this.zcPassword });
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
		}
	}
};
</script>

<style lang="less" scoped>
.bg-img {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -5;
}
.password {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 20;
	.password-content {
		position: relative;
		width: 480rpx;
		height: 1050rpx;
		margin: 200rpx auto 0;
		box-sizing: border-box;
		padding: 30rpx;
		.password-img {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			right: 0;
		}
		.password-confirm {
			position: absolute;
			width: 216rpx;
			height: 66rpx;
			top: 620rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		.password-null {
			position: absolute;
			width: 216rpx;
			height: 66rpx;
			top: 196rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		/deep/.u-code-input {
			margin-top: 456rpx;
			margin-left: 42rpx;
		}
	}
}
</style>
