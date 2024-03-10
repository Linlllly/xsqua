<script>
var ws = require('@/utils/webSocket.js')
// import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			globalData: {
				ws: {} // ws 实例
			}
		}
	},
	//---------生命周期
	onLaunch: function () {},
	onLoad: function () {},
	onShow: function () {
		// 小程序自动更新
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function () {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function (res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function () {
						// 新的版本下载失败
						wx.showModal({
							title: '已经有新版本了哟~',
							content:
								'新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
						})
					})
				}
			})
		} else {
			wx.showModal({
				title: '提示',
				content:
					'当前微信版本过低，可能无法使用某些功能，请升级到最新微信版本后重试。'
			})
		}
		//
		this.lookAllNetwork()
	},
	onHide: function () {},
	onUnload: function () {},
	methods: {
		//监听网络
		lookAllNetwork() {
			uni.onNetworkStatusChange((res) => {
				console.log(res)
				if (!res.isConnected) {
					uni.showToast({
						title: '网络断开！'
					})
				} else {
					// console.log('有网');
					uni.showLoading({
						title: '网络重启中！'
					})
					this.updateWs()
					uni.hideLoading()
				}
			})
		},
		updateWs() {
			if (this.globalData.ws) {
				//ws更新

				ws.init(1)
			} else {
				// ws初始化

				ws.init()
			}
			//监听断开时间，网咯断开，ws 断开都会执行这个回调
			ws.on('onOpen', () => {
				this.globalData.ws = ws.ws
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/uni_modules/uview-ui/index.scss';
/*  #ifdef  H5  */
body {
	max-width: 560px; //最大宽度自己可以调整
	margin: auto !important;
}
/*  #endif  */
/*每个页面公共css */
page {
	width: 100vm;
	min-height: 100%;
	display: flex;
	font-size: 28rpx;
	background-color: #fff;
	box-sizing: border-box;
}
.container {
	width: 750rpx;
	padding: 20rpx;
	padding-bottom: 0 !important;
}
.pages {
	width: 750rpx;
	position: relative;
}
.box {
	width: 100%;
}
</style>