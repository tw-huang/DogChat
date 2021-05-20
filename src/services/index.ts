import axios from 'axios'
import { baseUrl } from '../utils/constant'

// 获取头部信息
export async function getHeaderInfo() {
	return axios({
		url: baseUrl + '/api/user/signUp',
		method: 'get',
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err)
		})
}

// 获取消息列表
export async function getMessage(pageNo: number, pageSize: number) {
	return axios({
		url: baseUrl + '/api/message',
		method: 'get',
		params: {
			pageNo: pageNo,
			pageSize: pageSize,
		},
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err)
		})
}
