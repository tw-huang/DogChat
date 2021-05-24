import React, { useEffect, useState } from 'react'
import ChatBox from '../../components/ChatBox'

const Chat: React.FC = () => {
	//是否登录
	const [isLogin, setIsLogin] = useState<boolean>(false)

	useEffect(() => {
		let expire = localStorage.getExpire('Token')
		if (expire) {
			setIsLogin(true)
		}
	}, [])

	return (
		<div>
			<h1>chat page</h1>
			<ChatBox isLogin={isLogin} />
		</div>
	)
}

export default Chat
