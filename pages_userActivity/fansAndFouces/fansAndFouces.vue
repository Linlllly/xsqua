<template>
	<view class="pages">
		<z-paging
			ref="paging"
			:default-page-size="12"
			loading-more-no-more-text="没有更多数据了"
			v-model="fansList"
			@query="getFriendList"
			:empty-view-img-style="{ width: 0, height: 0 }"
			:auto="false"
		>
			<template #top>
				<!-- 头像和提示 -->
				<div class="chat-title">
					<div class="title-left">
						<div class="title-left-top">
							<div
								v-for="(i, index) in 3"
								:key="index"
								:class="
									bigLook === i ? 'select-chat' : 'name-chat'
								"
								@click="changeLookList(i)"
							>
								<img
									class="list-relative-img"
									:src="
										i === 0
											? '../../static/fans.png'
											: i === 1
											? '../../static/foucs.png'
											: '../../static/double.png'
									"
									alt=""
								/>
								{{
									i === 0 ? '粉丝' : i === 1 ? '关注' : '互关'
								}}
							</div>
						</div>
					</div>
					<img class="name-title" :src="ava" alt="" />
				</div>
				<!-- 搜索 -->
				<div class="title-search">
					<u-search
						v-model="keyword"
						:showAction="true"
						actionText="搜索"
						:animation="false"
						@search="peopleSearch"
						@custom="peopleSearch"
					></u-search>
					<u-icon
						customStyle="marginLeft:20rpx"
						name="reload"
						color="#666"
						size="18"
						@click="reloadAll"
					></u-icon>
				</div>
			</template>
			<div
				class="content-list"
				v-for="(i, index) in fansList"
				:key="i.uid"
			>
				<img
					class="list-img"
					@click="toOtherUser(i)"
					:src="i.avatar"
					alt=""
				/>
				<div
					class="content-info"
					@click="
						changeName = true
						fid = i.uid
						findex = index
						remark = i.remark
					"
				>
					<div class="info-name">
						{{ i.remark ? i.remark : i.username }}
						<img
							v-if="i.remark"
							src="../ua_static/orangebeizhu.png"
							mode=""
						/>
						<img v-else src="../ua_static/greybeizhu.png" mode="" />
						<img
							class="cancel-attention"
							src="../ua_static/cancel-attention.png"
							mode=""
							@click.stop="cancelAttention(i)"
						/>
					</div>
					<div class="info-des">{{ i.intro ? i.intro : ' ' }}</div>
				</div>
			</div>
		</z-paging>
		<!-- 改动 -->
		<u-modal
			title="修改用户备注"
			:show="changeName"
			@confirm="getUserRemarkEdit"
			showCancelButton
			@cancel="
				changeName = false
				remark = ''
			"
			confirmColor="#e89406"
		>
			<view class="slot-content">
				<u--form
					labelPosition="left"
					ref="form1"
					labelWidth="100rpx"
					:labelStyle="{ color: '#767676' }"
				>
					<u-form-item label="备注"
						><u-input
							placeholder="请输入备注"
							v-model="remark"
						></u-input
					></u-form-item>
				</u--form>
			</view>
		</u-modal>
		<u-modal
			:show="showAttention"
			title="确定移除该粉丝吗"
			confirmColor="#e89406"
			showCancelButton="true"
			@cancel="showAttention = false"
			@confirm="changeAttentionState"
			width="620rpx"
		></u-modal>
	</view>
</template>

