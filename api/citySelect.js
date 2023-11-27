import {
	post,
	get
} from '@/api/api.js'


// 子场地列表
export function list(query) {
	return get('/app/topic/list', query)
}
