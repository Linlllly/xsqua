<template>
		<view class="pages">
			<z-paging ref="paging" :default-page-size="12" loading-more-no-more-text="没有更多数据了" v-model="historyList" @query="getHistory"  :empty-view-img-style='{width:0,height:0}'  >
					<template #top>
						<u-tabs :list="list1" @change="tabChange"></u-tabs>
					</template>
					<view v-for="i in 5" class="bottle-list" :key="i" @click="goBottleDetail(i)">
						<u-icon name="photo" size="28"></u-icon>
						<u-icon name="play-circle" size="28"></u-icon>
						<div class="contents">xx  xxxxxxxxxxxxxxxxxxxxxxxxxx</div>
						<div class="time">2022.10.18</div>
						<u-icon name="trash" size="28" @tap.stop="delHistory(i)"></u-icon>
					</view>
				</z-paging>
				<u-modal
					:show="showAttention"
					title="删除这条漂流瓶记录吗"
					confirmColor="#e89406"
					showCancelButton="true"
					@cancel="showAttention = false"
					@confirm="changeAttentionState"
					width="620rpx"
				></u-modal>
		</view>
</template>

<script>
import { lostHistry, pickHistry,delLostBottle,delPickBottle } from '@/api/currentBottle.js';
	export default {
		data() {
			return {
			
				                list1: [{
				                    name: '投放漂流瓶历史记录',
				                }, {
				                    name: '捡到漂流瓶历史记录',
				                }],historyList: [],type:0,attention: null,
			showAttention: false
						
			};
		},
		methods:{
		async	getHistory(page, limit){
			
				if(this.type===0){
					// lostHistry({ page, limit })
				// 				.then(res => {
				// 					this.historyList = res.rows;
				// 					this.$refs.paging.complete(res.rows);
				// 				})
				// 				.catch(res => {
				// 					this.$refs.paging.complete(false);
				// 				});
				}else{
					// pickHistry({ page, limit,isComment:0 })
					// 				.then(res => {
					// 					this.historyList = res.rows;
					// 					this.$refs.paging.complete(res.rows);
					// 				})
					// 				.catch(res => {
					// 					this.$refs.paging.complete(false);
					// 				});
				}
				
			},
			tabChange({index}){
				this.type = index;
				this.$refs.paging.reload();
			},
			goBottleDetail(i){
				uni.navigateTo({
					url: '../bottleDetail/bottleDetail?i=' + i.id
				});
			},
			delHistory(i){
				this.showAttention = true;
				this.attention = i;
			},
			async changeAttentionState() {
				// let id=this.attention.id
					 // let res=this.type === 0 ?await delLostBottle({id}):await delPickBottle({id})
					  // let title = this.type === 0 ? '成功删除投放的瓶子' : '成功删除捡来的瓶子';
					
				// 			console.log('删除丢/捡瓶子');
				//  	console.log(res);
				// 	if (res.code !== 0) {
				// 		uni.showToast({
				// 			title: res.msg
				// 		});
				// 		return;
				// 	}
					
				// 	uni.showToast({
				// 		title: title
						
				// 	});
				// 	//找下标   item.historyList.uid === this.attention.blackUserInfo.uid记得替换
				// 	const index = this.historyList.findIndex(item => item.historyList.uid === this.attention.blackUserInfo.uid);
				// 	this.$delete(this.historyList, index);
					this.showAttention = false;

			}
		}
	}
</script>

<style lang="less" scoped>
.bottle-list {
  display: flex;
  align-items: center;
  font-size: 38rpx;

  .contents {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
