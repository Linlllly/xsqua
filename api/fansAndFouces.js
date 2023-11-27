import {
	post,
	get
} from '@/api/api.js'

// 我的关注分页列表
export function follow(data) {
	return get('/app/user/follow', data)
}
// 我的粉丝分页列表
export function userFans(data) {
	return get('/app/user/userFans', data)
}
// 互相关注分页列表
export function mutualFollow(data) {
	return get('/app/user/mutualFollow', data)
}
//设置修改备注
export function userRemarkEdit(data) {
	return post('/app/userRemark/edit', data)
}
