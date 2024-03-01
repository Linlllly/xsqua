<template>
	<!-- this.userRemark=???  获取备注 -->
	<view class="pages">
		<!-- 头像 -->
		<div class="stick">
			<img class="other-title" :src="oava" alt="" @click="toOtherUser()" />
			<div
				class="other-info"
				@click="
					changeName = true;
					fid = ouid;
				"
			>
				<div class="info-name">
					<div class="box">{{ realRemark ? realRemark : ousername }}</div>
					<img v-if="realRemark" src="../ua_static/orangebeizhu.png" mode="" />
					<img v-else src="../ua_static/greybeizhu.png" mode="" />
				</div>
				<div class="info-des">{{ ointro ? ointro : ' ' }}</div>
			</div>
			<div class="other-relation"><img src="../ua_static/lahei.png" alt="" @click="shieldUser" /></div>
			<div class="other-relation">
				<u-icon
					size="30"
					name="trash"
					color="#d61515"
					@click="
						showRemove = true;
						cleanAll = true;
					"
				></u-icon>
			</div>
		</div>
		<view class="content" @touchstart="hideDrawer" :style="{ height: contentHeight + 'px' }" @click="showPopup = false">
			<scroll-view
				class="msg-list"
				:class="popupLayerClass"
				:scroll-y="true"
				:scroll-with-animation="scrollAnimation"
				:scroll-top="scrollTop"
				:scroll-into-view="scrollToView"
				@scrolltoupper="loadHistory"
				upper-threshold="50"
				:style="{ top: -inputBotton - inputLines + 'px' }"
			>
				<!-- 加载历史数据waitingUI -->
				<view v-if="isHistoryLoading" class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row, index) in chatWithList" :key="index" :id="'msg' + row.id">
					<!-- 用户消息 -->
					<block v-if="row.type !== 'err_msg'">
						<!-- 111111自己发出的消息 -->
						<view v-if="row.fromUid == uid" class="my" @longpress="recordOkBtn(row)">
							<!-- 	<div class="ok-btn" v-if="row.showOkBtn"><u-icon name="checkmark-circle-fill" color="#e89406" size="28"></u-icon></div> -->
							<!-- 左-消息 -->
							<view class="left">
								<!-- 时间 -->
								<span class="timer">{{ row.createTime }}</span>
								<!-- 文字消息 -->
								<view
									v-if="row.type === 'chat'"
									class="bubble"
									:id="'bubble' + row.id"
									style="position: relative;"
									@longpress="setControls(row, $event)"
								>
									<text>{{ row.text }}</text>
								</view>

								<!-- 图片消息 -->
								<view
									v-if="row.type === 'chat_image'"
									class="bubble img"
									@tap="showPic([row.text])"
									:id="'bubble' + row.id"
									@longpress="setControls(row, $event)"
								>
									<image style="margin:0 0 0 12rpx" :src="row.text" mode="aspectFit"></image>
								</view>
								<!-- 视频消息 -->
								<view v-if="row.type === 'chat_video'" class="bubble veo" :id="'bubble' + row.id" style="position: relative;">
									<video
										:src="row.text"
										:controls="true"
										:show-center-play-btn="true"
										@longpress="showDownloadVideo(row)"
										@fullscreenchange="onFullscreenChange"
									></video>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right"><image :src="ava"></image></view>
						</view>
						<!-- 222222别人发出的消息 -->
						<view v-else class="other" @longpress="recordOkBtn(row)">
							<!-- 		<div class="ok-btn" v-if="row.showOkBtn"><u-icon name="checkmark-circle-fill" color="#e89406" size="28"></u-icon></div> -->
							<!-- 左-头像 -->
							<view class="left"><image :src="oava"></image></view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<!-- 时间 -->
								<span class="timer">{{ row.createTime }}</span>
								<!-- 文字消息 -->
								<view
									v-if="row.type === 'chat'"
									class="bubble"
									:id="'bubble' + row.id"
									style="position: relative;"
									@longpress="setControls(row, $event)"
								>
									<text>{{ row.text }}</text>
								</view>
								<!-- 图片消息 -->
								<view
									v-if="row.type === 'chat_image'"
									class="bubble img"
									@tap="showPic([row.text])"
									:id="'bubble' + row.id"
									@longpress="setControls(row, $event)"
								>
									<image :src="row.text" mode="aspectFit"></image>
								</view>
								<!-- 视频消息 -->
								<view v-if="row.type === 'chat_video'" class="bubble veo" :id="'bubble' + row.id">
									<video
										:src="row.text"
										:controls="true"
										:show-center-play-btn="true"
										@longpress="showDownloadVideo(row)"
										@fullscreenchange="onFullscreenChange"
									></video>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>

		<!-- 底部输入栏 -->
		<view class="input-box cu-bar tabbar" :class="popupLayerClass" @touchmove.stop.prevent="discard" :style="{ bottom: messBotton + 'px' }">
			<view class="textbox">
				<view class="text-mode" :class="isVoice ? 'hidden' : ''">
					<view class="box">
						<textarea
							auto-height="true"
							v-model="textMsg"
							@focus="inputHight"
							:adjust-position="false"
							@blur="inputLow"
							maxlength="300"
							:show-confirm-bar="false"
							@linechange="inputLine"
						/>
					</view>
				</view>
			</view>
			<view class="more" @tap="showMore"><view class="icon add"></view></view>
			<view class="send" :class="isVoice ? 'hidden' : ''" @tap="sendText"><view class="btn">发送</view></view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{ hidden: hideMore }">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="chooseVideo"><u-icon name="../../../../static/video.png" color="#333" size="38"></u-icon></view>
				</view>
			</view>
		</view>
		<!-- 单删全删 -->
		<u-modal :show="showRemove" title="删除" @confirm="confirmRemove" showCancelButton @cancel="showRemove = false" confirmColor="#e89406">
			<view class="slot-content">
				<u-radio-group v-model="cleanType" placement="column" activeColor="#e89406" size="20">
					<u-radio :name="0" shape="circle" :label="cleanAll === true ? '删除本手机上所有聊天记录' : '删除本手机上这条聊天记录'"></u-radio>
					<u-radio
						:name="1"
						shape="circle"
						:label="cleanAll === true ? '一键删除双方手机上所有聊天记录' : '一键删除双方手机上这条聊天记录'"
					></u-radio>
				</u-radio-group>
			</view>
		</u-modal>
		<!-- 改动 -->
		<u-modal
			title="修改用户备注"
			:show="changeName"
			@confirm="getUserRemarkEdit"
			showCancelButton
			@cancel="
				changeName = false;
				remark = realRemark;
			"
			confirmColor="#e89406"
		>
			<view class="slot-content">
				<u--form labelPosition="left" ref="form1" labelWidth="100rpx" :labelStyle="{ color: '#767676' }">
					<u-form-item label="备注"><u-input placeholder="请输入备注" v-model="remark"></u-input></u-form-item>
				</u--form>
			</view>
		</u-modal>
		<u-modal
			:show="showshield"
			title="确定拉黑该用户吗"
			confirmColor="#e89406"
			showCancelButton="true"
			@cancel="showshield = false"
			@confirm="changeShildState"
			width="620rpx"
		></u-modal>
		<!-- 下载按钮 -->
		<u-action-sheet
			style="z-index: 9999;"
			:actions="[{ name: '下载视频' }, { name: '删除消息' }]"
			:title="title"
			:show="isFullLongPress"
			:closeOnClickOverlay="true"
			cancelText="取消"
			@close="isFullLongPress = false"
			@select="selectClick"
		></u-action-sheet>
		<!-- 弹出层 -->
		<div v-if="showPopup" class="popup" :style="{ top: popupTop + 'px', left: popupLeft + 'px' }">
			<text
				@click="
					showRemove = true;
					cleanAll = false;
				"
			>
				删除
			</text>
			<text v-if="popupRow.type === 'chat'" style="margin: 0 10rpx;">|</text>
			<text v-if="popupRow.type === 'chat'" @click="copyMessage">复制</text>
		</div>
	</view>
