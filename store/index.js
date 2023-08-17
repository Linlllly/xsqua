// 共享数据存储处
// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
	// TODO：挂载 store 模块 （数据/计算属性/修改方法/异步方法）
	state: {
		//数据 从本地拿或者设置默认值
		// userInfo: uni.getStorageSync('userInfo') || {},
		//是否播放音频
		playAudio: uni.getStorageSync('playAudio') || true,
		//是否登录
		token: uni.getStorageSync('token') || '',
		//是否有房子
		house: uni.getStorageSync('house') || false,
		//uid
		uid: uni.getStorageSync('uid') || '',
		ava: uni.getStorageSync('ava') || '',
		times: uni.getStorageSync('times') || '',
		//ws
		myWs: uni.getStorageSync('myWs') || null,
	},
	getters: {},
	mutations: {
		// 更新用户的基本信息
		// updateUserInfo(state) {
		// 	//前台直接调用函传userInfo参数 调用JSON方法会报错
		// 	//uni.setStorageSync('userInfo', JSON.stringify(userInfo)) 
		// 	//前台先uni.setStorageSync('userInfo', userInfo)保存数据 再直接调用该函数
		// 	state.userInfo = uni.getStorageSync('userInfo')
		// },
		//修改播放状态
		updatePlayAudio(state) {
			state.playAudio = uni.getStorageSync('playAudio')
		},
		// 更新有没有房子
		updateHouse(state) {
			state.house = uni.getStorageSync('house')
		},
		//	更新登录状态
		updateToken(state) {
			state.token = uni.getStorageSync('token')
		},
		// 更新用户uid
		updateUid(state) {
			state.uid = uni.getStorageSync('uid')
		},
		// 更新用户头像
		updateAva(state) {
			state.ava = uni.getStorageSync('ava')
		},
		updateTimes(state) {
			state.times = uni.getStorageSync('times')
		},
		//通知页面
		updateMyWs(state) {
			state.myWs = uni.getStorageSync('myWs')
		},
		//登出
		logout(state) {
			uni.removeStorageSync('token');
			uni.removeStorageSync('house');
			uni.removeStorageSync('uid');
			uni.removeStorageSync('ava');
			uni.removeStorageSync('times');
			uni.removeStorageSync('myWs');
		}
	},
	actions: {}
})

// 4. 向外共享 Store 的实例对象
export default store
