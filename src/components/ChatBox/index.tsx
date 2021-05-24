import React from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'

interface Props {
	isLogin: boolean
}

const ChatBox: React.FC<Props> = (props) => {
	const isLogin = props.isLogin
	return (
		<div className='sticky bottom-0'>
			<hr />
			<div>
				{isLogin ? (
					'login'
				) : (
					<Link to='/login'>
						<span className='hover:text-gray-900 hover:underline'>去登录</span>
					</Link>
				)}
			</div>
		</div>
	)
}

export default ChatBox
