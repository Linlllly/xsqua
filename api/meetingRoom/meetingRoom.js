import {
	post,
	get
} from '@/api/api.js'

// 空间会议室动态列表分页
export function spaceMeetingPage(data) {
	return post('/app/post/spaceMeetingPage', data)
}
