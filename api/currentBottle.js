import {
	post,
	get
} from '@/api/api.js'



// 丢瓶子
export function lostBottle(data) {
	return post('/app/bottle/add', data)
}
// 捡瓶子
export function pickBottle(data) {
	return post('/app/bottleRecord/getOne', data)
}
//查询我丢的瓶子
export function lostHistry(data) {
	return get('/app/bottle/page', data)
}
//查询我捡的瓶子
export function pickHistry(data) {
	return get('/app/bottleRecord/page', data)
}
//删除我丢的瓶子记录
export function delLostBottle(data) {
	return get('/app/bottle/del', data)
}
//删除我捡的瓶子记录
export function delPickBottle(data) {
	return get('/app/bottleRecord/delById', data)
}
//查看瓶子消息详情
export function detailPickBottle(data) {
	return get('/app/bottleRecord/getById', data)
}
//回复瓶子
export function commentBottle(data) {
	return post('/app/bottleRecord/comment', data)
}