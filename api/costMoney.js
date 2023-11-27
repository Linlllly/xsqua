import {
	post,
	get
} from '@/api/api.js'
// 账户变更记录列表
export function list(data) {
	return get('/app/account/list', data)
}
//兑换（鲜花/便便）
export function exchange(data) {
	return post('/app/account/exchange', data)
}
// 银两充值（返回支付的请求参数）
export function buy(data) {
	return get('/app/pay/buy', data)
}
//
