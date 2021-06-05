import React from 'react'
// @ts-ignore
import user from '../../assets/user.png'

interface Props {
	isLogin: boolean
}

const MsgBox: React.FC<Props> = (props) => {

	const isLogin = props.isLogin

	return (
		<div className="py-20 chat-box">
			<div className="px-6">
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
				<div className="msg-box flex py-2">
					<img className='w-14 h-14 mr-3' src={user} alt='avatar'/>
					<div className="flex flex-col bg-gray-100 p-3">
						<span className="text-xs">张森 <span className="font-light">2021-12-12 10:12:22</span></span>
						<span>你好傻啊！</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MsgBox
