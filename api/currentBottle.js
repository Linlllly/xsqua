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
//查询我丢的某个瓶子详情
export function detailLostBottle(data) {
	return get('/app/bottle/getById', data)
}
//查询我捡的瓶子
export function pickHistry(data) {
	return get('/app/bottleRecord/page', data)
}
//查询我捡的某个瓶子详情/别人捡到我的某个瓶子详情
export function detailPickBottle(data) {
	return get('/app/bottleRecord/getById', data)
}
//查询我丢的被别人捡的瓶子的记录
export function otherPickHistry(data) {
	return get('/app/bottleRecord/myPage', data)
}
//删除我丢的瓶子记录
export function delLostBottle(data) {
	return get('/app/bottle/del', data)
}
//删除我捡的瓶子记录
export function delPickBottle(data) {
	return get('/app/bottleRecord/delById', data)
}
//查看他人回复列表
export function bottleRecord(data) {
	return get('/app/bottleRecord/myPage', data)
}
//回复瓶子
export function commentBottle(data) {
	return post('/app/bottleRecord/comment', data)
}
//是今天捡的第几次瓶子
export function todayCount(data) {
	return get('/app/bottleRecord/todayCount', data)
}