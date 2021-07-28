import axios from 'axios'
import { baseUrl } from '../utils/constant'

// 注册接口
export async function signUp(
	nickname: string,
	email: string,
	password: string
) {
	return axios({
		url: baseUrl + '/api/signUp',
		method: 'post',
		data: {
			nickname: nickname,
			email: email,
			password: password
		},
		headers: { 'Content-Type': 'application/json' }
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err)
		})
}

// 登录接口
export async function signIn(email: string, password: string) {
	return axios({
		url: baseUrl + '/api/signIn',
		method: 'post',
		data: {
			email: email,
			password: password
		},
		headers: { 'Content-Type': 'application/json' }
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err)
		})
}

// 获取用户信息
export async function getUser() {
	return axios({
		url: baseUrl + '/api/user',
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			'Token': localStorage.getExpire('Token')
		}
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err)
		})
}

// 修改用户信息
export async function putUser(github: string, website: string, about: string) {
	return axios({
		url: baseUrl + '/api/user',
		method: 'put',
		data: {
			github: github,
			website: website,
			about: about
		},
		headers: {
			'Content-Type': 'application/json',
			'Token': localStorage.getExpire('Token')
		}
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err)
		})
}

// 获取头部信息
export async function getHeaderInfo() {
	return axios({
		url: baseUrl + '/api/signUp',
		method: 'get'
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err)
		})
}

// 获取消息列表
export async function getMessage(dateTime: string, pageNo: number, pageSize: number) {
	return axios({
		url: baseUrl + '/api/message',
		method: 'get',
		params: {
			dateTime: dateTime,
			pageNo: pageNo,
			pageSize: pageSize
		}
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err)
		})
}
