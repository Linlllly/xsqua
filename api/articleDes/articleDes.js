import {
	post,
	get
} from '@/api/api.js'


// 获取文章详情
export function detail(data) {
	return get('/app/post/detail', data)
}
//点赞
export function addCollection(data) {
	return post('/app/post/addCollection', data)
}
//取消点赞
export function cancelCollection(data) {
	return post('/app/post/cancelCollection', data)
}
//评论一级列表
export function getComment(data) {
	return post('/app/post/getComment', data)
}
//评论多级列表
export function getChildrenComment(data) {
	return post('/app/post/getChildrenComment', data)
}
//添加评论
export function addComment(data) {
	return post('/app/post/addComment', data)
}
//删除动态
export function deletePost(data) {
	return post('/app/post/deletePost', data)
}
//赠送鲜花
export function giveEgg(data) {
	return post('/app/account/giveEgg', data)
}
//删除评论
export function deleteComment(data) {
	return post('/app/post/deleteComment', data)
}
