<template>
	<div class="pages">
		<div v-if="type === 3">
			<!-- <div> -->
			<!-- 标题 -->
			<div class="x-title">
				<div class="t-left">X档案</div>
				<div class="t-right" @click="changeMima">
					<u-icon name="lock-fill" color="#fff" size="54"></u-icon>
					<div class="tishi">修改\n密码</div>
				</div>
			</div>
			<!-- 列表 -->
			<div v-if="myList.length !== 0" class="list-item" v-for="(i, index) in myList" :key="i.id">
				<!-- 头 -->
				<div class="list-title">
					<div class="dates">
						<text>{{ i.createTime }}</text>
						<img v-if="i.postTop" src="../../static/placed-top.png" alt="" />
					</div>
					<div>
						<text
							style="margin-right: 16rpx;"
							v-if="!i.img && i.media.length !== 0"
							class="get-top"
							@click.stop="getVedioOnPhone(i.media[0])"
						>
							保存视频
						</text>
						<text
							class="get-top"
							@click.stop="
								showRemoveArt = true;
								shanchu = i.id;
							"
						>
							删除
						</text>
					</div>
				</div>
				<!-- 图 -->
				<div class="looks">
					<!-- 标题 -->
					<div class="content-title">{{ i.content }}</div>
					<!-- 视频 -->
					<video v-if="!i.img && i.media.length !== 0" :src="i.media[0]" :controls="true" :show-center-play-btn="true"></video>
					<div class="five" v-if="i.img && i.media.length !== 0 && i.media.length > 4">
						<image
							class="fiveImg"
							v-for="(j, jndex) in i.media"
							:key="jndex"
							:src="j"
							mode="aspectFill"
							@click="previewImg(i.media, jndex)"
						></image>
					</div>
					<div class="four" v-if="i.img && i.media.length > 1 && i.media.length < 5">
						<image
							class="fourImg"
							v-for="(q, qndex) in i.media"
							:key="qndex"
							:src="q"
							mode="aspectFill"
							@click="previewImg(i.media, qndex)"
						></image>
					</div>
					<!-- 一张 -->
					<image
						class="singleImg"
						v-if="i.img && i.media.length === 1"
						:src="i.media[0]"
						mode="widthFix"
						@click="previewImg(i.media, 0)"
					></image>
				</div>
			</div>
			<u-loading-icon v-if="isloading" color="#767374" size="16"></u-loading-icon>
			<div v-if="!isloading && page >= lastPage" class="next">———— 没有更多数据了 ————</div>
			<!-- 留底 -->
			<div class="bottom"></div>
			<!-- 发布 -->
			<button class="issue" @click="toIssue"></button>
		</div>

		<!-- 首次进入 -->
		<div v-if="type === 1" class="bgs">
			<img src="../ua_static/first-x-secret.png" mode="" />
			<div class="first-input-box">
				<u--input
					placeholder="请输入密码"
					border="none"
					v-model="firstMima"
					inputAlign="center"
					fontSize="20"
					maxlength="6"
					placeholderStyle="color: #868686"
				></u--input>
			</div>
			<div class="first-mima-button" @click="confirmFirstMima"></div>
		</div>
		<!--  密码 -->
		<div v-if="type === 2" class="bgs2">
			<img src="../ua_static/x-secret.png" mode="" />
			<div class="first-input-box">
				<u--input
					placeholder="请输入密码"
					border="none"
					v-model="inputMima"
					inputAlign="center"
					fontSize="20"
					maxlength="6"
					placeholderStyle="color: #868686"
				></u--input>
			</div>
			<div class="mima-button" @click="confirmMima"></div>
		</div>
		<!-- 确认删除模态框 -->
		<u-modal
			:show="showRemoveArt"
			title="删除"
			content="本条记录将被清除"
			@confirm="confirmRemoveArt"
			showCancelButton
			@cancel="showRemoveArt = false"
			confirmColor="#e89406"
		></u-modal>
	</div>
</template>

<script>
// 引入组件
import { mapGetters, mapMutations, mapState } from 'vuex';
import { myRoom } from '@/api/loginSelect.js';
import { updateXPassword, queryXFilePageList } from '@/api/mySecret.js';
import { postTop, cancelPostTop } from '@/api/user.js';
import { deletePost } from '@/api/articleDes.js';
import { ip } from '@/api/api.js';

