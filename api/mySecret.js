import {
	post,
	get
} from '@/api/api.js'

//设置/修改X文件密码
export function updateXPassword(data) {
	return get('/app/topic/updateXPassword', data)
}

//X文件动态列表
export function queryXFilePageList(data) {
	return post('/app/post/queryXFilePageList', data)
}
