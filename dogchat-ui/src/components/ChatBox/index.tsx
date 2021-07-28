import React from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'
import user from '../../assets/user.png'

interface Props {
	isLogin: boolean
}

const ChatBox: React.FC<Props> = (props) => {
	const isLogin = props.isLogin
	return (
		<div className='w-screen py-4 bg-yellow-100 fixed bottom-0 left-0'>
			<div className="flex items-center px-6">
				{isLogin ? (
					<>
						<img className='w-14 mr-3' src={user} alt='avatar'/>
						<input type="text" className="w-4/12 h-14 mr-3"/>
						<button className="bg-gray-800 text-white rounded py-1 px-2">发 送</button>
					</>
				) : (
					<>
						<div>Hello! 请先
							<Link to='/login'>
								<span className='hover:text-gray-900 hover:underline'> 登录 </span>
							</Link>
							或者
							<Link to='/register'>
								<span className='hover:text-gray-900 hover:underline'> 注册 </span>
							</Link>
							帐号，再来愉快的聊天吧~
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default ChatBox
