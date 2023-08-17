import {
	post,
	get
} from '@/api/api.js'

// 登录
export function miniWxlogin(data) {
	return post('/app/user/miniWxlogin', data)
}
// 获取有没有房子
export function myRoom() {
	return get('/app/topic/myRoom')
}
//搜索用户房间
export function selectRoom(data) {
	return get('/app/topic/selectRoom', data)
}
