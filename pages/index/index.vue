<template>
	<div class="pages">
		<!-- 搜索 -->
		<!-- <div class="title-search">
			<u-search
				placeholder="搜索用户: 房号/个性签名"
				v-model="searchText"
				:clearabled="true"
				actionText="搜索"
				@search="getSelectRoom"
				@custom="getSelectRoom"
				@tap.stop
			></u-search>
		</div> -->
		<!-- 	<div class="three">
			<img class="meeting" src="https://www.zairongyifang.com:8080/filePath/app/20237/e9bd0f5895.jpg" mode="" @click="toAreaSelect" />
			<img class="meeting" src="https://www.zairongyifang.com:8080/filePath/app/20237/861cd2052f.jpg" mode="" @click="toRankingList" />
		</div> -->
		<div class="area-all">
			<div class="city-select">
				<div v-for="i in areaList" :key="i.cateId" @click="goCitySelect(i.cateId)">{{ i }}</div>
			</div>
		</div>
		<div class="how-are-you" @click="toOtherUser({ uid, cateid })">你是谁</div>
		<!-- banner -->
		<div v-if="list1.length" class="banner-box">
			<u-swiper
				:list="list1"
				keyName="img"
				height="220rpx"
				:interval="3500"
				:duration="400"
				:circular="true"
				@click="goOwnPageOrThirdParty()"
			></u-swiper>
		</div>
		<!-- 排行榜 -->
		<RankingList ref="rankingListComponent"></RankingList>
	</div>
</template>

<script>
import { recommend, takeLook, banner } from '@/api/index/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { getComment } from '@/api/articleDes/articleDes.js';
import { selectRoom } from '@/api/loginSelect/loginSelect.js';
import { list } from '@/api/areaSelect/areaSelect.js';
import RankingList from '@/components/rankingList/rankingList.vue';
export default {
	computed: {
		...mapState(['uid', 'house'])
	},
	components: {
		RankingList
	},
	data() {
		return {
			//推荐参观
			// randomList: [],
			// limit: 20,
			//地区列表
			areaList: [],
			//条数
			limit: 5,
			lastPage: '',
			meetingList: [],
			linsMeeting: [],
			isloading: false, // 节流阀 是否正在请求数据
			//刷新
			refresh: true,
			//下次更新过滤的动态id
			fillerIdList: [],
			list1: [],
			//搜索数据
			searchText: '',
			popSearch: false,
			peopleList: []
		};
	},
	onLoad() {
		this.getBanner();
		this.getList();
		// this.$refs.rankingListComponent.getFlowerRank();
		// this.$refs.rankingListComponent.getSilverRank();
	},
	onShow() {
		this.refresh = true;
	},
	onReachBottom() {
		// 判断是否正在请求其它数据，如果是，则不发起额外的请求
		if (this.isloading) return;
		this.getTakeLook();
	},
	methods: {
		...mapMutations(['updateUid']),
		async getList() {
			let res = await list();
			console.log('1.一级居住地');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取区域列表失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.areaList = res.page.list;
		},
		goCitySelect(a) {
			uni.navigateTo({
				url: '../citySelect/citySelect' + '?cateId=' + a + '&change=' + false + '&lookHouse=' + true
			});
		},
		async getBanner() {
			let res = await banner({ type: 4 });
			console.log('请求banner图');
			if (res.code !== 0) {
				uni.showToast({
					title: '获取banner图失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			console.log(res);
			this.list1 = res.result;
		},
		toMeetingRoom() {
			uni.navigateTo({
				url: '../../pages_userActivity/meetingRoom/meetingRoom'
			});
		},
		toAreaSelect() {
			uni.navigateTo({
				url: '../areaSelect/areaSelect?lookHouse=' + true
			});
		},
		toRankingList() {
			uni.navigateTo({
				url: '../../pages_userActivity/rankingList/rankingList'
			});
		},
		goOwnPageOrThirdParty() {
			//keyname选显示url
			//wx.navigateTo 函数跳转到其他页面
			//wx.navigateToMiniProgram 函数跳转到第三方小程序
		},
		//搜索用户
		async getSelectRoom() {
			if (this.searchText === '') {
				return;
			}
			let res = await selectRoom({ key: this.searchText });
			console.log('搜索用户');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '搜索用户失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.popSearch = true;
			this.peopleList = res.room;
		}
	}
};
</script>

<style lang="less" scoped>
/deep/.u-input--circle {
	width: 90%;
	background: #d8d8d8 !important;
	flex: 0;
	margin: 20rpx 20rpx !important;
}
.title-search {
	display: flex;
	padding: 10rpx 40rpx;
}
.three {
	width: 750rpx;
	display: flex;
	justify-content: space-around;
	padding: 20rpx 0;
	background-color: #ffffff;
	.meeting {
		width: 346rpx;
		height: 346rpx;
		border-radius: 20rpx;
	}
}
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

button::after {
	border: none;
}
.ranking {
	position: fixed;
	bottom: 388rpx;
	right: 26rpx;
	z-index: 50;
}
.issue {
	position: fixed;
	width: 88rpx;
	height: 88rpx;
	bottom: 122rpx;
	right: 26rpx;
	z-index: 50;
	background: url(../../static/gotop.png) no-repeat;
	background-size: 88rpx 88rpx;
}
.reload {
	position: fixed;
	bottom: 250rpx;
	right: 26rpx;
	z-index: 50;
}
.title-search {
	display: flex;
	padding: 10rpx 40rpx;
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
	border-bottom: 2rpx solid #d9d9d9;
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
