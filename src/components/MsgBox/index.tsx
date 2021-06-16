import React from 'react'
import user from '../../assets/user.png'

interface Props {
	msgList: Array<MsgItem>
}

interface MsgItem {
	body: string,
	id: number,
	pushTime: string,
	quoteMessage: object,
	quoteMessageId: number,
	user: User
}

interface User {
	id: number,
	about: string,
	avatar: string,
	email: string,
	github: string,
	nickname: string,
	website: string,
}

const MsgBox: React.FC<Props> = (props) => {

	const msgList = props.msgList

	const msgItem = msgList.map((msg: MsgItem) => {
		return (
			<div className="px-6" key={msg.id}>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<div className="flex items-center text-xs">{msg.user?.nickname || ''}<span
							className="font-light pl-2">{msg.pushTime}</span></div>
						<span className="text-xl">{msg.body}</span>
					</div>
				</div>
			</div>
		)
	})
	return (
		<>
			{msgItem}
		</>
	)
}

export default MsgBox
