<template>
	<div class="pages">
		<!-- 表头 -->
		<div class="dynamic">
			<img class="my" :src="artObj.userInfo.avatar" alt="" @click="toOtherUser(artObj.userInfo, 1)" />
			<div class="title">
				<span class="des-name">{{ artObj.userInfo.username }}</span>
				<div class="des-more">{{ artObj.userInfo.intro }}</div>
			</div>
		</div>
		<!-- 文本内容 -->
		<div class="content">
			<div class="content-c">{{ artObj.content }}</div>
			<video v-if="aImgList.length === 0 && avideo" :src="avideo"></video>
			<u-album
				v-if="aImgList.length !== 0 && !avideo && aImgList.length > 4"
				:urls="aImgList"
				singleSize="750rpx"
				multipleSize="242rpx"
			></u-album>
			<div class="ua-box" v-if="aImgList.length !== 0 && !avideo && aImgList.length < 5 && aImgList.length > 1">
				<u-album :urls="aImgList" singleSize="740rpx" multipleSize="356rpx" rowCount="2"></u-album>
			</div>
			<image class="singleImg" v-if="aImgList.length === 1" :src="aImgList" mode="widthFix" @click="previewImg"></image>
		</div>
		<!-- 一排 -->
		<div class="all" v-if="!secret">
			<div class="timer">
				<span style="font-size: 24rpx;color: #767374;">{{ artObj.createTime }}</span>
				<span v-if="artObj.userInfo.uid === uid" style="font-size: 24rpx;color: #ff1d1d; margin-left: 10rpx;" @click="showRemoveArt = true">
					删除
				</span>
			</div>
			<div class="option">
				<u-icon
					:label="artObj.silverNum"
					labelPos="bottom"
					labelSize="12"
					labelColor="#767374"
					name="../../../../static/money.png"
					size="22"
					color="#333"
					@click="openPop"
				></u-icon>
				<u-icon
					:label="artObj.flowerNum"
					labelPos="bottom"
					labelSize="10"
					labelColor="#767374"
					name="../../../../static/flower.png"
					size="22"
					color="#333"
					@click="openPop"
				></u-icon>
				<u-icon
					:label="artObj.eggNum"
					labelPos="bottom"
					labelSize="10"
					labelColor="#767374"
					name="../../../../static/poo.png"
					size="22"
					color="#333"
					@click="openPop"
				></u-icon>
				<u-icon
					v-if="!artObj.isCollection"
					:label="artObj.collectionCount"
					labelPos="bottom"
					labelSize="12"
					labelColor="#767374"
					name="heart"
					size="22"
					color="#333"
					@click="changeCollection(1)"
				></u-icon>
				<u-icon
					v-else
					:label="artObj.collectionCount"
					labelPos="bottom"
					labelSize="12"
					labelColor="#767374"
					name="heart-fill"
					size="22"
					color="#ff0000"
					@click="changeCollection(2)"
				></u-icon>
				<u-icon
					:label="artObj.commentCount"
					labelPos="bottom"
					labelSize="12"
					labelColor="#767374"
					name="chat"
					size="22"
					color="#333"
					@click="openInput()"
				></u-icon>
				<button open-type="share">
					<u-icon label="分享" labelPos="bottom" labelSize="12" labelColor="#767374" name="share" size="22" color="#333"></u-icon>
				</button>
			</div>
		</div>
		<div class="no-all" v-else>
			<span v-if="artObj.userInfo.uid === uid" style="font-size: 24rpx;color: #ff1d1d;margin-bottom: 8rpx;" @click="showRemoveArt = true">
				删除
			</span>
		</div>
		<!-- 一级回复 -->
		<div class="other" v-if="!secret">
			<div class="other-item" v-for="i in oneRecordList" :key="i.id">
				<img class="other-pri" :src="i.fromAvatar" alt="" @click="toOtherUser(i)" />
				<div class="other-all">
					<div class="other-name" @click="openInput(i)">{{ i.fromUserName }}</div>
					<div class="other-say" @click="openInput(i)">{{ i.content }}</div>
					<div class="other-bottom">
						<span class="other-other" @click.stop="openMoreRecord(i)">
							{{ i.childrenCount }}回复
							<u-icon name="arrow-right" color="#333" size="14"></u-icon>
						</span>
						<div class="other-timer">
							<span
								v-if="i.uid === uid"
								style="font-size: 24rpx;color: #ff1d1d; margin-right: 10rpx;"
								@click="
									showRemoveComment = true;
									removeId = i.id;
								"
							>
								删除
							</span>
							<span style="font-size: 24rpx;color: #767374;">{{ i.createTime }}</span>
						</div>
					</div>
				</div>
			</div>
			<div v-if="!isloading && page >= lastPage" class="next">———— 没有更多数据了 ————</div>
		</div>
		<u-loading-icon v-if="isloading" color="#767374" size="16"></u-loading-icon>

		<!-- 底部输入栏 -->
		<view v-show="showInput" class="input-box cu-bar tabbar" @touchmove.stop.prevent="discard" :style="{ bottom: messBotton + 'px' }">
			<view class="textbox">
				<view class="text-mode" :class="isVoice ? 'hidden' : ''">
					<view class="box">
						<view class="box">
							<textarea
								:placeholder="holder"
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
			</view>
			<view class="send" :class="isVoice ? 'hidden' : ''" @click="sendText"><view class="btn">发送</view></view>
		</view>
		<!-- 输入栏背景 -->
		<div v-if="showInput" class="cancel-input" @click="showInput = false"></div>
		<!-- 回复 -->
		<u-popup
			:show="showMoreRecord"
			@close="
				showMoreRecord = false;
				pageMoreRecord = 1;
				lastPageMoreRecord = '';
				loadingMoreRecord = false;
				twoRecordList = [];
			"
			bgColor="rgba(255,255,255,0.9)"
		>
			<div class="popbox">
				<!-- 回复提示-->
				<!-- <div class="re-title">{{ twoRecordList.length }}回复</div> -->
				<div class="re-title">全部回复</div>
				<!-- 全部回复栏 -->
				<scroll-view :scroll-y="true" style="width:100%;height:830rpx;" @scrolltolower="lowerMoreRecord">
					<!-- 列表 -->
					<div class="list-tiem" v-for="i in twoRecordList" :key="i.id">
						<img class="ava" :src="i.fromAvatar" alt="" @click="toOtherUser(i)" />
						<div class="count">
							<div class="count-name" @click="openInput(i, 2)">{{ i.fromUserName }}{{ i.isReply === 1 ? ' ➡ ' + i.toUserName : '' }}</div>
							<div class="count-comment" @click="openInput(i, 2)">{{ i.content }}</div>
							<div class="count-timer">
								<span
									v-if="i.uid === uid"
									style="font-size: 24rpx;color: #ff1d1d; margin-right: 10rpx;"
									@click="
										showRemoveComment = true;
										removeId = i.id;
									"
								>
									删除
								</span>
								<span style="font-size: 24rpx;color: #767374;">{{ i.createTime }}</span>
							</div>
						</div>
					</div>
				</scroll-view>
			</div>
			<!-- 二级底部加载提示 -->
			<u-loading-icon v-if="loadingMoreRecord" color="#767374" size="16"></u-loading-icon>
			<div v-if="!loadingMoreRecord && pageMoreRecord >= lastPageMoreRecord" class="next">没有更多了</div>
		</u-popup>
		<u-popup :show="popMoney" @close="popMoney = false" bgColor="rgba(255,255,255,0.9)">
			<div class="send-box">
				<u--input
					placeholder="请输入赠送数量"
					prefixIcon="../../../../static/money.png"
					prefixIconStyle="font-size: 38px;color: #909399"
					v-model="sendMoney"
					inputAlign="center"
					fontSize="18"
				></u--input>
				<u--input
					placeholder="请输入赠送数量"
					prefixIcon="../../../../static/flower.png"
					prefixIconStyle="font-size: 38px;color: #909399"
					v-model="sendFlower"
					inputAlign="center"
					fontSize="18"
				></u--input>
				<u--input
					placeholder="请输入赠送数量"
					prefixIcon="../../../../static/poo.png"
					prefixIconStyle="font-size: 38px;color: #909399"
					v-model="sendPoo"
					inputAlign="center"
					fontSize="18"
				></u--input>
				<div class="send-ok" @click="sendMoneyOrFlowerOrPoo">确认</div>
			</div>
		</u-popup>
		<!-- 确认删除模态框 -->
		<u-modal
			:show="showRemoveArt"
			title="删除"
			:content="secret ? '本条记录将被清除' : '动态内容及其评论都会被清除'"
			@confirm="confirmRemoveArt"
			showCancelButton
			@cancel="showRemoveArt = false"
			confirmColor="#e89406"
		></u-modal>
		<!-- 删除评论模态框 -->
		<u-modal
			:show="showRemoveComment"
			title="删除"
			content="本条评论将被删除"
			@confirm="confirmRemoveComment"
			showCancelButton
			@cancel="showRemoveComment = false"
			confirmColor="#e89406"
		></u-modal>
	</div>
