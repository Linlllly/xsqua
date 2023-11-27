import {
	post,
	get
} from '@/api/api.js'

//确定绑定场地
export function bind(query) {
	return get('/app/topic/bind', query)
}
//更换场地（动态同步迁移）
export function fchange(query) {
	return get('/app/topic/change', query)
}