</template>
<script>
import { history, deleteHistory, getRemark } from '@/api/chatWith.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { getUserInfoById } from '@/api/otherUser.js';
import { userRemarkEdit } from '@/api/fansAndFouces.js';
import { add } from '@/api/sheldList.js';
import { ip } from '@/api/api.js';
const app = getApp();

export default {
	computed: {
		...mapState(['uid', 'ava', 'myWs', 'armor'])
	},
	data() {
		return {
			contentHeight: 0,
			inputYbHeight: 0,
			inputBotton: 0,
			messBotton: 0,
			inputLines: 0,
			//删除
			showRemove: false,
			cleanType: 0,
			cleanAll: false,
			//他人信息
			ouid: '',
			oava: '',
			ousername: '',
			ointro: '',
			orelative: '',
			orelations: '',
			ocateId: '',
			ws: '',
			//文字消息
			textMsg: '',
			//是否正在加载历史
			isHistoryLoading: false,
			//是否显示滚动时加载动画
			scrollAnimation: false,
			//距离顶部的距离
			scrollTop: 0,
			//某次信息的位置
			scrollToView: '',
			// 消息列表（接口返回的历史消息 + 发送的消息 + 接收的消息）
			chatWithList: [],
			//语音参数
			isVoice: false,
			// 抽屉参数
			popupLayerClass: '',
			// more参数
			hideMore: true,
			//表情定义
			hideEmoji: true,
			recording: false,
			willStop: false,
			initPoint: {
				identifier: 0,
				Y: 0
			},
			recordTimer: null,
			recordLength: 0,
			//
			page: 1,
			limit: 15,
			lastPage: 2, //先放一个比当前页大的  确保第一次可以成功请求
			changeTop: 0,
			//是不是在输入
			inputTop: false,
			go: true,
			//
			changeName: false,
			fid: null,
			remark: '',
			realRemark: '',
			userRemark: false,
			//是否全屏
			isFull: false,
			//是否全屏长按
			isFullLongPress: false,
			//下载链接
			downloadUrl: null,
			close: false,
			//拉黑
			showshield: false,
			//复制删除
			showPopup: false,
			popupPosition: 'top',
			popupTop: 0,
			popupLeft: 0,
			popupRow: '',
			changeSendId: false
		};
	},

	onLoad(option) {
		this.chatWithList = [];
		this.ouid = option.ouid;
		this.ocateId = option.ocateId;
		this.getGetUserInfoById();
		this.scrollTop = 9999999;
		this.getHistory();
		console.log('---------');
		console.log(this.ouid);
		console.log(this.uid);
	},
	onShow() {
		console.log('chatWith onShow');
	},
	watch: {
		myWs: {
			immediate: true,
			handler(news, olds) {
				console.log('chatWith开启侦听');
				this.close = false;
				this.ws = app.globalData.ws;
				this.ws.onMessage(res => {
					if (!this.close) {
						console.log(res);
						if (res.data === 'active') {
							return;
						}
						let data = JSON.parse(res.data);

						if (data.type === 'err_msg' && data.toUid === this.uid && data.fromUid === this.uid) {
							this.$delete(this.chatWithList, this.chatWithList.length - 1);
							uni.showToast({
								title: data.text,
					icon:'none'
							});
							// this.$set(this.chatWithList[this.chatWithList.length - 1], 'id', '0_' + Date.now().toString());
							return;
						}

						if (
							!(data.type === 'chat' || data.type === 'chat_image' || data.type === 'chat_video') ||
							(data.toUid !== this.uid || data.fromUid !== parseInt(this.ouid))
						) {
							console.log('不是当前对话');
							return;
						}
						this.chatWithList.push(data);
						//回到底部
						this.$nextTick(() => {
							this.scrollToView = 'msg' + data.id;
							if (this.inputTop) {
								this.changeTop = Math.random() * 100;
							}
						});
					}
				});
			}
		},
		changeTop: {
			handler(newval, oldval) {
				//获取现有消息高度是否没超过输入框
				let allMessHeight = 0;
				let allRes = [];
				//没消息 不上弹
				if (this.chatWithList.length === 0) {
					this.inputBotton = 0;
				} else {
					let queryss = uni.createSelectorQuery().in(this);
					queryss.selectAll('.row').boundingClientRect();
					queryss.exec(res => {
						res[0].forEach((v, i) => {
							allMessHeight += v.height;
							if (Math.ceil(allMessHeight) >= this.contentHeight) {
								//结束循环
								return;
							}
						});
						//进入判断要不要回弹
						if (Math.ceil(allMessHeight) >= this.contentHeight) {
							//高度超过可视区正常上弹
							this.inputBotton = this.messBotton;
						} else if (this.contentHeight - this.messBotton >= Math.ceil(allMessHeight)) {
							//没超过可视区-键盘和输入框高 不上弹
							this.inputBotton = 0;
						} else {
							//超过键盘和输入框高 弹一部分
							this.inputBotton = this.messBotton - (Math.floor(this.contentHeight) - Math.ceil(allMessHeight)) + 2;
						}
					});
				}
			}
		}
	},
	onUnload() {
		this.getHistory();
		this.close = true;
	},
	methods: {
		shieldUser(i) {
			if (this.armor) {
				this.showshield = true;
			} else {
				uni.showToast({
					title: '只有盔甲用户可以拉黑用户',
					icon:'none'
				});
			}
		},
		changeShildState() {
			add({ uid: this.ouid }).then(res => {
				console.log('请求加入黑名单');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					});
					return;
				}
				uni.showToast({
					title: '加入黑名单成功',
					icon:'none'
				});
				setTimeout(res => {
					uni.navigateBack();
				}, 1500);
			});
		},
		//请求个人信息
		async getGetUserInfoById() {
			let res = await getUserInfoById({ uid: this.ouid });
			console.log('获取他人用户信息');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					
				});
				return;
			}
			this.oava = res.result.avatar;
			this.ousername = res.result.username;
			this.ointro = res.result.intro;
			this.orelations = res.result.relations;
			this.remark = res.result.remark;
			this.realRemark = res.result.remark;
		},
		//触发滑动到顶部(加载历史信息记录)
		loadHistory(e) {
			//参数作为进入请求标识，防止重复请求
			if (this.isHistoryLoading) {
				return;
			}
			//如果已经在最后一页就不请求
			this.isHistoryLoading = true;
			//请求历史
			setTimeout(() => {
				this.scrollAnimation = false; //关闭滑动动画
				if (this.page > this.lastPage) {
					this.isHistoryLoading = false;
					uni.showToast({
						title: '已加载所有数据',
						icon:'none'
					});
					return;
				}
				this.page += 1;
				this.getHistory();
			}, 1000);
		},
		// 加载初始页面消息
		async getHistory() {
			// this.isHistoryLoading = false;
			//相等的时候还可以再请求
			if (this.page > this.lastPage) {
				this.isHistoryLoading = false;
				uni.showToast({
					title: '已加载所有数据',
					icon:'none'
				});
				this.$nextTick(function() {
					this.scrollAnimation = true;
				});
				return;
			}
			let res = await history({ page: this.page, limit: this.limit, toUid: this.ouid });
			console.log('请求历史');
			console.log(res);
			this.isHistoryLoading = false;
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon:'none'
				});
				return;
			}
			if (this.chatWithList.length !== 0) {
				let Viewid = this.chatWithList[0].id; //记住第一个信息ID
				this.scrollToView = 'msg' + Viewid;
			}
			this.chatWithList = [...res.result.data.reverse(), ...this.chatWithList];
			this.lastPage = res.result.last_page;
			// 滚动到底部
			this.$nextTick(function() {
				//进入页面滚动到底部
				this.scrollTop = 9999;
				this.$nextTick(function() {
					this.scrollAnimation = true;
				});
			});
		},
		//获取焦点，如果不是选表情ing,则关闭抽屉
		textareaFocus() {
			if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
				this.hideDrawer();
			}
		},
		// 发送文字消息
		sendText() {
			let _that = this;
			this.hideDrawer(); //隐藏抽屉
			if (!this.textMsg) {
				return;
			}

			if (!this.go) {
				uni.showToast({
					title: '网络异常，发送失败！',
					icon:'none'
				});
				return;
			}
			let caid = this.uid.toString() + new Date().getTime() + Math.floor(Math.random() * 10).toString();
			var content = { fromUid: this.uid, toUid: this.ouid - 0, text: this.textMsg, type: 'chat', id: caid };
			this.ws.send({
				data: JSON.stringify(content),
				success: () => {
					console.log('ws消息发送成功');
					let nowDate = this.getNowFormatDate();
					let id = 'msg' + caid;
					this.chatWithList.push({
						...content,
						createTime: nowDate,
						id: caid
					});
					//回到底部
					this.$nextTick(() => {
						this.scrollToView = id;
					});
					//
					this.textMsg = ''; //清空输入框
					this.inputLines = 0;
					this.inputTop = false;
				}
			});
		},
		// 隐藏抽屉
		hideDrawer() {
			this.popupLayerClass = '';
		},
		//获取当前时间
		getNowFormatDate() {
			var dat = new Date();
			var year = dat.getFullYear();
			var mon = dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1;
			var data = dat.getDate() < 10 ? '0' + dat.getDate() : dat.getDate();
			var hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours();
			var min = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes();
			var seon = dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds();

			var newDate = year + '-' + mon + '-' + data + ' ' + hour + ':' + min + ':' + seon;
			return newDate;
		},
		//更多功能(点击+弹出)
		showMore() {
			this.isVoice = false;
			this.hideEmoji = true;
			if (this.hideMore) {
				this.hideMore = false;
				this.openDrawer();
			} else {
				this.hideDrawer();
			}
		},
		// 打开抽屉
		openDrawer() {
			this.popupLayerClass = 'showLayer';
		},
		// 隐藏抽屉
		hideDrawer() {
			this.popupLayerClass = '';
			setTimeout(() => {
				this.hideMore = true;
				this.hideEmoji = true;
			}, 150);
		},
		// 上传图片
		chooseImage() {
			uni.chooseMedia({
				count: 9,
				mediaType: ['image'],
				sourceType: ['album', 'camera'],
				success: r => {
					//展示loading
					uni.showLoading({
						title: '图片上传中',
						mask: true
					});
					let linShi2 = r.tempFiles;
					linShi2.forEach(i => {
						uni.uploadFile({
							url: ip + '/app/common/upload',
							filePath: i.tempFilePath,
							name: 'file',
							header: {
								token: uni.getStorageSync('token')
							},
							success: uploadFileRes => {
								let paths = JSON.parse(uploadFileRes.data);
								this.sendImage(paths.result[0].url);
							},
							fail() {
								uni.hideLoading();
								uni.showToast({
									title: res.msg,
									icon:'none'
								});
							}
						});
					});
				}
			});
		},
		//上传视频
		chooseVideo() {
			uni.chooseMedia({
				maxDuration: 60,
				count: 1,
				sourceType: ['album', 'camera'],
				compressed: true,
				mediaType: ['video'],
				success: r => {
					//展示loading
					uni.showLoading({
						title: '视频上传中',
						mask: true
					});
					let linShi2 = r.tempFiles[0].tempFilePath;
					uni.uploadFile({
						url: ip + '/app/common/upload',
						filePath: linShi2,
						name: 'file',
						header: {
							token: uni.getStorageSync('token')
						},
						success: uploadFileRes => {
							let paths = JSON.parse(uploadFileRes.data);
							this.sendVideo(paths.result[0].url);
						},
						fail() {
							uni.hideLoading();
							uni.showToast({
								title: res.msg,
								icon:'none'
							});
						}
					});
				}
			});
		},
		//发送图片(9张最多)
		sendImage(paths) {
			let _that = this;
			this.hideDrawer(); //隐藏抽屉
			if (!this.go) {
				uni.showToast({
					title: '网络异常，发送失败！',
					icon:'none'
				});
				return;
			}
			let caid = this.uid.toString() + new Date().getTime() + Math.floor(Math.random() * 10).toString();
			var content = { fromUid: this.uid, toUid: this.ouid - 0, text: paths, type: 'chat_image', id: caid };
			this.ws.send({
				data: JSON.stringify(content),
				success: () => {
					console.log('ws图片发送成功');
					uni.hideLoading();
					let nowDate = this.getNowFormatDate();
					let id = 'msg' + caid;
					this.chatWithList.push({
						...content,
						createTime: nowDate,
						id: caid
					});
					// 回到底部;
					this.$nextTick(() => {
						this.scrollToView = id;
					});
					this.textMsg = '';
					this.inputLines = 0;
					this.inputTop = false;
				}
			});
		},
		//发送视频
		sendVideo(paths) {
			let _that = this;
			this.hideDrawer(); //隐藏抽屉
			if (!this.go) {
				uni.showToast({
					title: '网络异常，发送失败！',
					icon:'none'
				});
				return;
			}
			let caid = this.uid.toString() + new Date().getTime() + Math.floor(Math.random() * 10).toString();
			var content = { fromUid: this.uid, toUid: this.ouid - 0, text: paths, type: 'chat_video', id: caid };
			this.ws.send({
				data: JSON.stringify(content),
				success: () => {
					console.log('ws视频发送成功');
					uni.hideLoading();
					let nowDate = this.getNowFormatDate();
					let id = 'msg' + caid;
					this.chatWithList.push({
						...content,
						createTime: nowDate,
						id: caid
					});
					//回到底部
					this.$nextTick(() => {
						this.scrollToView = id;
						if (this.changeSendId) {
							this.$set(this.chatWithList[this.chatWithList.length - 1], 'id', '0_' + Date.now().toString());
							this.changeSendId = false;
						}
					});
					this.textMsg = '';
					this.inputLines = 0;
					this.inputTop = false;
				}
			});
		},
		discard() {
			return;
		},
		inputHight(e) {
			this.inputTop = true;
			this.messBotton = e.detail.height;
			this.inputBotton = e.detail.height;
			//对焦的时候做而不是换行的时候做
			this.changeTop = Math.random() * 100;
		},
		inputLow(e) {
			this.inputBotton = 0;
			this.messBotton = 0;
		},
		inputLine(e) {
			//第一次进来就会刷一次 此时设置中部高度
			if (e.detail.lineCount === 1) {
				let query = uni.createSelectorQuery().in(this);
				query.select('.stick').boundingClientRect();
				query.select('.input-box').boundingClientRect();
				query.exec(res => {
					this.inputYbHeight = res[1].height;
					this.contentHeight = uni.getSystemInfoSync().windowHeight - res[0].height - res[1].height;
				});
				return;
			}
			//多行时候的差值
			let nowHeight = '';
			let query = uni.createSelectorQuery().in(this);
			query.select('.input-box').boundingClientRect();
			query.exec(res => {
				nowHeight = res[0].height;
				this.inputLines = nowHeight - this.inputYbHeight;
			});
		},
		toOtherUser() {
			uni.navigateTo({
				url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + this.ocateId + '&ouid=' + this.ouid
			});
		},
		async getUserRemarkEdit() {
			let res = await userRemarkEdit({ fid: this.fid, remark: this.remark });
			console.log('请求修改备注');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon:'none'
				});
				return;
			}
			uni.showToast({
				title: '修改备注成功',
				icon:'none'
			});
			this.realRemark = this.remark;
			this.changeName = false;
		},
		//展示图片
		showPic(i) {
			uni.previewImage({
				current: i[0],
				urls: i
			});
		},
		// 展示下载按钮
		showDownloadVideo(row) {
			console.log(row);
			if (!this.isFull) {
				// //非全屏状态才展示下载按钮
				this.isFullLongPress = true;
				this.popupRow = row;
				this.downloadUrl = row.text;
			}
		},
		selectClick(index) {
			if (index.name === '下载视频') {
				uni.showLoading({
					title: '视频下载中...'
				});
				uni.downloadFile({
					url: this.downloadUrl, // 视频文件的网络地址
					success: function(res) {
						if (res.statusCode === 200) {
							var tempFilePath = res.tempFilePath;
							uni.saveVideoToPhotosAlbum({
								filePath: tempFilePath,
								success: function() {
									uni.hideLoading();
									uni.showToast({
										title: '保存视频成功',
										icon:'none'
									});
								},
								fail: function(err) {
									uni.hideLoading();
									uni.showToast({
										title: res.msg,
										icon:'none'
									});
								}
							});
						} else {
							uni.hideLoading();
							uni.showToast({
								title: res.msg,
								icon:'none'
							});
						}
					},
					fail: function(err) {
						console.log('下载视频失败', err);
					}
				});
			} else if (index.name === '删除消息') {
				this.showRemove = true;
				this.cleanAll = false;
			}
		},
		//全屏和退出全屏
		onFullscreenChange(event) {
			this.isFull = event.detail.fullScreen;
		},
		setControls(row, event) {
			this.showPopup = true;
			this.popupRow = row;
			const bubble = '#bubble' + row.id;
			const query = wx.createSelectorQuery();
			const that = this;
			query
				.select('#' + event.currentTarget.id)
				.boundingClientRect(function(rect) {
					that.popupTop = Math.abs(rect.top) - 40;
					that.popupLeft = Math.abs(rect.left) + rect.width / 2;
				})
				.exec();
		},
		copyMessage() {
			let that = this;
			uni.setClipboardData({
				data: this.popupRow.text,
				success: res => {
					that.showPopup = false;
					console.log('chengg');
					console.log(res);
				},
				fail: res => {
					console.log('fail');
					console.log(res);
					uni.showToast({
						title: res,
						icon:'none'
					});
				}
			});
		},
		async confirmRemove() {
			if (!this.armor && this.cleanType === 1) {
				uni.showToast({
					title: '未激活，需兑换超级安全盔甲',
					icon:'none'
				});
				return;
			}
			let obj = {
				isAll: this.cleanAll === true ? 1 : 0,
				toUid: this.ouid - 0,
				isDouble: this.cleanType,
				msgIdList: this.cleanAll === true ? [] : [this.popupRow.id]
			};
			deleteHistory(obj).then(res => {
				console.log('单双删记录');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					});
					return;
				}
				if (this.cleanAll) {
					this.showRemove = false;
					// uni.navigateBack({});
					this.chatWithList = [];
				} else {
					const index = this.chatWithList.findIndex(item => item.id === this.popupRow.id);
					this.$delete(this.chatWithList, index);
					this.showPopup = false; // 关闭弹出层
					this.showRemove = false;
				}
			});
		},
		recordOkBtn(row) {
			// row.showOkBtn = true;
			// console.log(row);
		}
	}
};
</script>
<style lang="scss">
@import 'css/style.scss';