export default {
	data() {
		return {
			ws: '',
			//条数
			limit: 12,
			//页面
			page: 1,
			lastPage: '',
			//列表
			myList: [],
			isloading: false, // 节流阀 是否正在请求数据
			//查看类型 1首次 2密码 3查看
			type: '',
			//密码
			password: '',
			//输入的密码
			inputMima: '',
			//确认密码
			firstMima: '888888',
			showRemoveArt: false,
			shanchu: '',
			refresh: true
		};
	},
	onLoad() {
		this.getMyRoom();
	},
	onShow() {
		if (this.refresh) {
			this.page = 1;
			this.myList = [];
			this.getMyPageList();
		}
		this.refresh = true;
	},
	onReachBottom() {
		console.log(111);
		if (this.page >= this.lastPage) {
			return;
		}
		// 判断是否正在请求其它数据，如果是，则不发起额外的请求
		if (this.isloading) return;
		// 让页码值自增 +1
		this.page += 1;
		// 重新获取列表数据
		this.getMyPageList();
	},
	methods: {
		//删除动态
		async confirmRemoveArt() {
			let res = await deletePost({ id: this.shanchu });
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '删除档案失败',
					
				});
				return;
			}
			uni.showToast({
				title: '已删除',
				
			});
			this.showRemoveArt = false;
			this.page = 1;
			this.myList = [];
			this.getMyPageList();
		},
		//请求空间信息
		async getMyRoom() {
			let res = await myRoom();
			console.log('请求空间详细数据');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取空间信息失败',
					
				});
				return;
			}
			this.password = res.room.xpassword;
			if (this.password) {
				this.type = 2;
			} else {
				this.type = 1;
			}
		},
		//请求列表
		async getMyPageList() {
			// ** 打开节流阀
			this.isloading = true;
			let res = await queryXFilePageList({ page: this.page, limit: this.limit });
			console.log('请求动态列表');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取动态列表失败',
					
				});
				// ** 关闭节流阀
				this.isloading = false;
				return;
			}
			this.myList = [...this.myList, ...res.result.data];
			this.lastPage = res.result.last_page;
			for (var i = 0; i < this.myList.length; i++) {
				let lins = this.myList[i].media[0];
				let zhengze = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
				//true or false
				this.$set(this.myList[i], 'img', zhengze.test(lins));
			}
			// ** 关闭节流阀
			this.isloading = false;
		},
		async setTop(i) {
			let res = await postTop({ id: i.id });
			if (res.code !== 0) {
				uni.showToast({
					title: '设置置顶失败',
					
				});
				return;
			}
			this.page = 1;
			this.myList = [];
			this.getMyPageList();
		},
		async unSetTop(i) {
			let res = await cancelPostTop({ id: i.id });
			if (res.code !== 0) {
				uni.showToast({
					title: '取消置顶失败',
					
				});
				return;
			}
			this.page = 1;
			this.myList = [];
			this.getMyPageList();
		},
		toArticleDes(i) {
			uni.navigateTo({
				url: '../../pages_userActivity/articleDes/articleDes?i=' + i.id + '&secret=true'
			});
		},
		//去发布
		toIssue() {
			uni.navigateTo({
				url: '../artcleIssue/artcleIssue?secret=1'
			});
		},
		//确认密码
		confirmMima() {
			if (this.password === this.inputMima) {
				this.type = 3;
			} else {
				uni.showToast({
					title: '密码输入不正确',
					
				});
			}
		},
		//首次密码
		async confirmFirstMima() {
			if (this.firstMima.toString().length !== 6) {
				uni.showToast({
					title: '设置的密码长度必须为六位数！',
					
				});
				return;
			}
			let res = await updateXPassword({ password: this.firstMima });
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '设置X档案密码失败',
					
				});
				return;
			}
			this.type = 3;
		},
		changeMima() {
			uni.navigateTo({
				url: '../changeMima/changeMima'
			});
		},
		//单图预览
		previewImg(i, index) {
			this.refresh = false;
			uni.previewImage({
				current: i[index], // 当前显示图片的http链接
				urls: i // 需要预览的图片http链接列表
			});
		},
		//下载视频
		getVedioOnPhone(i) {
			console.log(i);
			wx.showLoading({
				title: '请稍后...'
			});
			wx.downloadFile({
				url: i,
				success: res => {
					// 下载成功, 保存到相册
					wx.saveVideoToPhotosAlbum({
						filePath: res.tempFilePath,
						success: res => {
							// console.info(res);
							// 关闭加载框
							wx.hideLoading();
							wx.showToast({
								title: '保存成功'
							});
						},
						fail: () => {
							// 关闭加载框
							wx.hideLoading();
							wx.showToast({
								title: '保存失败',
								
							});
						}
					});
				},
				fail: () => {
					// 下载失败(视频地址404不会执行到这里,这里是api调用失败)
					// 如果视频地址不是小程序"合法域名",也会执行到这里
					// 关闭加载框
					wx.hideLoading();
					wx.showModal({
						title: '保存失败',
						content: '您当前环境异常，请重启或删除小程序再次打开尝试。',
						showCancel: false
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.x-title {
	display: flex;
	width: 750rpx;
	height: 140rpx;
	background: #f39462;
	border-radius: 0px 0px 46rpx 46rpx;
	box-sizing: border-box;
	padding: 0 40rpx;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20rpx;
	.t-left {
		font-size: 60rpx;
		font-weight: 700;
		color: #ffffff;
	}
	.t-right {
		display: flex;
		.tishi {
			font-size: 36rpx;
			font-weight: 400;
			color: #ffffff;
			white-space: pre-line;
		}
	}
}
.list-item {
	width: 750rpx;
	box-sizing: border-box;
	padding: 10rpx 16rpx;
	.list-title {
		display: flex;
		width: 100%;
		height: 52rpx;
		justify-content: space-between;
		padding: 0 14rpx;
		box-sizing: border-box;
		.dates {
			display: flex;
			align-items: center;
			color: #767374;
			image {
				width: 36rpx;
				height: 36rpx;
				margin: 0 10rpx;
			}
		}
		.get-top {
			color: #f39462;
		}
	}
	.looks {
		overflow: hidden;
		margin-top: 6rpx;
		.five {
			display: flex;
			flex-wrap: wrap;
			.fiveImg {
				flex: 0 0 auto;
				height: 230rpx;
				width: 230rpx;
				margin-bottom: 10rpx;
				margin-right: 10rpx;
			}
		}
		.five image:nth-child(3n) {
			margin-right: 0rpx;
		}
		.four {
			display: flex;
			flex-wrap: wrap;
			.fourImg {
				flex: 0 0 auto;
				height: 352rpx;
				width: 352rpx;
				margin-bottom: 14rpx;
				margin-right: 14rpx;
			}
		}
		.four image:nth-child(2n) {
			margin-right: 0rpx;
		}
		.singleImg {
			width: 560rpx;
		}
		video {
			width: 100%;
			height: 460rpx;
		}
	}
	.content-title {
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 1.8;
		// margin: 0 14rpx;
		// overflow: hidden !important;
		// text-overflow: ellipsis !important; /* 超出部分省略号 */
		white-space: pre-line; //遇到回车换行
		word-break: break-word !important; /* break-all(允许在单词内换行。) */
		display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
		-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
		// -webkit-line-clamp: 2 !important; /* 显示的行数 */
	}
	.funcs {
		margin-top: 6rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		image {
			width: 38rpx;
			height: 38rpx;
			margin-right: 16rpx;
		}
		/deep/.u-icon--right {
			margin-right: 10rpx;
		}
	}
}

/*先去除掉button自带的边框*/
button::after {
	border: none;
}
.issue {
	position: fixed;
	width: 128rpx;
	height: 168rpx;
	top: 966rpx;
	right: 0;
	z-index: 50;
	background: url(../ua_static/stop.png) no-repeat;
	background-size: 128rpx 168rpx;
}
.message {
	position: fixed;
	width: 128rpx;
	height: 168rpx;
	top: 810rpx;
	right: 0;
	z-index: 50;
	background: url(../../static/message.png) no-repeat;
	background-size: 128rpx 168rpx;
	.mes-dot {
		width: 20rpx;
		height: 20rpx;
		margin-top: 28rpx;
		margin-left: 12rpx;
		border-radius: 50%;
	}
}
.bottom {
	height: 40rpx;
}
.next {
	margin-top: 10rpx;
	width: 100%;
	color: #a7a3a5;
	text-align: center;
}
.bgs {
	position: relative;
	width: 750rpx;
	background-color: transparent;
	img {
		position: absolute;
		width: 100%;
		height: 1200rpx;
	}
	.mimasuo {
		margin-top: 200rpx;
		display: block;
		width: 100%;
		height: 900rpx;
	}
	.first-input-box {
		position: absolute;
		width: 348rpx;
		height: 74rpx;
		top: 548rpx;
		left: 200rpx;
		/deep/.u-input {
			height: 100%;
		}
	}
	.first-mima-button {
		position: absolute;
		width: 286rpx;
		height: 82rpx;
		top: 722rpx;
		left: 234rpx;
		opacity: 0.5;
	}
}
.bgs2 {
	position: relative;
	width: 750rpx;
	background-color: transparent;
	img {
		position: absolute;
		width: 100%;
		height: 1200rpx;
	}
	.first-input-box {
		position: absolute;
		width: 348rpx;
		height: 96rpx;
		top: 548rpx;
		left: 200rpx;
		/deep/.u-input {
			height: 100%;
		}
	}
	.mima-button {
		position: absolute;
		width: 220rpx;
		height: 82rpx;
		top: 746rpx;
		left: 266rpx;
		opacity: 0.5;
	}
}
</style>
