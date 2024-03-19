<template>
	<div class="pages">
		<!-- 再渲染 如果登录有房间了再加载以下内容 -->
		<div v-if="type === 1 || type === 3">
			<div class="box-title">
				<Cropping @upload="doUpload2" ref="cropping2" selWidth="300upx" selHeight="300upx" />
				<!-- 小背景 -->
				<img :src="coverImage === '' ? 'https://www.zairongyifang.com:8080/filePath/resource/default_room_bg.png?v=3' : coverImage" alt="" class="my-img" />

				<!-- 覆盖盒子/相对定位 -->
				<div class="width-bottom">
					<img src="../../static/changemy.png" alt="" @click="changeBg" />
				</div>
				<div class="my-info">
					<img class="setting" src="../../static/settings.png" alt="" @click="toSettings" />
					<div class="armor-box" @click="toCostMoney">
						<img class="armor-img" :src="armor ? '../../static/armor.png' : '../../static/armor-no.png'" alt="" />
						<div>{{ armor ? '安全盔甲' : '激活安全盔甲' }}</div>
					</div>
					<div class="infos-1">
						<Cropping @upload="doUpload" ref="cropping" selWidth="300upx" selHeight="300upx" />
						<div class="portrait-box">
							<img class="portrait" :src="avatar" alt="" @click="changeAvatar" />
							<div class="portrait-change">换头像</div>
						</div>
						<div class="info">
							<div class="name-kj">
								<div class="name">{{ username }}</div>
							</div>
							<div class="about">
								<div @click="toFansAndFouces">关注：{{ follow }}</div>
								<div @click="toFansAndFouces">粉丝：{{ fans }}</div>
							</div>
						</div>
					</div>
					<div class="infos-2">
						<u--textarea
							border="null"
							v-model="myDes"
							placeholder="（设置个性签名 最多30字）"
							autoHeight
							maxlength="30"
							placeholderStyle="color: #767374"
							color="#767374"
							@blur="changeMyDes"
							:showConfirmBar="false"
						></u--textarea>
					</div>
					<div class="cost-start">
						<div class="cost-level">
							<img
								class="level-img"
								:src="vipLevel === 1 ? '../../static/vip-1.png' : vipLevel === 2 ? '../../static/vip-2.png' : vipLevel === 3 ? '../../static/vip-3.png' : ''"
								alt=""
							/>
							<div class="level-img-says">LV{{ nmberLevel }}</div>
							<div class="level-intro">
								<div>{{ silverNum }}</div>
								<img class="level-start" src="../../static/money.png" alt="" />
							</div>
						</div>
						<div class="cost-step">
							<u-line-progress :percentage="percentage" height="8" inactiveColor="#fff" activeColor="#FEDA7A" :showText="false"></u-line-progress>
						</div>
					</div>
					<div class="infos-3">
						<div class="contorl-1">
							<img src="../../static/chat.png" alt="" @click="toChatList" />
							<div v-if="chatDot" class="mes-dot"></div>
						</div>
						<img class="contorl-2" src="../../static/mim.png" alt="" @click="changeSecret = true" />
						<img class="contorl-3" src="../../static/secret.png" alt="" @click="goSecret" />
						<div class="contorl-4">
							<img src="../../static/kjjs.png" alt="" @click="goIntroduce()" />
						</div>
						<img class="contorl-5" src="../../static/issue.png" alt="" @click="toIssue" />
						<img class="contorl-6" src="../../static/search.png" alt="" @click="showSearch = true" />
						<img class="contorl-7" src="../../static/friends.png" alt="" @click="showFriend = true" />
						<img class="contorl-8" src="../../static/push.png" alt="" @click="showSub = true" />
					</div>
				</div>
			</div>
			<!-- 列表 -->
			<div v-if="myList.length !== 0" class="list-item" v-for="(i, index) in myList" :key="i.id">
				<!-- 头 -->
				<div class="list-title">
					<div class="dates">
						<img v-if="i.postTop" src="../../static/placed-top.png" alt="" />
						<text>{{ i.createTime }}</text>
					</div>
					<text v-if="!i.postTop" class="get-top" @click.stop="setTop(i)">设为置顶</text>
					<text v-if="i.postTop" class="get-top" @click.stop="unSetTop(i)">取消置顶</text>
				</div>
				<!-- 图 -->
				<div class="looks">
					<!-- 标题 -->
					<div class="content-title">
						<div v-if="i.more === '1'" class="real-more-inner">
							{{ i.content }}
						</div>
						<div v-else-if="i.more === '2'" class="real-inner">
							{{ i.content }}
						</div>
						<div v-else class="inner">{{ i.content }}</div>
					</div>
					<div v-if="i.more === '1'" class="content-des" @click="toArticleDes(i)">查看详情 ></div>
					<video v-if="!i.img && i.media.length !== 0" :src="i.media[0]" :controls="true" :show-center-play-btn="true"></video>
					<!-- 四张以上 -->
					<div class="five" v-if="i.img && i.media.length !== 0 && i.media.length > 4">
						<image class="fiveImg" v-for="(j, jndex) in i.media" :key="jndex" :src="j" mode="aspectFill" @click="previewImg(i.media, jndex)"></image>
					</div>
					<!-- 四张 -->
					<div class="four" v-if="i.img && i.media.length > 1 && i.media.length < 5">
						<image class="fourImg" v-for="(q, qndex) in i.media" :key="qndex" :src="q" mode="aspectFill" @click="previewImg(i.media, qndex)"></image>
					</div>
					<!-- 一张 -->
					<image class="singleImg" v-if="i.img && i.media.length === 1" :src="i.media[0]" mode="widthFix" @click="previewImg(i.media, 0)"></image>
				</div>

				<!-- 分享评论转发 -->
				<div class="funcs" @click="toArticleDes(i)">
					<!-- 按钮 -->
					<img src="../../static/I.png" alt="" />
					<img src="../../static/want.png" alt="" />
					<img src="../../static/to.png" alt="" />
					<img src="../../static/more.png" alt="" />
				</div>
			</div>
			<u-loading-icon v-if="isloading" color="#767374" size="16"></u-loading-icon>
			<div v-if="!isloading && page >= lastPage" class="next">———— 没有更多数据了 ————</div>
			<!-- 留底 -->
			<div class="bottom"></div>
		</div>
		<div></div>
		<!--  密码 -->
		<div v-if="type === 2" class="bgs">
			<img class="mimasuo" src="https://www.zairongyifang.com:8080/filePath/resource/password.png" mode="" />
			<div class="paipai">
				<div style="color: #257de5; font-size: 24px">
					{{ username.split(' ')[0] }}
				</div>

				<div>
					<span style="color: #333; font-size: 34px">{{ username.split(' ')[1] }}</span>
				</div>
			</div>
			<u--input placeholder="请输入密码" border="none" v-model="inputMima" inputAlign="center" fontSize="20" maxlength="6"></u--input>
			<div class="mima-button" @click="confirmMima"></div>
		</div>

		<!-- 展示搜索 -->
		<u-overlay :show="showSearch" @click="showSearch = false">
			<div class="search">
				<div class="search-text">·对方需已入住空间·</div>
				<div class="search-box">
					<u-search
						placeholder="空间好友: 房号/个性签名"
						v-model="searchText"
						:clearabled="true"
						actionText="搜索"
						@search="getSelectRoom"
						@custom="getSelectRoom"
						@tap.stop
					></u-search>
				</div>
			</div>
		</u-overlay>
		<!-- 搜索结果 -->
		<u-popup :show="popSearch" @close="popSearch = false" :safeAreaInsetBottom="false">
			<div>
				<div class="search-result">搜索结果</div>
				<scroll-view v-if="peopleList.length !== 0" :scroll-y="true" style="width: 100%; height: 696rpx">
					<div class="people-item" v-for="(i, index) in peopleList" :key="index" @click="toOtherUser(i)">
						<img :src="i.userInfo.avatar" alt="" />
						<div class="des">
							<div class="des-room">
								{{ i.userInfo.username }}
							</div>
							<div class="des-say">
								{{ i.userInfo.intro ? i.userInfo.intro : ' ' }}
							</div>
						</div>
					</div>
				</scroll-view>
				<div v-else class="no-more">———— 没有匹配到相关用户 ————</div>
			</div>
		</u-popup>
		<!-- 留言 -->
		<u-overlay
			:show="showFriend"
			@click="
				showFriend = false;
				shengcheng = true;
			"
		>
			<div v-if="shengcheng" class="req-friend" @tap.stop>
				<img src="https://www.zairongyifang.com:8080/filePath/app/20236/dce268614f.png" alt="" />
				<div v-if="showFriend && shengcheng">
					<u--textarea
						class="say-box"
						border="null"
						v-model="inviteContent"
						placeholder="安全空间、轻松一刻"
						height="100px"
						maxlength="15"
						placeholderStyle="color: #767374"
						color="#767374"
						:adjustPosition="true"
						:showConfirmBar="false"
					></u--textarea>
				</div>
				<div class="get-erweima" @click="createQRCode()">下一步</div>
			</div>
			<div v-else class="my-friend" @tap.stop>
				<image class="code_view" :src="imagePath"></image>
				<img src="https://www.zairongyifang.com:8080/filePath/app/20236/b928ccf85c.png" alt="" />
				<div class="invite-content">{{ inviteContent }}</div>
				<button open-type="share" class="share-box">分享</button>
				<div class="back-to" @click="shengcheng = true">上一步</div>
			</div>
		</u-overlay>
		<!-- 首次进入 -->
		<u-overlay :show="isNew" @click="isNew = false">
			<div class="pagebox"></div>
			<div class="newPage">
				<img src="https://www.zairongyifang.com:8080/filePath/app/202312/compressed_4a2f71e49b.png" alt="" />
				<div class="show-my-name">
					<div>{{ username }}号</div>
				</div>
			</div>
		</u-overlay>
		<!-- 订阅弹窗 -->
		<u-modal :show="showSub" :title="'订阅消息提示'" :content="'每次离开空间时，点击:“允许订阅”即可在微信页面收到空间新消息提醒'" @confirm="doSub"></u-modal>
		<!-- 修改密码框 -->
		<u-modal
			title="修改房间密码"
			:show="changeSecret"
			@confirm="confirmChangeSecret"
			showCancelButton
			@cancel="
				changeSecret = false;
				newSecret = '';
				oldSecret = '';
			"
			confirmColor="#e89406"
		>
			<view class="slot-content">
				<u--form labelPosition="left" ref="form1" labelWidth="100rpx" :labelStyle="{ color: '#515151' }">
					<u-form-item label="原密码"><u-input placeholder="请输入原密码" v-model="oldSecret" maxlength="6"></u-input></u-form-item>
					<u-form-item label="新密码"><u-input placeholder="请输入新密码" v-model="newSecret" maxlength="6"></u-input></u-form-item>
				</u--form>
				<div
					:style="{
						color: '#888888',
						textAlign: 'center',
						fontSize: '26rpx',
						margin: '10rpx 0 0 0'
					}"
				>
					* 新用户设置房间密码，填写新密码即可
				</div>
				<div
					:style="{
						color: '#888888',
						textAlign: 'center',
						fontSize: '26rpx',
						margin: '10rpx 0 0 0'
					}"
				>
					* 新密码不填写即代表不设密码
				</div>
			</view>
		</u-modal>
		<!-- 普通弹窗 -->
		<u-overlay :show="popContentBox" @click="popContentBox = false">
			<div class="pop-content-box">
				<img :src="popContent.img" alt="" />
				<div class="contents">{{ popContent.text }}</div>
				<div class="iknow">我知道了</div>
			</div>
		</u-overlay>
	</div>
