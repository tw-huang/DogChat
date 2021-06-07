import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import MsgBox from '../../components/MsgBox'
import { wsUrl } from '../../utils/constant'
import { getHeaderInfo, getMessage } from '../../services'
import user from '../../assets/user.png'
// @ts-ignore
import { Link } from 'react-router-dom'

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

const Chat: React.FC = () => {
	//是否登录
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const [registerCount, setRegisterCount] = useState<number>(0)
	const [onlineCount, setOnlineCount] = useState<number>(0)
	//输入框值
	const [msgInput, setMsgInput] = useState<string>('')
	const [ws, setWs] = useState(null)
	const msgRef = useRef(null)
	//消息列表
	const [pageNo, setPageNo] = useState<number>(1)
	const [pageSize, setPageSize] = useState<number>(20)
	const [msgList, setMsgList] = useState<Array<MsgItem>>([])


	useEffect(() => {

		//获取在线人数和注册人数
		const fetchData = async () => {
			let res = await getHeaderInfo()
			// console.log(res)
			if (res?.success) {
				if (res.code === 1) {
					setOnlineCount(res.data.onlineCount)
					setRegisterCount(res.data.registerCount)
				}
			}
			let resMsg = await getMessage(pageNo, pageSize)
			console.log(resMsg.data.records)
			if (resMsg?.success) {
				if (resMsg.code === 1) {
					setMsgList(resMsg.data.records)
				}
			}
			return
		}
		fetchData()

		let token = localStorage.getExpire('Token')
		if (token) {
			setIsLogin(true)
			try {
				let ws = new WebSocket(wsUrl + '/api/user/' + token)
				ws.onopen = function() {
					console.log('ws_onopen')
				}
				ws.onmessage = function(evt) {
					var json = JSON.parse(evt.data)
					if (json.success) {
						if (json.msg === 'ConnectSuccess') {
							// console.log('ConnectSuccess')
							if (json.data) {
								console.log('Connect -> online')
								setOnlineCount(json.data)
							}
						}
						if (json.msg === 'ConnectClose') {
							console.log('ConnectClose')
							if (json.data) {
								console.log('close -> online')
								setOnlineCount(json.data)
							}
						}
						if (json.msg === 'ReceiveMessage') {
							console.log('ReceiveMessage')
							console.log(json.data)
							setMsgList([...msgList, json.data])
						}
					}

				}
				ws.onclose = function() {
					console.log('ws_onclose')
				}
				// @ts-ignore
				setWs(ws)
			} catch (e) {
				console.log(e)
			}
		}
	}, [])

	//点击发送消息
	const handleMsgSend = () => {
		if (ws != null) {
			const json = {
				body: msgInput
			}
			// @ts-ignore
			ws.send(JSON.stringify(json))
		}
		setMsgInput('')
	}

	// @ts-ignore
	// @ts-ignore
	return (
		<>
			<div className="w-screen py-4 bg-yellow-100 fixed">
				<div className="flex justify-between px-6">
					<div className="flex items-center">
						<img className='w-8 mr-1' src={logo} alt='logo'/>
						<span className="pl-3">DogChat</span>
						<span className="px-3">{onlineCount}/{registerCount}</span>
						<span>About</span>
					</div>
					<div className="flex items-center">
						<span className="pr-3">Profile</span>
						<span>Logout</span>
					</div>
				</div>
			</div>
			<MsgBox msgList={msgList}/>
			{/*<ChatBox isLogin={isLogin}/>*/}
			<div className='w-screen py-4 bg-yellow-100 fixed bottom-0 left-0'>
				<div className="flex items-center px-6">
					{isLogin ? (
						<>
							<img className='w-14 mr-3' src={user} alt='avatar'/>
							<input value={msgInput || ''}
										 ref={msgRef}
										 onChange={(event) => setMsgInput(event.target.value)} type="text"
										 className="w-4/12 h-14 mr-3"/>
							<button className="bg-gray-800 text-white rounded py-1 px-2" onClick={handleMsgSend}>发 送
							</button>
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
		</>
	)
}

export default Chat
