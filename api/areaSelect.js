import {
	post,
	get
} from '@/api/api.js'


// 场地列表
export function list() {
	return get('/app/topic/list')
}
// //确定绑定场地
// export function bind(query) {
// 	return get('/app/topic/bind', query)
// }
