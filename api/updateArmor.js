import {
	post,
	get
} from '@/api/api.js'
//获取盔甲配置
export function getArmourConfig(data) {
	return get('/app/user/getArmourConfig', data)
}

// 修改盔甲配置
export function updateArmourConfig(data) {
	return post('/app/user/updateArmourConfig', data)
}
//闭关
export function closeMyRoom() {
	return get('/app/topic/closeMyRoom')
}
//开放
export function openMyRoom() {
	return get('/app/topic/openMyRoom')
}
//兑换记录显示修改type=4
