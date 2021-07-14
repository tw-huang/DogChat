import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import MsgBox from '../../components/MsgBox'
import { wsUrl } from '../../utils/constant'
import { getHeaderInfo, getMessage } from '../../services'
import user from '../../assets/user.png'
import './index.style.css'
// @ts-ignore
import { Link } from 'react-router-dom'

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

const Chat: React.FC = () => {
	//是否登录
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const [registerCount, setRegisterCount] = useState<number>(0)
	const [onlineCount, setOnlineCount] = useState<number>(0)
	//输入框值
	const [msgInput, setMsgInput] = useState<string>('')
	const [ws, setWs] = useState(null)
	//消息列表
	const pageNo = useRef(1)
	const [pageSize] = useState<number>(20)
	const [msgList, setMsgList] = useState<Array<MsgItem>>([])
	//是否还有数据
	const [hasMsg, setHasMsg] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState(false)
	const msgBoxRef = useRef(null)

	//获取消息数据时的时间戳
	const dateTime = new Date().getTime().toString()

	// 获取消息列表数据
	const getMsgList = (val: number) => {
		getMessage(dateTime, val, pageSize).then((res) => {
			const { success, code, data } = res
			if (success && code === 1) {
				if (val > data.pages) return setHasMsg(false)
				const newData = data?.records.reverse()
				setMsgList((p) => newData.concat(p))
				// @ts-ignore
				msgBoxRef.current.scrollTop = msgBoxRef.current.offsetHeight
			}
		})
	}

	// 连接socket
	const connectSocket = () => {
		let token = localStorage.getExpire('Token')
		if (token) {
			setIsLogin(true)
			try {
				let ws = new WebSocket(wsUrl + '/api/user/' + token)
				ws.onopen = function () {
					// console.log('ws_onopen')
				}
				ws.onmessage = function (evt) {
					var json = JSON.parse(evt.data)
					if (json.success) {
						if (json.msg === 'ConnectSuccess') {
							// console.log('ConnectSuccess')
							if (json.data) {
								// console.log('Connect -> online')
								setOnlineCount(json.data)
							}
						}
						if (json.msg === 'ConnectClose') {
							// console.log('ConnectClose')
							if (json.data) {
								// console.log('close -> online')
								setOnlineCount(json.data)
							}
						}
						if (json.msg === 'ReceiveMessage') {
							// console.log('ReceiveMessage')
							// console.log(json.data)
							setMsgList((list) => [...list, json.data])
							const msgBoxId = document.getElementById('msgBox')
							if (msgBoxId != null) {
								msgBoxId.scrollTop = msgBoxId.scrollHeight
							}
						}
					}
				}
				ws.onclose = function () {
					// console.log('ws_onclose')
				}
				// @ts-ignore
				setWs(ws)
			} catch (e) {
				console.log(e)
			}
		}
	}

	//获取在线人数和注册人数
	const getHeaderData = async () => {
		// @ts-ignore
		let res = await getHeaderInfo()
		if (res?.success && res.code === 1) {
			setOnlineCount(res.data.onlineCount)
			setRegisterCount(res.data.registerCount)
		}
	}

	//点击发送消息
	const handleMsgSend = () => {
		if (ws != null) {
			const json = {
				body: msgInput,
			}
			// @ts-ignore
			ws.send(JSON.stringify(json))
		}
		setMsgInput('')
	}

	const getScrollData = () => {
		// @ts-ignore
		const scrollTop = msgBoxRef.current.scrollTop
		if (scrollTop === 0 && hasMsg) {
			getMsgList(++pageNo.current)
		}
	}

	useEffect(() => {
		getHeaderData()
		connectSocket()
		getMsgList(1)
		setIsLoading((p) => !p)
	}, [])

	useEffect(() => {
		// @ts-ignore
		msgBoxRef.current?.addEventListener('scroll', getScrollData)
		return () => {
			// @ts-ignore
			msgBoxRef.current?.removeEventListener('scroll', getScrollData)
		}
	}, [hasMsg])

	const handleLogout = () => {
		if (isLogin) {
			localStorage.removeItem('Token')
			setIsLogin(false)
		}
	}

	return (
		<>
			<div className='flex justify-between px-6 w-screen h-12 fixed border-b-2 border-gray-300 '>
				<div className='flex items-center'>
					<img className='w-8 mr-1' src={logo} alt='logo' />
					<span className='pl-3'>DogChat</span>
					<span className='px-3'>
						{onlineCount}/{registerCount}
					</span>
					<Link to='/about'>
						<span className='hover:text-gray-900 hover:underline'>About</span>
					</Link>
				</div>
				<div className='flex items-center'>
					{isLogin ? (
						<>
							<span className='pr-3'>
								<Link to='/profile'>
									<span className='hover:text-gray-900 hover:underline'>
										Profile
									</span>
								</Link>
							</span>
							<span className='hover:text-gray-900 hover:underline' onClick={() => handleLogout()}>Logout</span>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
			{/*信息列表*/}
			<div className='pt-12 pb-20'>
				<div className='msgBox' id='msgBox' ref={msgBoxRef}>
					<MsgBox msgList={msgList} />
				</div>
			</div>
			{/**/}
			<div className='flex items-center px-6 w-screen fixed bottom-0 left-0 h-20 border-t-2 border-gray-300'>
				{isLogin ? (
					<>
						<img className='w-14 mr-3' src={user} alt='avatar' />
						<input
							value={msgInput || ''}
							onChange={(event) => setMsgInput(event.target.value)}
							type='text'
							className='border-2 border-gray-100 w-4/12 h-14 mr-3 px-3'
						/>
						<button
							className='bg-gray-800 text-white rounded py-1 px-2'
							onClick={handleMsgSend}
						>
							发 送
						</button>
					</>
				) : (
					<>
						<div>
							Hello! 请先
							<Link to='/login'>
								<span className='hover:text-gray-900 hover:underline'>
									{' '}
									登录{' '}
								</span>
							</Link>
							或者
							<Link to='/register'>
								<span className='hover:text-gray-900 hover:underline'>
									{' '}
									注册{' '}
								</span>
							</Link>
							帐号，再来愉快的聊天吧~
						</div>
					</>
				)}
			</div>
		</>
	)
}

export default Chat
