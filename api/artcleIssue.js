import {
	post,
	get
} from '@/api/api.js'


// 发布动态
export function addPost(data) {
	return post('/app/post/addPost', data)
}
//发布x文件
export function addXFilePost(data) {
	return post('/app/post/addXFilePost', data)
}
//安全验证
export function checkContent(data) {
	return post('/app/post/checkContent', data)
}
