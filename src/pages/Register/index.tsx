import React, { useState } from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'
// @ts-ignore
import { useHistory  } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { signUp } from '../../services'

const WarnMessage: React.FC<{
	content: string
}> = ({ content }) => {
	return (
		<div className='my-2 text-sm text-red-400'>
			<span>{content}</span>
		</div>
	)
}

const Register: React.FC = () => {
	//表单数据
	const [nickname, setNickname] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [password2, setPassword2] = useState<string>('')
	//状态
	const [warnState, setWarnState] = useState<boolean>(false)
	//提示
	const [warnContent, setWarnContent] = useState<string>('')


	const history = useHistory();

	const printValues = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		if (password !== password2) {
			setWarnState(true)
			setWarnContent('两次输入密码不一样')
			return
		}
		const fetchData = async () => {
			let res = await signUp(nickname, email, password)
			console.log(res)
			if (res?.success) {
				if (res.code === 1) {
					history.push("/login")
				}
			}
			setWarnState(true)
			setWarnContent(res.msg)
		}
		//异步请求数据
		fetchData()
	}

	return (
		<div className='flex justify-center h-screen'>
			<div className='flex flex-col justify-center items-center'>
				<div className='flex flex-row items-center py-4'>
					<img className='w-8 mr-1' src={logo} alt='logo' />
					<span className='font-bold text-2xl'>欢迎注册DogChat</span>
				</div>
				{warnState && <WarnMessage content={warnContent} />}

				<form className='my-2' onSubmit={printValues}>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>昵称</label>
						<input
							className='border-2 rounded w-64 p-1'
							type='text'
							name='nickname'
							value={nickname}
							onChange={(event) => setNickname(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>邮箱</label>
						<input
							className='border-2 rounded w-64 p-1'
							type='text'
							name='email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>密码</label>
						<input
							className='border-2 rounded w-64 p-1'
							type='password'
							name='password'
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>重复密码</label>
						<input
							className='border-2 rounded w-64 p-1'
							type='password'
							name='password2'
							value={password2}
							onChange={(event) => setPassword2(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mt-6'>
						<button className='bg-gray-800 text-white rounded py-1 px-2'>
							注 册
						</button>
					</div>
				</form>
				<div className='my-2'>
					<span className='text-sm'>
						tips: 已有帐号？点击{' '}
						<Link to='/login'>
							<span className='hover:text-gray-900 hover:underline'>这里</span>
						</Link>{' '}
						登录
					</span>
				</div>
			</div>
		</div>
	)
}

export default Register
