import {
	post,
	get
} from '@/api/api.js'

//历史消息（聊天窗）
export function history(data) {
	return get('/app/chat/history', data)
}
//清空聊天记录
export function cleanHistory(data) {
	return get('/app/chat/cleanHistory', data)
}
//获取备注
export function getRemark(data) {
	return get('/app/userRemark/getRemark', data)
}