</template>

<script>
// 引入组件
import Cropping from '@/components/cropping/cropping.vue';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { getArmourConfig } from '@/api/updateArmor.js';
import {
	userInfo,
	userInfoEdit,
	updateBackGroupImg,
	queryMyPageList,
	cancelPostTop,
	postTop,
	redDot,
	getQRCode,
	updatePush,
	getUserStatistics,
	notify,
	getUserRank,
	updatePassword
} from '@/api/user.js';
import { myRoom, selectRoom } from '@/api/loginSelect.js';
import { ip } from '@/api/api.js';
import QRCode from '../../utils/weapp-qrcode.js';

const app = getApp();

export default {
	data() {
		return {
			ws: '',
			//头像临时头像
			avatar: '',
			linshiAvatar: '',
			//背景临时背景
			coverImage: '',
			linshiCoverImage: '',
			//个人签名
			myDes: '',
			//用户名
			username: '',
			//粉丝
			fans: '',
			//关注
			follow: '',
			//条数页面
			limit: 12,
			page: 1,
			lastPage: '',
			//列表
			myList: [],
			isloading: false, // 节流阀 是否正在请求数据
			//消息红点
			messageDot: false,
			//聊天列表红点
			chatDot: false,
			//查看类型 1看2密码
			type: '',
			//密码
			password: '',
			//输入的密码
			inputMima: '',
			//刷新
			refresh: true,
			uid: null,
			showSearch: false,
			showFriend: false,
			//搜索数据
			searchText: '',
			popSearch: false,
			peopleList: [],
			//首次进入 + 邀请
			isNew: null,
			getInviteCode: null,
			getInviteContent: null,
			//二维码
			shengcheng: true,
			inviteContent: '',
			imagePath: null,
			linshiImagePath: null,
			canva: true,
			showSub: false,
			//展示密码
			changeSecret: false,
			oldSecret: '',
			newSecret: '',
			//控制弹窗
			popContent: '',
			popContentBox: false,
			armour: false,
			armourTime: null,
			//充值金额
			accrualRecharge: 0,
			//vip显示
			vipLevel: 0,
			nmberLevel: 0,
			//元宝数量
			silverNum: 0,
			//元宝名次
			silverNo: ''
		};
	},
	computed: {
		...mapState(['house', 'token', 'myWs']),
		percentage() {
			return (this.silverNum / 150000) * 100 || 2;
		}
	},
	components: { Cropping },
	watch: {
		myWs: {
			immediate: true,
			handler(news, olds) {
				console.log('user开启侦听');
				this.ws = app.globalData.ws;
				this.ws.onMessage((res) => {
					console.log(res);
					if (res.data === 'active') {
						return;
					}
					let data = JSON.parse(res.data);
					console.log(data);
					if (data.type === 'chat' || data.type === 'chat_image' || data.type === 'chat_video') {
						this.chatDot = true;
					}
				});
			}
		},
		accrualRecharge: {
			handler(news, olds) {
				if (news < 10) {
					this.vipLevel = 0;
					this.nmberLevel = 0;
				} else if (10 <= news < 10 + 11 * 10 + 100) {
					this.vipLevel = 1;
					this.nmberLevel = Math.floor(news / 10);
				} else if (120 + 100 <= news < 130 + 11 * 100 + 1000) {
					this.vipLevel = 2;
					this.nmberLevel = Math.floor(news - (10 + 11 * 10) / 100);
				} else {
					this.vipLevel = 3;
					this.nmberLevel = Math.floor(news - (130 + 11 * 100) / 1000);
				}
			}
		}
	},
	onLoad(option) {
		if (!this.token) {
			uni.reLaunch({
				url: '../loginSelect/loginSelect'
			});
		}
		this.getMyRoom();
		this.isNew = uni.getStorageSync('isNew') === 1 ? true : false;
		this.getInviteCode = uni.getStorageSync('inviteCode') ? uni.getStorageSync('inviteCode') : null;
		this.getInviteContent = uni.getStorageSync('inviteContent') ? uni.getStorageSync('inviteContent') : null;

		if (this.getInviteCode && this.getInviteContent) {
			this.sendChatWith();
		}
	},
	onShow() {
		if (this.refresh) {
			this.page = 1;
			this.myList = [];
			this.getuserInfo();
			this.getMyPageList();
			this.getArmourConfig();
		}
		this.refresh = true;
	},
	onReachBottom() {
		if (this.page >= this.lastPage) {
			return;
		}
		if (this.isloading) return;
		this.page += 1;
		this.getMyPageList();
	},
	methods: {
		...mapMutations(['updateUid', 'updateAva', 'updateHouse', 'updateArmor']),
		//获取用户订阅消息与否
		doSub() {
			this.showSub = false;
			let that = this;
			if (!uni.getStorageSync('openId')) {
				uni.$u.toast('只有微信用户才可以选择消息推送！');
				return;
			}
			wx.requestSubscribeMessage({
				tmplIds: ['CQQcQ9HEHzAyrhtIu3hbFciZ6IZylcB0j1e-9mRYrOA'],
				success: function (res) {
					// 判断用户是否选择了订阅
					if (res['CQQcQ9HEHzAyrhtIu3hbFciZ6IZylcB0j1e-9mRYrOA'] === 'accept') {
						that.updatePush();
					} else {
						uni.showModal({
							title: '提示',
							content: '您已取消微信订阅，如需开启，请打开右上角“···”-设置-订阅消息-未读消息提醒-接收',
							showCancel: false, // 不显示取消按钮
							confirmText: '确认' // 确认按钮的文本
						});
						// 引导用户手动打开授权设置页面
						wx.openSetting({
							success: function (res) {
								if (res.authSetting['scope.subscribeMessage'] === true) {
									that.pushMyMessage();
								}
							}
						});
					}
				},
				fail: function (err) {
					// 订阅消息失败的回调处理
					console.error(err);
				}
			});
		},
		updatePush() {
			updatePush({ uid: this.uid, status: 1 }).then((res) => {});
		},
		//自动聊天
		sendChatWith() {
			if (!this.uid) {
				setTimeout(() => {
					this.sendChatWith();
				}, 1000);
				return;
			}
			var content = {
				fromUid: this.getInviteCode,
				toUid: this.uid,
				text: this.getInviteContent,
				type: 'chat'
			};
			console.log(content);
			this.ws.send({
				data: JSON.stringify(content),
				success: () => {
					console.log('首次ws自动成功');
					uni.removeStorageSync('inviteCode');
					uni.removeStorageSync('inviteContent');
				}
			});
		},
		//请求个人信息
		async getuserInfo() {
			let res = await userInfo();
			console.log('请求用户信息');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.uid = res.result.uid;
			//红点
			this.getChatRedDot(res.result.uid);
			// 关注
			this.getUserStatistics();

			this.avatar = res.result.avatar;
			this.myDes = res.result.intro;
			this.username = res.result.username;
			this.silverNum = res.result.silverNum;
			this.silverNo = res.result.silverNo;
			this.inviteContent = res.result.inviteContent;
			this.accrualRecharge = res.result.accrualRecharge;
			uni.setStorageSync('uid', res.result.uid);
			this.updateUid();
			uni.setStorageSync('ava', res.result.avatar);
			this.updateAva();
		},
		//关注/互关/粉丝统计数
		getUserStatistics() {
			getUserStatistics().then((res) => {
				console.log('请求关注/粉丝数');
				console.log(res);
				if (res.code !== 0) {
					uni.$u.toast(res.msg);
					return;
				}

				this.fans = res.result.fans;
				this.follow = res.result.follow;
			});
		},

		//盔甲状态
		getArmourConfig() {
			getArmourConfig().then((res) => {
				console.log('获取当前盔甲状态');
				console.log(res);
				if (res.code !== 0) {
					uni.$u.toast(res.msg);
					return;
				}
				this.armour = res.result.armourStatus === 0 ? false : true;
				uni.setStorageSync('armor', this.armour);
				this.updateArmor();
				let givenDate = new Date(res.result.armourTime);
				let currentDate = new Date();

				var timeDiff = Math.abs(currentDate.getTime() - givenDate.getTime());
				this.armourTime = Math.ceil(timeDiff / (1000 * 3600 * 24));
			});
		},
		//聊天红点
		async getChatRedDot(uid) {
			let res = await redDot({
				uid: uid,
				type: 1,
				t: Date.parse(new Date())
			});
			console.log('请求聊天红点');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			if (res.result) {
				this.chatDot = true;
			} else {
				this.chatDot = false;
			}
		},
		//消息红点
		async getMessRedDot(uid) {
			let res = await redDot({
				uid: uid,
				type: 2,
				t: Date.parse(new Date())
			});
			console.log('请求消息红点');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			if (res.result === true) {
				this.messageDot = true;
			} else {
				this.messageDot = false;
			}
		},
		//请求空间信息
		async getMyRoom() {
			let res = await myRoom();
			console.log('请求空间详细数据');
			console.log(res);
			if (res.code !== 0 && res.code !== 500) {
				uni.$u.toast(res.msg);
				return;
			}
			if (res.code === 500) {
				uni.reLaunch({
					url: '../loginSelect/loginSelect'
				});
			}
			this.notify(res.room.uid);
			//保存房子状态
			uni.setStorageSync('house', true);
			this.updateHouse();
			this.coverImage = res.room.coverImage;
			this.password = res.room.password ? res.room.password : '';
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
			let res = await queryMyPageList({
				page: this.page,
				limit: this.limit
			});
			console.log('请求动态列表');
			console.log(res);
			if (res.code === 500) {
				uni.$u.toast('请先成为房间主人吧！');
				return;
			}
			if (res.code !== 0 && res.code !== 500) {
				uni.$u.toast(res.msg);
				// ** 关闭节流阀
				this.isloading = false;
				return;
			}

			this.myList = [...this.myList, ...res.result.data];
			this.lastPage = res.result.last_page;
			for (var i = 0; i < this.myList.length; i++) {
				let lins = this.myList[i].media[0];
				let zhengze = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
				this.$set(this.myList[i], 'img', zhengze.test(lins));
				this.$set(this.myList[i], 'more', '');
			}
			this.$nextTick(() => {
				let query = uni.createSelectorQuery().in(this);
				//所有title
				query.selectAll('.content-title').boundingClientRect();
				//所有inner
				query.selectAll('.inner').boundingClientRect();
				query.exec((res) => {
					for (var i = 0; i < res[0].length; i++) {
						let linsHeight = res[0][i].height - res[1][i].height;
						if (linsHeight >= 0) {
							this.$set(this.myList[i], 'more', '2');
						} else {
							this.$set(this.myList[i], 'more', '1');
						}
					}
				});
				// ** 关闭节流阀
				this.isloading = false;
			});
		},
		async setTop(i) {
			let res = await postTop({ id: i.id });
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.page = 1;
			this.myList = [];
			this.getMyPageList();
		},
		async unSetTop(i) {
			let res = await cancelPostTop({ id: i.id });
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.page = 1;
			this.myList = [];
			this.getMyPageList();
		},

		toOtherUser(i) {
			if (i.uid === this.uid) {
				uni.switchTab({
					url: '../user/user'
				});
			}
			uni.navigateTo({
				url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + i.uid
			});
		},
		toChatList() {
			this.chatDot = false;
			uni.navigateTo({
				url: '../../pages_userActivity/chatList/chatList'
			});
		},
		toSettings() {
			uni.navigateTo({
				url: '../../pages_userActivity/settings/settings'
			});
		},
		toFansAndFouces() {
			uni.navigateTo({
				url: '../../pages_userActivity/fansAndFouces/fansAndFouces'
			});
		},
		toArticleDes(i) {
			//跳转前定死
			this.refresh = false;
			uni.navigateTo({
				url: '../../pages_userActivity/articleDes/articleDes?i=' + i.id
			});
		},
		toMessage() {
			this.messageDot = false;
			uni.navigateTo({
				url: '../../pages_userActivity/messageList/messageList'
			});
		},
		onShareAppMessage() {
			return {
				title: this.inviteContent,
				path: '/pages_userActivity/erWeiMa/erWeiMa?imagePath=' + this.imagePath + '&&inviteContent=' + this.inviteContent
			};
		},
		toCostMoney() {
			uni.navigateTo({
				url: '../../pages_costMoney/costMoney/costMoney'
			});
		},
		//修改头像
		changeAvatar() {
			this.$refs.cropping.fChooseImg(1, {
				selWidth: '600upx',
				selHeight: '600upx',
				inner: true
			});
		},
		/**点击上传照片*/
		doUpload(rsp) {
			this.linshiAvatar = rsp.path;
			// 常见的图片返回格式(如base64,blob对象),可提供给后端接口
			uni.uploadFile({
				url: ip + '/app/common/upload',
				filePath: rsp.path,
				name: 'file',
				header: {
					token: uni.getStorageSync('token')
				},
				success: (uploadFileRes) => {
					let paths = JSON.parse(uploadFileRes.data);
					//调用修改图片接口 回传服务器图片
					this.resetAvatar(paths.result[0].url);
				}
			});
		},
		//上传修改后的头像
		async resetAvatar(path) {
			let res = await userInfoEdit({ avatar: path });
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.avatar = this.linshiAvatar;
			uni.setStorageSync('ava', path);
			this.updateAva();
		},
		//修改背景
		changeBg() {
			this.$refs.cropping2.fChooseImg(1, {
				selWidth: '600upx',
				selHeight: '388upx',
				inner: true
			});
		},
		/**点击上传背景*/
		doUpload2(rsp) {
			this.linshiCoverImage = rsp.path;
			uni.uploadFile({
				url: ip + '/app/common/upload',
				filePath: rsp.path,
				name: 'file',
				header: {
					token: uni.getStorageSync('token')
				},
				success: (uploadFileRes) => {
					let paths = JSON.parse(uploadFileRes.data);
					//调用修改图片接口 回传服务器图片
					this.resetCoverImage(paths.result[0].url);
				}
			});
		},
		//生成二维码
		async createQRCode() {
			if (!this.inviteContent) {
				this.inviteContent = '点开二维码，长按二维码大图即可！';
			}
			this.changeMyInviteContent();
			uni.showLoading({
				title: '二维码生成中'
			});

			this.shengcheng = false;
			let res = await getQRCode(
				{
					page: 'pages/loginSelect/loginSelect',
					scene: this.uid.toString(),
					width: 430
				},
				'arraybuffer'
			);

			const fsm = wx.getFileSystemManager();
			const FILE_BASE_NAME = 'qrcode_base64src';
			const filePath = wx.env.USER_DATA_PATH + '/' + FILE_BASE_NAME + '.jpg';
			const _that = this;
			fsm.writeFile({
				filePath,
				data: res,
				encoding: 'binary',
				success() {
					_that.canva = false;
					wx.hideLoading();
					_that.doUpload3(filePath);
				},
				fail() {}
			});
		},
		async changeMyInviteContent() {
			let res = await userInfoEdit({
				inviteContent: this.inviteContent ? this.inviteContent : '点开二维码，长按二维码大图即可'
			});
			if (res.code === 0) {
			} else {
				uni.$u.toast(res.msg);
				this.inviteContent = '';
			}
		},
		doUpload3(rsp) {
			this.linshiImagePath = rsp;
			uni.uploadFile({
				url: ip + '/app/common/upload',
				filePath: rsp,
				name: 'file',
				header: {
					token: uni.getStorageSync('token')
				},
				success: (uploadFileRes) => {
					let paths = JSON.parse(uploadFileRes.data);
					this.imagePath = paths.result[0].url;
				}
			});
		},
		//更新背景
		async resetCoverImage(path) {
			let res = await updateBackGroupImg({ imgUrl: path });
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}

			this.coverImage = this.linshiCoverImage;
		},
		//修改个签
		async changeMyDes(e) {
			let res = await userInfoEdit({ intro: this.myDes });
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				this.myDes = '';
				return;
			}
			uni.$u.toast('修改个人签名成功');
		},
		goSecret() {
			uni.navigateTo({
				url: '../../pages_userActivity/mySecret/mySecret'
			});
		},
		goIntroduce() {
			uni.navigateTo({
				url: '../../pages_userActivity/xIntroduce/xIntroduce'
			});
		},
		//去发布
		toIssue() {
			uni.navigateTo({
				url: '../../pages_userActivity/artcleIssue/artcleIssue'
			});
		},
		//确认密码
		confirmMima() {
			if (this.password === this.inputMima) {
				this.type = 1;
			} else {
				uni.$u.toast('密码输入不正确');
			}
		},
		async getSelectRoom() {
			if (this.searchText === '') {
				return;
			}
			let res = await selectRoom({ key: this.searchText });
			console.log('搜索用户');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.popSearch = true;
			this.peopleList = res.room;
		},
		//更新密码
		async confirmChangeSecret() {
			if (this.oldSecret !== this.password) {
				uni.$u.toast('原密码输入错误');

				return;
			}
			if (this.newSecret !== '' && this.newSecret.length !== 6) {
				uni.$u.toast('密码长度必须设置为6位');
				return;
			}
			let res = await updatePassword({ password: this.newSecret });
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			uni.showToast({
				title: '修改密码成功',
				icon: 'none'
			});
			this.changeSecret = false;
			this.password = this.newSecret;
			this.newSecret = '';
			this.oldSecret = '';
		},
		notify(uid) {
			notify({ uid: uid }).then((res) => {
				console.log('获取弹窗');
				console.log(res);
				if (res.code !== 0) {
					uni.$u.toast(res.msg);
					return;
				}
				this.popContent = res.content ? JSON.parse(res.content.content) : '';
				if (this.popContent) {
					this.popContentBox = true;
				}
			});
		},
		previewImg(i) {
			uni.previewImage({
				current: i[0],
				urls: i
			});
		}
	}
};
</script>

