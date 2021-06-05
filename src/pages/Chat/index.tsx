import React, { useEffect, useState } from 'react'
import ChatBox from '../../components/ChatBox'
import logo from '../../assets/logo.png'
import MsgBox from '../../components/MsgBox'

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
		<>
			<div className="w-screen py-4 bg-yellow-100 fixed">
				<div className="flex justify-between px-6">
					<div className="flex items-center">
						<img className='w-8 mr-1' src={logo} alt='logo'/>
						<span className="pl-3">DogChat</span>
						<span className="px-3">1/66</span>
						<span>About</span>
					</div>
					<div className="flex items-center">
						<span className="pr-3">Profile</span>
						<span>Logout</span>
					</div>
				</div>
			</div>
			<MsgBox isLogin={isLogin}/>
			<ChatBox isLogin={isLogin}/>
		</>
	)
}

export default Chat
