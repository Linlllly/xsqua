import {
	post,
	get
} from '@/api/api.js'


// 登录
export function phoneLogin(data) {
	return post('/app/user/phoneLogin', data)
}
