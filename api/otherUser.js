import {
	post,
	get
} from '@/api/api.js'

// 进入他人的房间（获取他人空间信息）
export function enterRoom(data) {
	return get('/app/topic/enterRoom', data)
}

//获取他人用户信息
export function getUserInfoById(data) {
	return get('/app/user/getUserInfoById', data)
}

//他人房间-动态列表分页
export function getPostListByCateId(data) {
	return post('/app/post/getPostListByCateId', data)
}

//进马甲用户空间获得银两
export function obtainSliver(data) {
	return get('/app/account/obtainSliver', data)
}
//关注用户
export function addFollow(data) {
	return post('/app/user/addFollow', data)
}
//取消关注用户
export function cancelFollow(data) {
	return post('/app/user/cancelFollow', data)
}
