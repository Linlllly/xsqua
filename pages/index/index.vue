<template>
	<div class="pages">
		<div class="area-all">
			<image
				src="https://www.zairongyifang.com:8080/filePath/app/202311/compressed_05dbd14bbf.png"
				mode="widthFix"
				style="width: 100%;"
			></image>

			<div class="city-select" v-for="i in areaList" :key="i.cateId" @click="goCitySelect(i.cateId)"></div>
		</div>
		<div class="who-are-you">
			<image
				src="https://www.zairongyifang.com:8080/filePath/app/202311/compressed_dbf0b44ac5.png"
				mode="widthFix"
				style="width: 100%;"
				@click="toOtherUser()"
			></image>
		</div>

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
import { recommend, takeLook, banner, randomRoom } from '@/api/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { getComment } from '@/api/articleDes.js';
import { selectRoom } from '@/api/loginSelect.js';
import { list } from '@/api/areaSelect.js';
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
		toOtherUser() {
			randomRoom().then(res => {
				console.log('获取随机房间');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: '获取随机房间失败',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (res.room.uid === this.uid) {
					//自己
					uni.switchTab({
						url: '../../pages/user/user'
					});
				} else {
					uni.navigateTo({
						url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + res.room.cateId + '&ouid=' + res.room.uid
					});
				}
			});
		},

		goOwnPageOrThirdParty() {
			//keyname选显示url
			//wx.navigateTo 函数跳转到其他页面
			//wx.navigateToMiniProgram 函数跳转到第三方小程序
		}
	}
};
</script>

<style lang="less" scoped>
.area-all {
	position: relative;
	width: 710rpx;
	margin: 0 auto 10rpx;
	border-radius: 20rpx 20rpx 30rpx 30rpx;
	overflow: hidden;
	image {
		z-index: -2;
	}
	.city-select {
		position: absolute;
		width: 140rpx;
		height: 140rpx;
	}
	.city-select:nth-of-type(1) {
		//繁华都市
		top: 144rpx;
		left: 430rpx;
	}

	.city-select:nth-of-type(2) {
		//世外桃源
		bottom: 30rpx;
		right: 10rpx;
	}

	.city-select:nth-of-type(3) {
		//神秘之地
		bottom: 30rpx;
		left: 60rpx;
	}

	.city-select:nth-of-type(4) {
		//江湖之颠
		top: 290rpx;
		left: 326rpx;
	}

	.city-select:nth-of-type(5) {
		//星际家园
		top: 262rpx;
		left: 20rpx;
	}

	.city-select:nth-of-type(6) {
		//千年古镇
		top: 200rpx;
		left: 178rpx;
	}

	.city-select:nth-of-type(7) {
		//梦幻世界
		top: 46rpx;
		left: 24rpx;
	}
}
.who-are-you {
	width: 710rpx;
	margin: 0 auto 10rpx;
	border-radius: 20rpx 20rpx 30rpx 30rpx;
	overflow: hidden;
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
