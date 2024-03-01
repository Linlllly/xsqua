<template>
	<view class="pages">
		<!-- banner -->
		<div v-if="list1.length" class="banner-box">
			<u-swiper
				:list="list1"
				keyName="img"
				height="220rpx"
				:interval="5000"
				:duration="400"
				:circular="true"
				@click="goOwnPageOrThirdParty()"
			></u-swiper>
		</div>
		<div class="clicks">
			<div class="history" @click="toBottleHistory">历史</div>
			<div class="message" @click="toBottleMessageList">消息提示</div>
		</div>
		<div class="pick" @click="judgeNumber">捡</div>
		<div class="lost" @click="toIssue">丢</div>
		<!-- 再捡一次 -->
		<u-modal
			:show="showPickAgain"
			title=" "
			content="确定花费5个星星再捡一次？"
			@confirm="pickBottle"
			showCancelButton
			@cancel="showPickAgain = false"
			confirmColor="#e89406"
		></u-modal>
	</view>
</template>

<script>
	import { pickBottle } from '@/api/currentBottle.js';
	import { banner } from '@/api/index.js';
	export default {
		data() {
			return {
				list1: [],
				showPickAgain:false,
				first:true
			};
		},
		onLoad() {
			this.getBanner();
		},
		methods:{
			async getBanner() {
				let res = await banner({ type: 3 });
				console.log('请求banner图');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					});
					return;
				}
				this.list1 = res.result;
			},
			judgeNumber(){
				if(first){
					this.pickBottle()
				}else{
					this.showPickAgain=true
				}
			},
		pickBottle(){
			pickBottle().then(res=>{
				//首次免费
				
				//获得瓶子id
				//调转到detail去
				uni.navigateTo({
					url:'../bottleDetail/bottleDetail?id='+res.id
				})
			})	
		},
		toIssue(){
			uni.navigateTo({
				url: '../../pages_userActivity/artcleIssue/artcleIssue?secret=2'
			});
		},
		toBottleHistory(){
			uni.navigateTo({
				url: '../../pages_userActivity/bottleHistory/bottleHistory'
			});
		},
		toBottleMessageList(){
			uni.navigateTo({
				url: '../../pages_userActivity/bottleMessageList/bottleMessageList'
			});
		}
		}
	}
</script>

<style lang="less" scoped>
.banner-box {
	background-color: #ffffff;
	/deep/ .u-swiper__wrapper__item__wrapper {
		padding: 10rpx 20rpx;
		background-color: #ffffff;
		align-content: center !important;
		.u-swiper__wrapper__item__wrapper__image {
			width: 682rpx;
			height: 176rpx !important;
			border-radius: 14rpx !important;
		}
	}
}
</style>