<style lang="less" scoped>
.pages {
	background-color: white;
}
.box-title {
	position: relative;
	width: 750rpx;
	margin-bottom: 12rpx;
	.my-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 480rpx;
	}
	.width-bottom {
		position: relative;
		width: 750rpx;
		height: 480rpx;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		img {
			width: 95rpx;
			height: 94rpx;
			margin: 20rpx;
		}
	}
	.my-info {
		position: relative;
		width: 670rpx;
		margin: 0 auto;
		padding: 14rpx 28rpx;
		.setting {
			position: absolute;
			top: 50rpx;
			right: 10rpx;
			width: 66rpx;
			height: 99rpx;
		}
		.armor-box {
			position: absolute;
			top: 52rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			right: 90rpx;
			font-size: 24rpx;
			line-height: 1.8;
			.armor-img {
				width: 50rpx;
				height: 66rpx;
			}
		}
		.infos-1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.portrait-box {
				position: relative;
				.portrait {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
				}
				.portrait-change {
					position: absolute;
					width: 120rpx;
					text-align: center;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					color: #fff;
					background-color: #448ac6;
					padding: 3rpx;
					border-radius: 25rpx;
				}
			}

			.info {
				flex: 1;
				padding-left: 20rpx;
				.name-kj {
					display: flex;
					align-items: center;
					.name {
						font-size: 44rpx;
						line-height: 2;
					}

					.armor-time {
						color: #918f8f;
					}
				}
				.about {
					display: flex;
					align-items: flex-end;
					width: 308rpx;
					height: 55rpx;
					white-space: nowrap;
					div {
						width: 50%;
					}
				}
			}
		}
		.infos-2 {
			margin-top: 16rpx;
			/deep/.u-textarea {
				padding: 0 !important;
				background-color: transparent !important;
			}
		}
		.cost-start {
			.cost-level {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 16rpx;
				.level-img {
					width: 154rpx;
					height: 40rpx;
				}
				.level-img-says {
					position: absolute;
					top: 0;
					left: 64rpx;
					font-size: 30rpx;
					color: white;
					font-family: 'MyFont1';
				}
				.level-intro {
					display: flex;
					align-items: center;

					.level-start {
						width: 34rpx;
						height: 34rpx;
						margin-left: 6rpx;
					}
				}
				.level-start {
				}
			}
			.cost-step {
				/deep/.u-line-progress {
					border: 2rpx solid #ffbf41;
				}
				/deep/.u-line-progress__line {
					background: linear-gradient(90deg, #ca8b45 0%, #feda7a 100%);
				}
			}
		}
		.infos-3 {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			[class^='contorl'] {
				position: relative;
				width: 144rpx;
				height: 102rpx;
				margin-top: 20rpx;
				img {
					width: 100%;
					height: 100%;
				}
				.mes-dot {
					position: absolute;
					width: 20rpx;
					height: 20rpx;
					background-color: #f56c6c;
					top: 12rpx;
					right: 12rpx;
					border-radius: 50%;
				}
			}
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
			color: #e88800;
		}
	}
	.looks {
		overflow: hidden;
		margin-top: 6rpx;
		.content-des {
			color: #5387ff;
			margin-bottom: 10rpx;
		}
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
			width: 480rpx;
			max-height: 1000rpx;
		}
		video {
			width: 100%;
			height: 460rpx;
		}
	}
	.content-title {
		position: relative;
		font-size: 32rpx;
		font-weight: 400;
		color: #000000;
		line-height: 1.8;
		max-height: 238rpx;
		overflow: hidden !important;
		white-space: pre-line; //遇到回车换行
		word-break: break-word !important; /* break-all(允许在单词内换行。) */
		display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
		-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
		.inner {
			/* display: none; */
			position: 'absolute';
			zindex: -1;
			visibility: 'hidden';
			oveflow: auto;
		}
		.real-inner {
			oveflow: auto;
		}
		.real-more-inner {
			overflow: hidden !important;
			text-overflow: ellipsis !important; /* 超出部分省略号 */
			white-space: pre-line; //遇到回车换行
			word-break: break-word !important; /* break-all(允许在单词内换行。) */
			display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
			-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
			-webkit-line-clamp: 4 !important; /* 显示的行数 */
		}
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
	width: 600rpx;
	// background-color: transparent;
	margin: auto;
	.paipai {
		position: absolute;
		width: 384rpx;
		height: 184rpx;
		top: 250rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		padding-top: 54rpx;
		font-size: 42rpx;
	}
	.mimasuo {
		position: absolute;
		top: 200rpx;
		left: 0;
		width: 100%;
		height: 900rpx;
	}
	/deep/.u-input {
		position: absolute;
		width: 348rpx;
		height: 74rpx;
		top: 720rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.mima-button {
		position: absolute;
		width: 142rpx;
		height: 142rpx;
		top: 858rpx;
		left: 50%;
		transform: translateX(-50%);
	}
}
/deep/.u-fade-enter-active {
	background-color: rgba(255, 255, 255, 0.3) !important;
	backdrop-filter: blur(12rpx);
}
.search {
	width: 750rpx;
	position: fixed;
	bottom: 0upx;
	padding: 20rpx 0 420rpx;
	.search-text {
		background: #fff;
		color: #fd7b41;
		border-radius: 22rpx;
		border: 2rpx solid #fd7b41;
		text-align: center;
		margin: 0 200rpx;
	}
	.search-box {
		width: 600rpx;
		height: 44rpx;
		margin: 10rpx auto;
		/deep/.u-search__content {
			border: 2rpx solid #979797 !important;
		}
		/deep/.u-search__action {
			color: #626262;
			font-size: 36rpx;
		}
	}
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
	border-bottom: 2rpx solid #a6a6a6;
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
.pagebox {
	width: 100%;
	height: 100vh;
	position: absolute;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.6);
}
.newPage {
	position: relative;
	margin: auto;
	width: 680rpx;
	height: 640rpx;
	img {
		width: 100%;
		height: 100%;
	}
	.show-my-name {
		position: absolute;
		width: 100%;
		top: 484rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 60rpx;
		line-height: 1.2;
		text-align: center;
		font-weight: 700;
		color: #fff;
	}
}
/deep/ .u-toast__content__text--default {
	line-height: 1.5 !important;
}
.pop-content-box {
	position: relative;
	width: 602rpx;
	height: 772rpx;
	margin: auto;

	img {
		width: 100%;
		height: 100%;
	}
	.contents {
		position: absolute;
		top: 212rpx;
		left: 60rpx;
		width: 500rpx;
		height: 430rpx;
		font-size: 34rpx;
		color: #383838;
		line-height: 1.4;
		overflow-y: auto;
		white-space: pre-wrap;
		word-wrap: break-word;
	}
	.iknow {
		position: absolute;
		top: 682rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 36rpx;
		color: #fff;
		line-height: 44rpx;
	}
}
.req-friend {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 648rpx;
	height: 850rpx;
	margin: 22% auto;
	justify-content: center;

	img {
		width: 100%;
		height: 100%;
	}
	/deep/.u-textarea {
		white-space: pre;
		position: absolute !important;
		width: 424rpx !important;
		top: 494rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 0 20rpx !important;
		background-color: transparent !important;
	}
	/deep/.u-textarea__field {
		font-size: 36rpx !important;
		color: #694e31 !important;
	}
	.get-erweima {
		position: absolute;
		width: 468rpx;
		height: 66rpx;
		top: 692rpx;
		left: 50%;
		transform: translateX(-50%);
		color: transparent;
	}
}

.my-friend {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 648rpx;
	height: 850rpx;
	margin: 22% auto;
	justify-content: center;
	img {
		width: 100%;
		height: 100%;
	}
	.code_view {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 120rpx;
		margin: 40rpx auto;
		width: 170rpx;
		height: 170rpx;
		border-radius: 50%;
	}
	.invite-content {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 494rpx;
		color: #694e31;
		font-size: 34rpx;
		width: 416rpx;
		word-break: break-all;
	}
	.share-box {
		position: absolute;
		right: 108rpx;
		top: 692rpx;
		width: 200rpx;
		height: 70rpx;
		color: transparent;
		background-color: transparent;
		&::after {
			border: none; //黑色边框去掉了
		}
	}
	.back-to {
		position: absolute;
		left: 108rpx;
		top: 706rpx;
		width: 200rpx;
		height: 70rpx;
		color: transparent;
		background-color: transparent;
	}
}
</style>
