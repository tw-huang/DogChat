// //接口地址
// const baseUrl = 'http://localhost:9100'
// //ws地址
// const wsUrl = 'ws://localhost:9100'
//
// //token过期时间（24小时）
// const expireToken = 24 * 60 * 60 * 1000

Storage.prototype.setExpire = (key, value, expire) => {
	let obj = {
		data: value,
		time: Date.now(),
		expire: expire,
	}
	//localStorage 设置的值不能为对象,转为json字符串
	localStorage.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getExpire = (key) => {
	let val = localStorage.getItem(key)
	if (!val) {
		return val
	}
	val = JSON.parse(val)
	if (Date.now() - val.time > val.expire) {
		localStorage.removeItem(key)
		return null
	}
	return val.data
}
