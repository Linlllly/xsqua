var setting = require('./setting.js');
import {
	userInfo
} from '@/api/user.js';

import store from '@/store/index.js'


//请求个人信息
async function getuserInfo() {
	let res = await userInfo();
	if (res.code !== 0) {
		return
	}
	uni.setStorageSync('uid', res.result.uid);
	return res.result.uid
}

module.exports = {
	ws: {}, // 实例
	wsHeartTime: {}, //心脏的时间
	is_log: 0, //记录登录次数
	eventMap: {}, // 事件字典
	closeMyself: false,
	uid: '',
	setWs: false,
	// shouldReconnect:true,
	//对emit传递的数据进行回调（“emit事件名”，回调函数）
	on(event, fn) {
		this.eventMap[event] = fn;
	},
	//触发实例上的事件（“自定义事件名”，数据）
	emit(event, data) {
		this.eventMap[event](data)
	},
	/**
	 * 连接
	 * @param {boolean} count 连接次数
	 * @param {boolean} type 登录类型 user=用户，admin=admin 
	 * @author: lin
	 * @Time: 2022/8/18 13:54
	 */
	async init(n) {
		//判断 如果是更新ws则需要关闭之前的
		if (n === 1) {
			this.closeMyself = true
			wx.closeSocket()
		}
		this.uid = await getuserInfo()
		let that = this;
		let ws = wx.connectSocket({
			url: setting.ws + '/' + that.uid,
			success: e => {}
		})
		//监听连接已打开
		ws.onOpen(data => {
			console.log('onOpen')
			that.emit('onOpen', {})
			//先发送一次心脏
			ws.send({
				data: 'heart'
			});
			that.wsHeart()
			//
			that.setWs = true

		})
		//监听连接错误
		ws.onError((error) => {
			console.log(error)
			that.wsHeart(false);
			setTimeout(() => {
				that.init();
			}, setting.wsDisconnectTime)
		})
		// 监听连接关闭
		ws.onClose((error) => {
			console.log('onClose')
			that.wsHeart(false);
			if (that.closeMyself) {
				that.closeMyself = false
				return
			}
			setTimeout(() => {
				that.init();
			}, setting.wsDisconnectTime)
		})


		//监听服务器发来的消息（有返回active）
		ws.onMessage(data => {
			if (that.setWs) {
				console.log('ws连接成功');
				console.log(that.uid);
				uni.setStorageSync('myWs', Date.parse(
						new Date()) *
					(Math.random() + 1));
				store.commit('updateMyWs')
				that.setWs = false
			}
		})
		that.ws = ws;
	},
	/**
	 * 心跳检测
	 * @param boolean status 登录类型 ture开启心跳  false 关闭心跳 
	 * @author: lin
	 * @Time: 2022/8/18 13:54
	 */
	wsHeart(status = true) {
		let that = this;

		if (status) {
			that.wsHeartTime = setInterval(function() {
				that.ws.send({
					data: 'heart'
				});
			}, setting.wsLikeTime)
		} else {
			clearInterval(that.wsHeartTime);
		}
	},
}
