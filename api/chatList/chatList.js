import {
	post,
	get
} from '@/api/api.js'

// 聊天列表（聊天对象用户信息+最新一条消息）
export function chatList(data) {
	return get('/app/chat/chatList', data)
}
