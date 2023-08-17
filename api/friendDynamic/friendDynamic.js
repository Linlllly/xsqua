import {
	post,
	get
} from '@/api/api.js'

// 关注用户动态列表分页
export function followUserPost(data) {
	return post('/app/post/followUserPost', data)
}
