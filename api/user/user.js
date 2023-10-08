import {
	post,
	get
} from '@/api/api.js'


// 获取用户信息
export function userInfo() {
	return get('/app/user/userInfo')
}
// 获取关注/互关/粉丝统计数
export function getUserStatistics() {
	return get('/app/user/getUserStatistics')
}
//修改头像
export function userInfoEdit(data) {
	return post('/app/user/userInfoEdit', data)
}
//修改背景
export function updateBackGroupImg(data) {
	return get('/app/topic/updateBackGroupImg', data)
}
//房间列表
export function queryMyPageList(data) {
	return post('/app/post/queryMyPageList', data)
}
//置顶动态（其他动态自动取消置顶）
export function postTop(data) {
	return get('/app/post/postTop', data)
}
//取消置顶
export function cancelPostTop(data) {
	return get('/app/post/cancelPostTop', data)
}
//点点
export function redDot(data) {
	return get('/app/chat/redDot', data)
}
//获取二维码
export function getQRCode(data, responseType) {
	return post('/app/wechat/getQRCode', data, responseType)
}
//支持订阅
export function pushMessage(data) {
	return post('/app/wechat/pushMessage', data)
}
//修改订阅开关
export function updatePush(data) {
	return post('/app/wechat/updatePush', data)
}
//弹窗
export function notify(data) {
	return get('/app/system/notify', data)
}
