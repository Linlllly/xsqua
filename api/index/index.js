import {
	post,
	get
} from '@/api/api.js'


// 鲜花排行榜
export function flowerRank() {
	return get('/app/user/flowerRank')
}
// 元宝排行榜
export function silverRank() {
	return get('/app/user/silverRank')
}
//赠送元宝
export function giveSilver(data) {
	return post('/app/account/giveSilver', data)
}
//赠送鲜花
export function giveFlower(data) {
	return post('/app/account/giveFlower', data)
}
//推荐空间（随机排序）
export function recommend() {
	return get('/app/topic/recommend')
}
//瞧一瞧
export function takeLook(data) {
	return post('/app/post/takeLook', data)
}
//banner
export function banner() {
	return get('/app/link/list')
}
