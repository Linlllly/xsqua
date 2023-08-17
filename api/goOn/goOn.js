import {
	post,
	get
} from '@/api/api.js'


// 视频列表
export function list() {
	return get('/admin/ad/list')
}
