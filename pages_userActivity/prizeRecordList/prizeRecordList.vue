<template>
	<view class="pages">
		<z-paging
			ref="paging"
			:default-page-size="12"
			loading-more-no-more-text="没有更多数据了"
			v-model="recordList"
			@query="getMyPrize"
			:empty-view-img-style="{ width: 0, height: 0 }"
		>
			<div
				class="content-list"
				v-for="(i, index) in recordList"
				:key="i.id"
			>
				<div class="content-info">
					恭喜您抽中了{{
						i.prizeInfo.type === 1
							? i.prizeInfo.name
							: i.prizeInfo.starTimes * i.starNum + '星星'
					}}
				</div>
				<div
					v-if="i.prizeInfo.type === 1 && i.isReceive === 0"
					class="content-btn2"
					@click="
						showGetMaterial = true
						prizeInfo = i.prizeInfo
					"
				>
					未填写
				</div>
				<div
					v-if="i.prizeInfo.type === 1 && i.isReceive === 1"
					class="content-btn"
				>
					已填写
				</div>
			</div>
		</z-paging>
		<!-- 填写收货信息弹窗 -->
		<u-modal
			title="填写收货信息"
			:show="showGetMaterial"
			@confirm="confirmGetMaterial"
			:showCancelButton="!prizeInfo.id"
			@cancel="showGetMaterial = false"
			confirmColor="#e89406"
		>
			<view class="slot-content">
				<u--form
					labelPosition="left"
					:model="materialForm"
					ref="materialForm"
					id="materialForm"
					:rules="rules"
					labelWidth="120rpx"
					:labelStyle="{ color: '#515151' }"
				>
					<u-form-item label="姓名" prop="name"
						><u-input
							border="none"
							placeholder="姓名"
							v-model="materialForm.name"
						></u-input
					></u-form-item>
					<u-form-item label="联系电话" prop="mobile"
						><u-input
							border="none"
							placeholder="联系电话"
							v-model="materialForm.mobile"
						></u-input
					></u-form-item>
					<u-form-item label="收货地址" prop="address">
						<u--textarea
							placeholder="收货地址"
							v-model="materialForm.address"
							:confirmType="null"
							style="white-space: pre-wrap"
							autoHeight
							border="none"
							:show-confirm-bar="false"
							maxlength="-1"
						></u--textarea>
					</u-form-item>
				</u--form>
			</view>
		</u-modal>
	</view>
</template>

<script>
import { prizeRecord, receive } from '@/api/game.js'

export default {
	data() {
		return {
			recordList: [],
			prizeInfo: '',
			showGetMaterial: false,
			materialForm: { name: '', mobile: '', address: '' },
			rules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				mobile: [
					{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur'
					},
					{
						pattern: /^1[3-9]\d{9}$/,
						message: '电话号码格式不正确',
						trigger: 'blur'
					}
				],
				address: [
					{
						required: true,
						message: '请输入收货地址',
						trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
		getMyPrize(page, limit) {
			prizeRecord({ page, limit })
				.then((res) => {
					console.log('我的中奖记录')
					console.log(res)
					if (res.code !== 0) {
						uni.$u.toast(res.msg)
						return
					}
					this.recordList = res.result.records || []
					this.$refs.paging.complete(res.result.records)
				})
				.catch((res) => {
					this.$refs.paging.complete(false)
				})
		},
		//实物
		confirmGetMaterial() {
			this.$refs.materialForm
				.validate()
				.then((res) => {
					receive({
						id: this.prizeInfo.id,
						...this.materialForm
					}).then((res) => {
						if (res.code !== 0) {
							uni.$u.toast(res.msg)
							return
						}
						uni.$u.toast('信息已提交，等待后台发货')
						this.showGetMaterial = false
						this.prizeInfo = null
						this.$refs.paging.reload()
					})
				})
				.catch((errors) => {
					uni.$u.toast('校验失败')
				})
		}
	}
}
</script>

<style lang="less" scoped>
.pages {
	background: #f8f8f8;
}
.chat-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 240rpx;
	z-index: 50;
	box-sizing: border-box;
	padding: 0 40rpx;
	background: url('../../static/area-select-bg.png') !important;
	.name-chat {
		font-size: 48rpx;
	}
	.name-title {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}
}
.content-list {
	width: 660rpx;
	height: 100rpx;
	background: #ffffff;
	border-radius: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	margin: 30rpx auto;
	.content-info {
		flex: 1;
		font-size: 36rpx;
	}
	.content-btn,
	.content-btn2 {
		width: 138rpx;
		height: 60rpx;
		background: #049dfc;
		box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
		border-radius: 10rpx;
		text-align: center;
		font-size: 36rpx;
		color: #ffffff;
		line-height: 1.8;
	}
	.content-btn2 {
		background: #ff2222;
	}
}
</style>
