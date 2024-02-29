<template>
		<view class="pages">
			<z-paging ref="paging" :default-page-size="12" loading-more-no-more-text="没有更多数据了" v-model="list" @query="getList"  :empty-view-img-style='{width:0,height:0}'  >
					<template #top>
						<u-tabs :list="list1" @change="tabChange"></u-tabs>
					</template>
					<view v-for="i in list" class="bottle-list" :key="i.id">
						<div class="picture">xx</div>
						<div class="contents">xx</div>
						<div class="time">xx</div>
						<div class="del">xxx</div>
					</view>
				</z-paging>
		</view>
</template>

<script>
import { lostHistry, pickHistry } from '@/api/index.js';
	export default {
		data() {
			return {
			
				                list1: [{
				                    name: '投放漂流瓶历史记录',
				                }, {
				                    name: '捡到漂流瓶历史记录',
				                }],list: [],type:0,
						
			};
		},
		methods:{
			getHistory(page, limit){
				if(this.type===0){
					// lostHistry({ page, limit })
				// 				.then(res => {
				// 					this.list = res.rows;
				// 					this.$refs.paging.complete(res.rows);
				// 				})
				// 				.catch(res => {
				// 					this.$refs.paging.complete(false);
				// 				});
				}else{
					// pickHistry({ page, limit,isComment:xxx })
					// 				.then(res => {
					// 					this.list = res.rows;
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
			}
		}
	}
</script>

<style lang="scss">

</style>
