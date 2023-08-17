import {
	post,
	get
} from '@/api/api.js'

// 注销
export function unBind() {
	return get('/app/topic/unBind')
}
//闭关
export function closeMyRoom() {
	return get('/app/topic/closeMyRoom')
}
//开放
export function openMyRoom() {
	return get('/app/topic/openMyRoom')
}
//改密码
export function updatePassword(data) {
	return get('/app/topic/updatePassword', data)
}