<script>
import {
	follow,
	userFans,
	mutualFollow,
	userRemarkEdit
} from '@/api/fansAndFouces.js'
import { delFollow } from '@/api/sheldList.js'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
	computed: {
		...mapState(['armor'])
	},
	data() {
		return {
			bigLook: 0,
			fansList: [],
			changeName: false,
			fid: null,
			findex: null,
			remark: '',
			realRemark: '',
			//搜索
			keyword: '',
			attention: null,
			showAttention: false
		}
	},
	onShow() {
		this.$refs.paging.reload()
	},
	methods: {
		changeLookList(i) {
			this.bigLook = i
			this.$refs.paging.reload()
		},
		peopleSearch() {
			this.$refs.paging.reload()
		},
		reloadAll() {
			this.keyword = ''
			this.$refs.paging.reload()
		},
		getFriendList(page, limit) {
			if (this.bigLook === 0) {
				userFans({ page, limit, keyword: this.keyword })
					.then((res) => {
						this.fansList = res.result.data || []
						this.$refs.paging.complete(res.result.data)
					})
					.catch((res) => {
						this.$refs.paging.complete(false)
					})
			} else if (this.bigLook === 1) {
				follow({ page, limit, keyword: this.keyword })
					.then((res) => {
						this.fansList = res.result.data || []
						this.$refs.paging.complete(res.result.data)
					})
					.catch((res) => {
						this.$refs.paging.complete(false)
					})
			} else {
				mutualFollow({ page, limit, keyword: this.keyword })
					.then((res) => {
						this.fansList = res.result.data || []
						this.$refs.paging.complete(res.result.data)
					})
					.catch((res) => {
						this.$refs.paging.complete(false)
					})
			}
		},
		cancelAttention(i) {
			if (this.armor) {
				this.showAttention = true
				this.attention = i
			} else {
				uni.showToast({
					title: '未激活，需兑换超级安全盔甲',
					icon: 'none'
				})
			}
		},
		changeAttentionState() {
			delFollow({ id: this.attention.uid }).then((res) => {
				console.log('请求移除粉丝')
				console.log(res)
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					return
				}
				uni.showToast({
					title: '移除粉丝成功',
					icon: 'none'
				})

				const index = this.fansList.findIndex(
					(item) => item.uid === this.attention.uid
				)
				this.$delete(this.fansList, index)
				this.showAttention = false
			})
		},
		toOtherUser(i) {
			uni.navigateTo({
				url:
					'../../pages_userActivity/otherUser/otherUser?ocateId=' +
					i.cateId +
					'&ouid=' +
					i.uid
			})
		},
		async getUserRemarkEdit() {
			let res = await userRemarkEdit({
				fid: this.fid,
				remark: this.remark
			})
			console.log('请求修改备注')
			console.log(res)
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
				return
			}
			uni.showToast({
				title: '修改备注成功',
				icon: 'none'
			})
			let list
			this.$set(this.fansList[this.findex], 'remark', this.remark)
			this.remark = ''
			this.changeName = false
		}
	}
}
</script>

<style lang="less" scoped>
.bg-img {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: -10;
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
	.title-left {
		display: flex;
		flex-direction: column;
		.title-left-top {
			display: flex;
			align-items: center;
		}
		/deep/.u-input {
			margin-top: 10rpx;
			width: 428rpx;
		}
	}

	.name-chat {
		font-size: 40rpx;
		.list-relative-img {
			width: 48rpx;
			height: 48rpx;
			vertical-align: middle;
		}
	}
	.select-chat {
		font-size: 54rpx;
		.list-relative-img {
			width: 62rpx;
			height: 62rpx;
			vertical-align: middle;
		}
	}
	.name-title {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}
}
.title-search {
	display: flex;
	padding: 10rpx 40rpx;
}
.content-list {
	width: 100%;
	display: flex;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	border-bottom: 2rpx solid #ccc;
	.list-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.content-info {
		flex: 1;
		.info-name {
			display: flex;
			font-size: 40rpx;
			font-weight: 500;
			color: #000000;
			line-height: 1.5;
			align-items: center;
			img {
				width: 120rpx;
				height: 30rpx;
				margin: 0 20rpx;
			}
			.cancel-attention {
				width: 44rpx;
				height: 38rpx;
				margin: 0;
			}
		}
		.info-des {
			flex: 1;
			font-size: 32rpx;
			font-weight: 400;
			color: #000000;
			line-height: 1.5;
			overflow: hidden !important;
			text-overflow: ellipsis !important; /* 超出部分省略号 */
			word-break: break-all !important; /* break-all(允许在单词内换行。) */
			display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
			-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
			-webkit-line-clamp: 1 !important; /* 显示的行数 */
		}
	}
}
.next {
	margin: 30rpx auto;
	width: 100%;
	color: #9a9698;
	text-align: center;
}
</style>
