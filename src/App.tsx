import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import './utils/index'

const App: React.FC = () => {
	//在线人数
	const [online, setOnline] = useState<number>(0)
	//注册人数
	const [registers, setRegisters] = useState<number>(0)
	// //消息列表
	const [msgList, setMsgList] = useState<Array<object>>([
		{ id: 1, body: 'sss' },
		{ id: 2, body: 'sss' },
		{ id: 3, body: 'sss' },
	])
	//是否登录
	const [isLogin, setIsLogin] = useState<boolean>(false)

	useEffect(() => {
		let expire = localStorage.getExpire('token')
		if (expire) {
			setIsLogin(true)
		}
	},[])

	return (
		<div>
			<Header online={online} registers={registers} />
			<Content msgList={msgList} />
			<Footer isLogin={isLogin} />
		</div>
	)
}

export default App