.pages {
	display: flex;
	flex-direction: column;
	height: 100vh;
}
.content {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	overflow: hidden;
}
.stick {
	display: flex;
	align-items: center;
	width: 100%;
	height: 240rpx;
	z-index: 50;
	box-sizing: border-box;
	padding: 20rpx 30rpx;
	background-color: transparent !important;
	background: url('../../static/area-select-bg.png') !important;
	background-size: 100% 240rpx;
	.other-title {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		margin-right: 26rpx;
	}
	.other-info {
		position: relative;
		flex: 1;
		margin-right: 26rpx;

		.info-name {
			display: flex;
			font-size: 46rpx;
			font-weight: 500;
			color: #000000;
			line-height: 1.5;
			align-items: center;

			.box {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis !important; /* 超出部分省略号 */
				word-break: break-all !important; /* break-all(允许在单词内换行。) */
				display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
				-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
				-webkit-line-clamp: 1 !important; /* 显示的行数 */
			}
			img {
				width: 120rpx;
				height: 30rpx;
				margin: 0 20rpx;
			}
		}
		.info-des {
			font-size: 32rpx;
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis !important; /* 超出部分省略号 */
			word-break: break-all !important; /* break-all(允许在单词内换行。) */
			display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
			-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
			-webkit-line-clamp: 1 !important; /* 显示的行数 */
		}
	}
	.other-relation {
		width: 56rpx;
		height: 56rpx;
		padding: 10rpx;
		border-radius: 16rpx;
		background-color: #e6e6e6;
		margin-right: 16rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.u-popup {
	flex: 0 !important;
}

//----------
.content .showLayer {
	transform: translate3d(0, -43vw, 0);
}
.timer {
	padding: 4rpx 8rpx;
	color: #94c7eb;
	font-size: 28rpx;
}
.popup {
	position: absolute;
	z-index: 50;
	background-color: rgba(0, 0, 0, 0.75);
	border-radius: 16rpx;
	padding: 16rpx;
	color: #fff;
	display: flex;
	white-space: pre;
	transform: translateX(-50%);
}
/deep/.u-radio {
	padding: 10rpx 0;
}
</style>
