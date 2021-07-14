import React, { useState } from 'react'
import user from '../../assets/user.png'

interface Props {
	msgList: Array<MsgItem>
}

interface MsgItem {
	body: string
	id: number
	pushTime: string
	quoteMessage: object
	quoteMessageId: number
	user: User
}

interface User {
	id: number
	about: string
	avatar: string
	email: string
	github: string
	nickname: string
	website: string
}

const MsgBox: React.FC<Props> = (props) => {
	const [userProfile, setUserProfile] = useState<number>(0)

	const onMouseEnter = (msg: MsgItem) => {
		// console.log(msg.user)
		setUserProfile(msg.id)
	}

	const onMouseLeave = (msg: MsgItem) => {
		// console.log(msg.user)
		setUserProfile(0)
	}

	const msgList = props.msgList

	const msgItem = msgList.map((msg: MsgItem) => {
		return (
			<div className='px-6' key={msg.id}>
				<div className='msg-box flex py-2'>
					<img
						className='w-14 h-14 mr-3'
						src={user}
						alt='avatar'
						onMouseEnter={() => onMouseEnter(msg)}
						onMouseLeave={() => onMouseLeave(msg)}
					/>
					<div className='flex flex-col bg-gray-100 p-3 mr-3'>
						<div className='flex items-center text-xs'>
							{msg.user?.nickname || ''}
							<span className='font-light pl-2'>{msg.pushTime}</span>
						</div>
						<span className='text-xl'>{msg.body}</span>
					</div>
					{userProfile === msg.id ? (
						<>
							<div className='flex flex-col bg-gray-100 p-3'>
								<span>email: {msg.user.email}</span>
								<span>github: {msg.user.github}</span>
								<span>website: {msg.user.website}</span>
							</div>
						</>
					) : (
						<>
							<div className='flex flex-col bg-gray-100 p-3 hidden'>
								<span>email: {msg.user.email}</span>
								<span>github: {msg.user.github}</span>
								<span>website: {msg.user.website}</span>
							</div>
						</>
					)}
				</div>
			</div>
		)
	})
	return <>{msgItem}</>
}

export default MsgBox
