<template>
	<div class="pages">
		<img src="../ua_static/change-x-secret.png" mode="" />
		<div class="old-mima">
			<u-input
				placeholderStyle="color: #868686"
				placeholder="请输入原密码"
				v-model="oldSecret"
				maxlength="6"
				inputAlign="center"
				fontSize="20"
				border="none"
			></u-input>
		</div>
		<div class="new-mima">
			<u-input
				placeholderStyle="color: #868686"
				placeholder="请输入新密码"
				v-model="newSecret"
				inputAlign="center"
				fontSize="20"
				border="none"
				maxlength="6"
			></u-input>
		</div>
		<div class="mimaaaa-button" @click="confirmChangeSecret"></div>
	</div>
</template>

<script>
import { myRoom } from '@/api/loginSelect.js'
import { updateXPassword, queryXFilePageList } from '@/api/mySecret.js'
export default {
	data() {
		return {
			password: '',
			oldSecret: '',
			newSecret: ''
		}
	},
	onLoad() {
		this.getMyRoom()
	},
	methods: {
		//请求空间信息
		async getMyRoom() {
			let res = await myRoom()
			console.log('请求空间详细数据')
			console.log(res)
			if (res.code !== 0) {
				uni.showToast({
					title: '获取空间信息失败',
					icon: 'none'
				})
				return
			}
			this.password = res.room.xpassword
		},
		//更新密码
		async confirmChangeSecret() {
			if (this.oldSecret !== this.password) {
				uni.showToast({
					title: '原密码输入错误',
					icon: 'none'
				})
				return
			}
			let res = await updateXPassword({ password: this.newSecret })
			if (res.code !== 0) {
				uni.showToast({
					title: '修改X档案密码失败',
					icon: 'none'
				})
				return
			}
			uni.showToast({
				title: '修改X档案密码成功',
				icon: 'none'
			})
			uni.navigateBack({})
		}
	}
}
</script>

<style lang="less" scoped>
.pages {
	background-color: #f39462;
	img {
		position: absolute;
		width: 100%;
		height: 1200rpx;
	}
	.old-mima,
	.new-mima {
		width: 360rpx;
		margin: 0 auto;
		/deep/.u-input {
			height: 100%;
		}
	}
	.old-mima {
		margin-top: 500rpx;
	}
	.new-mima {
		margin-top: 90rpx;
	}
	.mimaaaa-button {
		position: relative;
		width: 270rpx;
		height: 76rpx;
		margin: 0 auto;
		margin-top: 176rpx;
		// background-color: aqua;
	}
}
</style>
