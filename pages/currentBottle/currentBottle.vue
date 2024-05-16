<template>
	<view v-if="type" class="pages">
		<!-- banner -->
		<div v-if="list1.length" class="banner-box">
			<u-swiper :list="list1" keyName="img" height="220rpx" :interval="5000" :duration="400" :circular="true" @click="goOwnPageOrThirdParty()"></u-swiper>
		</div>
		<div class="clicks">
			<div class="clicks-item" @click="toBottleHistory">
				<u-icon name="../../../../static/bottle-history.png" size="20"></u-icon>
				<div>漂流瓶历史记录</div>
			</div>
			<div class="vertical-line">|</div>
			<div class="clicks-item" @click="toBottleMessageList">
				<u-icon name="../../../../static/bottle-message.png" size="20"></u-icon>
				<div>消息提示</div>
				<div v-if="bottleDot" class="mes-dot"></div>
			</div>
		</div>
		<img class="pick-and-lost" @click="pickBottle()" src="https://www.zairongyifang.com:8080/filePath/app/20241/compressed_c99ab46582.jpg" alt="" />
		<img class="pick-and-lost" @click="toIssue" src="https://www.zairongyifang.com:8080/filePath/app/20244/compressed_b58b2e26b4.png" alt="" />
		<!-- 再捡一次 -->
		<u-popup :show="showPickAgain" :round="20" :closeOnClickOverlay="false" mode="center" :safeAreaInsetBottom="false">
			<div class="pop-borders pop-pick">
				<div class="pick-text">每次捡漂流瓶都须送出10颗星星</div>
				<div class="pop-btn-box">
					<div
						class="pop-oks"
						@click="
							showPickAgain = false;
							second = false;
							pickBottle();
						"
					>
						确定
					</div>
					<div class="pop-cencels" @click="showPickAgain = false">取消</div>
				</div>
			</div>
		</u-popup>
	</view>
	<view v-else>
		<p class="MsoNormal" align="center" style="text-align: center">
			<b>
				<span style="font-family: 等线; font-weight: bold; font-size: 18pt">
					<font face="等线">X自由空间介绍</font>
				</span>
			</b>
		</p>
		<p class="MsoNormal" style="text-indent: 28pt">
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">“X自由空间”的虚拟身份通讯，满足了微信用户对于安全保障，私密交流的特殊需求。以天下人</font>
				<font face="宋体" style="font-weight: bold">“更轻松的安全交流”</font>
				<font face="宋体">
					为目标，让每个微信用户都拥有自己的专属房间为核心，以微信朋友分层管理为基础。微信用户进入空间无需下载，不留存任何个人身份信息，个性化的虚拟房间作为身份，完全以虚拟房间进行交流、展示、表达，提供一键删除双方手机聊天记录、三种情形三种密码设置等功能，可以满足熟人交往和陌生人交流的安全需求。
				</font>
			</span>
		</p>
		<p class="MsoNormal" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">一、</font>
					<font face="宋体">“我的房间”板块功能介绍：</font>
				</span>
			</b>
		</p>
		<p class="p" style="margin-top: 10rpx; margin-bottom: 10rpx">
			<image
				src="https://www.zairongyifang.com:8080/filePath/app/20243/compressed_510d83eb5d.png"
				style="width: 100%"
				mode="widthFix"
				@click="previewImg('https://www.zairongyifang.com:8080/filePath/app/20243/compressed_510d83eb5d.png')"
			></image>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">1、无痕私聊：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">
					点击“私聊“进入私聊列表，通过搜索框输入好友房间号（如：中央金座0000）的关键词或者备注名可以快速找到好友。左拉好友聊天，可以删除聊天框和记录。进入聊天详情页点击房间号可以给好友备注称号；点击右上角删除图标可以删除全部的聊天聊天记录和聊天框，长按聊天记录可以复制或者删除单条聊天记录。如果你兑换了“超级安全盔甲”，那么就可以选择删除双方手机上的聊天记录。切记删除后聊天记录无法恢复，如果删除对话框，请先关注好友，方便删除后快速找到好友！
				</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">2、空间密钥：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">
					新用户设置房间密码，原密码不用填写，新密码处输入，并确认即可；如果已设置密码，想取消密码，在原密码处输入，新密码不用填写。切记当设置了密码后，需要输入正确的房间密码，才能进入“我的房间”进行私聊、发布等操作！
				</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">3、私密档案：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">
					打开“X档案”，初始密码888888，您可以在“X档案”里保存私密的照片、视频、资料、备忘录、个人私密信息等等。切记“X档案”只能在自己手机上输入正确密码才能进入查看，一定要记住密码，一旦密码丢失就找不回来了！保存的照片和视频可以下载到本地。
				</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">4、空间介绍：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">帮助您快速熟悉“X自由空间”的功能及玩法。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">5、随心发布：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">根据您的需求可以选择发布图文或者视频在“随手文字”或者“好玩的手艺”，则会推送在相应的板块被更多用户看到，加速用户了解你，认识你，结交你。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">6、空间搜索：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">可以通过搜索已入住的用户的房间号、个性签名的“连续关键词”，快速找到对方，并于对方建立联系。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">7、邀请微友：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">
					当邀请微信好友进入“X自由空间”时（切记对方之前没进入过空间），输入邀请语生成二维码发给微信好友，微信好友打开分享链接，打开放大二维码，并扫码进入X自由空间，在私聊处就会收到你的邀请语，你的私聊也会有提示，是你发给好友房间的邀请语！
				</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">8、微信通知：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">如果您想要在退出小程序后，在微信页面端可以收到小程序未读消息的提示，那您可以在每次退出小程序时，点击“开启微信通知”。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">9、兑换安全盔甲：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">查看超级安全盔甲拥有的权限，用银子兑换超级盔甲，如果没有银子可以充值1元获得100两银子，再兑换。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">10、设置：</font>
				</span>
			</b>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">a、超级安全盔甲：</font>
				</span>
			</b>
		</p>
		<p class="17" style="text-indent: 26pt">
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">①拥有删除对方手机上聊天记录的权利</font>
			</span>
		</p>
		<p class="17" style="text-indent: 26pt">
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">享有</font>
			</span>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">②是否允许其他用户关注自己的权利</font>
			</span>
		</p>
		<p class="17" style="text-indent: 26pt">
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">③拥有是否允许其他用户私聊的权利：</font>
				a、允许
			</span>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">；</font>
			</span>
			<span style="font-family: 宋体; font-size: 14pt">b、允许其他用户发一条消息，等自己回复后才能开启后续聊天；c、不允许任何人私聊你</span>
		</p>
		<p class="17" style="text-indent: 26pt">
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">④享有是否开启闭关修炼的权利（所有动态内容仅自己可见）</font>
			</span>
		</p>
		<p class="17" style="text-indent: 26pt">
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">⑤拥有拉黑用户的权利，则该用户不可以再与你私聊和关注你等操作；</font>
			</span>
		</p>
		<p class="17" style="text-indent: 26pt">
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">⑥享有取消用户对你的关注的权利。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 26pt">
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">⑦拥有在空间七大领域随意更换房间的权利</font>
			</span>
		</p>
		<p class="17" style="margin-left: 62pt; text-indent: 0pt"></p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">b、联系管家：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">用户遇到不懂得问题，可以联系管家，管家会第一时间给你答疑解惑。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">11、关注/粉丝：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">
					是可以在列表中给到你关注的好友或关注你的朋友进行备注，当在私聊中一键双删的时候，可以快速的根据备注找到ta，并建立新的联系！如果你开通“超级安全盔甲”，那么可以关闭对你的粉丝对你的关注。
				</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">12、星星：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">
					通过购买“超级安全盔甲”获赠得到，获赠的星星可以畅玩“漂流瓶”、“水果拼盘”。可以查看赠送、获赠的记录。星星进度条会随着您的星星数量的增减而变化。
				</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">13、更换背景：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">根据自己的喜好，随意更换背景图案。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">14、更换头像：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">根据自己的喜好，随意更换头像图案。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">15、设置个性签名：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">根据自己的喜好，展示自己的个性。</font>
			</span>
		</p>
		<p class="17" style="text-indent: 28.1pt">
			<b>
				<span style="font-family: 宋体; font-weight: bold; font-size: 14pt">
					<font face="宋体">16、VIP等级：</font>
				</span>
			</b>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">1等级分为白银、黄金、黑金。</font>
			</span>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">白银vip：当用户购买安全盔甲的金额累计达到10元时升一级（购买金额倍数对应升级倍数）;当升到12级后，则荣升黄金VIP。</font>
			</span>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">黄金vip：当用户购买安全盔甲的金额累计达到100元时升一级（购买金额倍数对应升级倍数）;当升到12级后，则荣升黄金VIP。</font>
			</span>
			<span style="font-family: 宋体; font-size: 14pt">
				<font face="宋体">黑金VIp：当用户购买安全盔甲的金额累计达到1000元时升一级（购买金额倍数对应升级倍数）;当升到12级后，则荣升终身VIP</font>
			</span>
		</p>
	</view>
