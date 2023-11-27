import {
	post,
	get
} from '@/api/api.js'

// 消息提醒（关注、评论、点赞）
export function message(data) {
	return get('/app/chat/message', data)
}
