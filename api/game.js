import {
	post,
	get
} from '@/api/api.js'

// 查询所有奖项
export function prize(data) {
	return get('/app/prize/list', data)
}

// 点击抽奖
export function draw(data) {
	return get('/app/prize/draw', data)
}
//当前用户抽奖记录
export function prizeRecord(data) {
	return get('/app/prizeRecord/page', data)
}
//领奖
export function receive(data) {
	return post('/app/prizeRecord/receive', data)
}