</template>

<script>
import { pickBottle, todayCount, showBotleMode } from '@/api/currentBottle.js';
import { banner } from '@/api/index.js';
import { redDot } from '@/api/user.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

const app = getApp();

export default {
	data() {
		return {
			bottleDot: false,
			list1: [],
			showPickAgain: false,
			second: false,
			type: false,
			ws: '',
			//关闭ws的侦听
			close: false
		};
	},
	computed: {
		...mapState(['uid'])
	},
	watch: {
		myWs: {
			immediate: true,
			handler(news, olds) {
				console.log('bottle开启侦听');
				this.close = false;
				this.ws = app.globalData.ws;
				this.ws.onMessage((res) => {
					if (!this.close) {
						console.log(res);
						if (res.data === 'active') {
							return;
						}
						let data = JSON.parse(res.data);
						console.log(data);
						if (data.type === 'bottle') {
							this.bottleDot = true;
						}
					}
				});
			}
		}
	},
	onLoad() {
		this.getShowBotleMode();
		this.getBanner();
		this.gettBottleRedDot();
	},
	onUnload() {
		this.close = true;
	},
	onShow() {
		this.getTodayCount();
	},
	methods: {
		async getShowBotleMode() {
			let res = await showBotleMode();
			console.log('展示');
			console.log(res);
			this.type = res;
		},
		async getBanner() {
			let res = await banner({ type: 3 });
			console.log('请求banner图');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.list1 = res.result;
		},
		async getTodayCount() {
			let res = await todayCount();
			console.log('请求今日捡瓶子数量');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.second = res.result === 1 ? true : false;
		},
		async pickBottle() {
			if (this.second) {
				this.showPickAgain = true;
				return;
			}
			let res = await pickBottle();
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			let id = res.result.bottleRecordId;
			this.getTodayCount();
			uni.navigateTo({
				url: '../../pages_userActivity/bottleDetail/bottleDetail?i=' + id + '&&type=1'
			});
		},
		async gettBottleRedDot() {
			let res = await redDot({
				uid: this.uid,
				type: 3,
				t: Date.parse(new Date())
			});
			console.log('请求瓶子红点');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}

			this.bottleDot = res.result;
		},
		toIssue() {
			uni.navigateTo({
				url: '../../pages_userActivity/artcleIssue/artcleIssue?secret=2'
			});
		},
		toBottleHistory() {
			uni.navigateTo({
				url: '../../pages_userActivity/bottleHistory/bottleHistory'
			});
		},
		toBottleMessageList() {
			this.bottleDot = false;
			uni.navigateTo({
				url: '../../pages_userActivity/bottleMessageList/bottleMessageList'
			});
		},
		goOwnPageOrThirdParty(index) {
			if (this.list1[index].linkType === 1) {
				wx.navigateToMiniProgram({
					appId: this.list1[index].appId,
					path: this.list1[index].url,
					envVersion: 'release',
					success(res) {
						console.log('跳转小程序成功！', res);
					}
				});
			} else if (this.list1[index].linkType === 0) {
				// if (this.list1[index].url === '../pages/user/user') {
				// 	uni.switchTab({
				// 		url: this.list1[index].url
				// 	});
				// } else {
				uni.navigateTo({
					url: this.list1[index].url
				});
				// }
			} else {
				return;
			}
		}
	}
};
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
.clicks {
	display: flex;
	justify-content: space-between;
	box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
	padding: 20rpx 0;
	margin-bottom: 22rpx;
	.vertical-line {
		color: #b7b7b7;
	}
	.clicks-item {
		position: relative;
		flex: 1;
		display: flex;
		justify-content: center;
		.mes-dot {
			position: absolute;
			width: 20rpx;
			height: 20rpx;
			background-color: #f56c6c;
			top: -6rpx;
			left: 140rpx;
			border-radius: 50%;
		}
	}
}
.pick-and-lost {
	width: 648rpx;
	height: 520rpx;
	background-color: #f56c6c;
	margin: 0 auto 22rpx;
}
.pop-pick {
	width: 629rpx;
	height: 230rpx;
	.pick-text {
		text-align: center;
		margin: 40rpx;
	}
}
</style>