</template>

<script>
import {
	detail,
	addCollection,
	cancelCollection,
	getComment,
	getChildrenComment,
	addComment,
	deletePost,
	giveEgg,
	deleteComment
} from '@/api/articleDes/articleDes.js';
import { giveSilver, giveFlower } from '@/api/index/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { checkContent } from '@/api/articleIssue/artcleIssue.js';

const app = getApp();

export default {
	computed: {
		...mapState(['uid', 'house'])
	},
	data() {
		return {
			ws: '',
			//帖子id
			id: '',
			//评论id
			removeId: '',
			aImgList: [],
			avideo: '',
			//一级------------
			//条数
			limit: 12,
			//页面
			page: 1,
			lastPage: '',
			//列表
			myList: [],
			isloading: false, // 节流阀 是否正在请求数据
			oneRecordList: [],
			//没有图片或视频
			noMedia: false,
			showInput: false,
			textMsg: '',
			// 查看全部回复(二级)--------------
			twoRecordList: [],
			showMoreRecord: false,
			loadingMoreRecord: false,
			pageMoreRecord: 1,
			lastPageMoreRecord: '',
			limitMoreRecord: 12,
			isReply: 0,
			artObj: {},
			//弹出花费窗户
			popMoney: false,
			//送钱
			sendMoney: '',
			//送花
			sendFlower: '',
			//送便便
			sendPoo: '',
			//删除动态
			showRemoveArt: false,
			twoDadId: '',
			//父级评论ID（评论动态时=0 ，评论其他评论时为对应评论的id）
			pid: '',
			//被回复用户ID 可能是帖主 也可能是评论家（评论发消息用）
			toUid: '',
			//永远代指发帖的帖主（点赞 发消息 送东西用）
			receiveUid: '',
			//删除评论
			showRemoveComment: false,
			messBotton: 0,
			inputYbHeight: 0,
			holder: '',
			//是否私人
			secret: null,
			// 正在送出
			sending: false,
			//1 or 2
			sayOne: true
		};
	},
	onLoad(option) {
		this.ws = app.globalData.ws;
		// this.ws.onMessage(res => {
		// 	console.log('接收消息ing');
		// 	console.log(res);
		// });
		this.id = option.i;
		this.secret = option.secret ? option.secret : null;
		this.getDetail();
		this.oneRecordList = [];
		this.getCommentList();
	},
	//触发onShareAppMessage监听事件
	onShareAppMessage() {
		return {
			title: 'X自由空间，微信里的新天地！',
			path: '/pages_userActivity/articleDes/articleDes?i=' + this.id, // 路径，传递参数到指定页面。
			imgUrl: '/static/time.png'
		};
	},
	onReachBottom() {
		if (this.page >= this.lastPage) {
			return;
		}
		// 判断是否正在请求其它数据，如果是，则不发起额外的请求
		if (this.isloading) return;
		// 让页码值自增 +1
		this.page += 1;
		// 重新获取列表数据
		this.getCommentList();
	},
	methods: {
		//获取详情
		async getDetail() {
			let res = await detail({ id: this.id });
			console.log('获取详情');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取动态详情失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.artObj = res.result;
			//评论用uid 可能会修改
			this.toUid = res.result.uid;
			//帖主uid  不更改
			this.receiveUid = res.result.uid;
			if (this.artObj.media.length === 0) {
				return;
			}
			let medias = this.artObj.media[0];
			let zhengze = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
			if (zhengze.test(medias)) {
				//是图片
				this.aImgList = this.artObj.media;
			} else {
				this.avideo = this.artObj.media[0];
			}
		},
		//改变点赞状态 没房子不许点
		async changeCollection(flag) {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (flag === 1) {
				//点赞
				let res = await addCollection({ id: this.id });
				this.$set(this.artObj, 'isCollection', true);
				let coo = this.artObj.collectionCount + 1;
				this.$set(this.artObj, 'collectionCount', coo);
				//-----------
				//自己点赞自己不给提示
				if (this.uid === this.receiveUid) {
					return;
				}
				var content = { fromUid: this.uid, toUid: this.receiveUid, text: '点赞了您的动态', type: 'collection', postId: this.id };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws点赞消息发送成功');
					}
				});
				//-----------
			} else if (flag === 2) {
				//取消
				let res = await cancelCollection({ id: this.id });
				this.$set(this.artObj, 'isCollection', false);
				let coo = this.artObj.collectionCount - 1;
				this.$set(this.artObj, 'collectionCount', coo);
			}
		},
		//获取一级评论列表
		async getCommentList() {
			this.isloading = true;
			let res = await getComment({ postId: this.id, page: this.page, limit: this.limit });
			console.log('请求用户评论');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取用户评论失败',
					icon: 'none',
					duration: 2000
				});
				// ** 关闭节流阀
				this.isloading = false;
				return;
			}
			// ** 关闭节流阀
			this.isloading = false;
			this.oneRecordList = [...this.oneRecordList, ...res.result.data];
			this.lastPage = res.result.last_page;
		},
		//打开输入弹出窗
		openInput(i, index) {
			this.showInput = true;
			if (!i) {
				//评论帖主(动态)
				this.pid = 0;
				//帖主uid
				this.toUid = this.receiveUid;
				//提示
				this.holder = '评论这条帖子...';
				this.sayOne = true;
			} else {
				if (!index) {
					//不是二级时候 点击的这条评论的id
					this.pid = i.id;
				}
				//评论某个人评论 被回复的那个人uid
				this.toUid = i.uid;
				//提示
				this.holder = '评论' + i.fromUserName;
				this.sayOne = false;
			}
			if (index) {
				this.isReply = 1;
			} else {
				this.isReply = 0;
			}
		},
		//打开给别人花钱框  没房子不许点
		openPop() {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.receiveUid === this.uid) {
				uni.showToast({
					title: '不可以给自己助力',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.popMoney = true;
		},
		async sendMoneyOrFlowerOrPoo() {
			if (this.sending) {
				return;
			}
			if ((!this.sendMoney || this.sendMoney <= 0) && (!this.sendFlower || this.sendFlower <= 0) && (!this.sendPoo || this.sendPoo <= 0)) {
				uni.showToast({
					title: '助力数量有误',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.sending = true;
			uni.showLoading({
				title: '赠送中'
			});
			if (this.sendMoney) {
				let res1 = await giveSilver({ num: this.sendMoney, receiveUid: this.receiveUid, type: 1, receivePostid: this.id });
				uni.hideLoading();
				if (res1.code !== 0) {
					uni.showToast({
						title: '赠送银元失败',
						icon: 'none',
						duration: 2000
					});
					this.sending = false;
					return;
				}
				this.artObj.silverNum = parseInt(this.artObj.silverNum) + parseInt(this.sendMoney);
				//----------
				var content = { fromUid: this.uid, toUid: this.receiveUid, text: `赠送了` + this.sendMoney + `两银子给您`, type: 'silver' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送银元发送成功');
					}
				});
			}
			if (this.sendFlower) {
				let res2 = await giveFlower({ num: this.sendFlower, receiveUid: this.receiveUid, type: 2, receivePostid: this.id });
				uni.hideLoading();
				if (res2.code !== 0) {
					uni.showToast({
						title: '赠送鲜花失败',
						icon: 'none',
						duration: 2000
					});
					this.sending = false;
					return;
				}
				this.artObj.flowerNum = parseInt(this.artObj.flowerNum) + parseInt(this.sendFlower);
				//----------
				var content = { fromUid: this.uid, toUid: this.receiveUid, text: `赠送了` + this.sendFlower + `朵鲜花给您`, type: 'flower' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送鲜花发送成功');
					}
				});
			}
			if (this.sendPoo) {
				let res3 = await giveEgg({ num: this.sendPoo, receiveUid: this.receiveUid, type: 3, receivePostid: this.id });
				uni.hideLoading();
				if (res3.code !== 0) {
					uni.showToast({
						title: '赠送粪便失败',
						icon: 'none',
						duration: 2000
					});
					this.sending = false;
					return;
				}
				this.artObj.eggNum = parseInt(this.artObj.eggNum) + parseInt(this.sendPoo);
				//----------
				var content = { fromUid: this.uid, toUid: this.receiveUid, text: `向你丢了` + this.sendPoo + `坨便便`, type: 'shit' };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws赠送便便发送成功');
					}
				});
			}
			this.popMoney = false;
			this.sending = false;
			this.sendFlower = '';
			this.sendMoney = '';
			this.sendPoo = '';
		},
		//打开二级评论弹窗
		openMoreRecord(i) {
			this.showInput = false;
			if (i.collectionCount !== 0) {
				this.twoDadId = i.id;
				this.showMoreRecord = true;
				// this.twoRecordList = i.children;
				this.getMoreCommentList();
			}
		},
		//请求二级评论
		async getMoreCommentList() {
			this.loadingMoreRecord = true;
			let res = await getChildrenComment({ pid: this.twoDadId, page: this.pageMoreRecord, limit: this.limitMoreRecord });
			if (res.code !== 0) {
				uni.showToast({
					title: '请求二级评论失败',
					icon: 'none',
					duration: 2000
				});
				this.loadingMoreRecord = false;
				return;
			}
			console.log('请求二级评论');
			console.log(res);
			this.twoRecordList = [...this.twoRecordList, ...res.result.data];
			this.lastPage = res.result.last_page;
			// ** 关闭节流阀
			this.loadingMoreRecord = false;
		},
		//下拉加载更多评论
		lowerMoreRecord() {
			if (this.pageMoreRecord >= this.lastPageMoreRecord) {
				return;
			}
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.loadingMoreRecord) return;
			// 让页码值自增 +1
			this.pageMoreRecord += 1;
			// 重新获取列表数据
			this.getMoreCommentList();
		},
		//发送文字 没房子不许点 需要验证发布文字内容
		async sendText() {
			if (!this.house) {
				uni.showToast({
					title: '请先成为空间主人',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (!this.textMsg) {
				uni.showToast({
					title: '不可以发表空评论哦',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			uni.showLoading({
				title: '评论发表中'
			});
			let res = await checkContent({ content: this.textMsg });
			if (res.code !== 0 || res.result.errcode !== 0) {
				uni.hideLoading();
				uni.showToast({
					title: '发布的内容包含违规信息，请修改',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.sendReallyText();
		},

		//真发送文字
		async sendReallyText() {
			let res = await addComment({
				content: this.textMsg,
				pid: this.isReply === 0 ? this.pid : this.twoDadId,
				postId: this.id,
				toUid: this.toUid,
				isReply: this.isReply
			});
			uni.hideLoading();
			if (res.code !== 0) {
				this.showInput = false;
				uni.showToast({
					title: '评论失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.textMsg = '';
			this.showInput = false;
			uni.showToast({
				title: '评论成功',
				icon: 'none',
				duration: 2000
			});
			//-----------
			this.artObj = {};
			this.getDetail();
			if (this.isReply === 1) {
				this.twoRecordList = [];
				this.pageMoreRecord = 1;
				this.lastPageMoreRecord = '';
				this.getMoreCommentList();
			} else {
				this.oneRecordList = [];
				this.page = 1;
				this.lastPage = '';
				this.getCommentList();
			}
			//-----------
			//自己评论自己不给提示
			if (this.uid === this.toUid) {
				return;
			}
			//一级提示 被回复id是帖主
			if (this.sayOne) {
				var content = { fromUid: this.uid, toUid: this.toUid, text: '评论了您的动态', type: 'comment', postId: this.id };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws评论消息发送成功');
					}
				});
			} else {
				//二级提示 被回复id不是帖主
				var content = { fromUid: this.uid, toUid: this.toUid, text: '评论了您的评论', type: 'comment', postId: this.id };
				this.ws.send({
					data: JSON.stringify(content),
					success: () => {
						console.log('ws二级评论消息发送成功');
					}
				});
			}

			//二级提示

			//-----------
		},

		//删除动态
		async confirmRemoveArt() {
			let res = await deletePost({ id: this.id });
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '删除动态失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			uni.showToast({
				title: '已删除',
				icon: 'none',
				duration: 2000
			});
			//删除成功
			// uni.navigateBack({ });

			let pages = getCurrentPages();
			let beforePage = pages[pages.length - 2];
			beforePage.$vm.refresh = true;
			uni.navigateBack({
				success: function() {}
			});
		},
		//删除评论
		async confirmRemoveComment() {
			let res = await deleteComment({ id: this.removeId });
			console.log(res);
			console.log('删除评论');
			if (res.code !== 0) {
				uni.showToast({
					title: '删除评论失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			uni.showToast({
				title: '已删除',
				icon: 'none',
				duration: 2000
			});
			this.artObj = {};
			this.getDetail();
			this.showRemoveComment = false;
			this.showMoreRecord = false;
			this.oneRecordList = [];
			this.twoRecordList = [];
			this.getCommentList();
		},
		//去别人的空间
		toOtherUser(i, n) {
			if (i.uid === this.uid) {
				//自己
				uni.switchTab({
					url: '../../pages/user/user'
				});
			} else {
				if (n === 1) {
					uni.navigateTo({
						url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + i.uid
					});
				} else {
					uni.navigateTo({
						url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateid + '&ouid=' + i.uid
					});
				}
			}
		},
		//单图预览
		previewImg() {
			uni.previewImage({
				current: this.aImgList[0], // 当前显示图片的http链接
				urls: this.aImgList // 需要预览的图片http链接列表
			});
		},
		inputHight(e) {
			this.messBotton = e.detail.height;
		},
		inputLow(e) {
			this.messBotton = 0;
		},
		inputLine(e) {
			//第一次进来就会刷一次 此时设置中部高度
			// 	if (e.detail.lineCount === 1) {
			// 		let query = uni.createSelectorQuery().in(this);
			// 		query.select('.input-box').boundingClientRect();
			// 		query.exec(res => {
			// 			this.inputYbHeight = res[0].height;
			// 		});
			// 		return;
			// 	}
			// 	//多行时候的差值
			// 	let nowHeight = '';
			// 	let query = uni.createSelectorQuery().in(this);
			// 	query.select('.input-box').boundingClientRect();
			// 	query.exec(res => {
			// 		nowHeight = res[0].height;
			// 		this.inputLines = nowHeight - this.inputYbHeight;
			// 	});
		}
	}
};
</script>

<style lang="less">
.pages {
	position: relative;
}
.dynamic {
	display: flex;
	width: 100%;
	height: 220rpx;
	align-items: center;
	padding: 0 32rpx;
	box-sizing: border-box;
	background: url('../../static/area-select-bg.png') !important;
	image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.title {
		flex: 1;
		color: #000000;
		line-height: 66rpx;
		.des-name {
			font-size: 48rpx;
			line-height: 1.8;
			padding-bottom: 8rpx;
		}
		.des-more {
			font-size: 32rpx;
			line-height: 1.2;
			color: #e99300;
			overflow: hidden !important;
			text-overflow: ellipsis !important; /* 超出部分省略号 */
			word-break: break-all !important; /* break-all(允许在单词内换行。) */
			display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
			-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
			-webkit-line-clamp: 2 !important; /* 显示的行数 */
		}
	}
}
.content {
	font-size: 32rpx;
	overflow: hidden;
	video {
		width: 100%;
	}
	.content-c {
		margin: 10rpx 20rpx;
		word-break: break-all;
		font-size: 36rpx;
		line-height: 1.4;
		white-space: pre-line; //遇到回车换行
	}
	.content-i {
		width: 100%;
		image {
			display: block;
			width: 100% !important;
		}
	}
}
.no-all {
	display: flex;
	margin: 0 20rpx;
	// border-bottom: 2rpx solid #acacac;
}
.all {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 18rpx 0 12rpx;
	margin: 0 20rpx;
	border-bottom: 2rpx solid #acacac;
	.timer {
	}
	.option {
		display: flex;
		justify-content: flex-end;
		.u-icon {
			margin-right: 16rpx;
		}
	}
}
.other {
	padding: 20rpx 20rpx 26rpx;
	.other-item {
		display: flex;
		margin: 16rpx 0;
		.other-pri {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			margin-right: 16rpx;
		}
		.other-all {
			flex: 1;
			.other-name {
				font-size: 34rpx;
				margin-bottom: 6rpx;
			}
			.other-say {
				color: #444444;
				white-space: pre-line; //遇到回车换行
				word-break: break-all !important; /* break-all(允许在单词内换行。) */
			}
			.other-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 0;
				.other-other {
					display: flex;
					background-color: #e0e0e0;
					color: #ff8000;
					padding: 4rpx 4rpx 4rpx 12rpx;
					border-radius: 20rpx;
					letter-spacing: 2rpx;
				}
				.other-timer {
				}
			}
		}
	}
}
.cancel-input {
	position: absolute;
	z-index: 100;
	width: 750rpx;
	height: 100vh;
	left: 0;
	top: 0;
	// background-color: orchid;
	// opacity: 0.4;
}
.input-box {
	position: fixed;
	width: 100%;
	padding: 0 1%;
	background-color: #f2f2f2;
	display: flex;
	z-index: 111150;
	bottom: 0upx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	.textbox {
		width: 100%;
		min-height: 70upx;
		margin-bottom: 10upx;
		.text-mode {
			width: 95%;
			min-height: 70upx;
			display: flex;
			background-color: #fff;
			margin: 15rpx auto;
			border-radius: 40upx;

			.box {
				width: 100%;
				padding: 0 30upx;
				min-height: 70upx;
				display: flex;
				align-items: center;

				textarea {
					width: 100%;
				}
			}

			.em {
				flex-shrink: 0;
				width: 80upx;
				padding-left: 10upx;
				height: 70upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
.send {
	//H5发送按钮左边距
	/* #ifdef H5 */
	margin-left: 20upx;
	/* #endif */
	flex-shrink: 0;
	width: 150upx;
	height: 100upx;
	display: flex;
	align-items: center;

	.btn {
		width: 120upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
		// background: linear-gradient(to right, #f09b37, #eb632c);
		background-color: #e89406;
		color: #fff;
		border-radius: 6upx;
		font-size: 28upx;
	}
}
.popbox {
	// backdrop-filter: blur(20rpx);
}
.re-title {
	// width: 100%;
	font-size: 40rpx;
	color: #e99300;
	text-align: center;
	margin: 30rpx 20rpx 10rpx;
	padding-bottom: 30rpx;
	border-bottom: 2rpx solid #bababa;
}
.list-tiem {
	display: flex;
	padding: 10rpx 20rpx;
	.ava {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.count {
		flex: 1;
		color: #333;
		word-break: break-all !important; /* break-all(允许在单词内换行。) */
		.count-name {
			font-size: 34rpx;
			margin-bottom: 8rpx;
		}
		.count-comment {
			color: #444444;
		}
		.count-timer {
			text-align: right;
			font-size: 26rpx;
			color: #888586;
		}
	}
}
.re-sm-title {
	margin: 20rpx;
	color: #565656;
}
.send-box {
	width: 100%;
	height: 750rpx;
	padding: 120rpx 180rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	/deep/.u-input {
		flex: 0 !important;
		border-radius: 20rpx;
		border: 2rpx solid #888586 !important;
	}
	/deep/.u-input__content {
		height: 80rpx;
		.u-icon__img {
			width: 70rpx !important;
			height: 70rpx !important;
		}
	}
	.send-ok {
		margin-top: 20rpx;
		font-size: 44rpx;
		text-align: center;
		width: 130rpx;
		height: 74rpx;
		line-height: 74rpx;
		background: #ffffff;
		border-radius: 20rpx;
		border: 2rpx solid #888586;
	}
}
/deep/.u-popup__content {
	border-radius: 30rpx 30rpx 0 0;
}
swiper {
	height: 750rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.next {
	margin-top: 10rpx;
	width: 100%;
	color: #9a9698;
	text-align: center;
}
button {
	background-color: transparent;
	margin: 0;
	padding: 0;
}
button::after {
	border: 0;
}
.ua-box {
	margin-left: 14rpx;
}
.singleImg {
	display: block;
	width: 750rpx;
}
</style>
