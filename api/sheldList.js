import {
	post,
	get
} from '@/api/api.js'
//黑名单列表
export function blackList(data) {
	return get('/app/black/page', data)
}
// 加入列表
export function add(data) {
	return get('/app/black/add', data)
}
// 移出列表
export function del(data) {
	return get('/app/black/del', data)
}
// 移除粉丝
export function delFollow(data) {
	return post('/app/user/delFollow', data)
}
