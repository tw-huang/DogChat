import React, { useState } from 'react'
// @ts-ignore
// @ts-ignore
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { signIn } from '../../services'
import WarnMsg from '../../components/WarnMsg'
import { expireToken } from '../../utils/constant'

const Login: React.FC = () => {
	//表单数据
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	//状态
	const [warnState, setWarnState] = useState<boolean>(false)
	//提示
	const [warnContent, setWarnContent] = useState<string>('')

	const history = useHistory()

	const fetchData = async () => {
		let res = await signIn(email, password)
		console.log(res)
		if (res?.success) {
			if (res.code === 1) {
				localStorage.setExpire('Token', res.data.token, expireToken)
				history.push('/')
				return
			}
			setWarnState(true)
			setWarnContent(res?.msg)
			return
		}
		setWarnState(true)
		setWarnContent('网络错误')
	}

	const printValues = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		//表单参数检验
		const regExp =
			/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
		if (email === '' || !regExp.test(email)) {
			setWarnState(true)
			setWarnContent('邮箱不能为空，且输入正确的邮箱格式')
			return
		}
		if (password === '' || password.length < 6 || password.length > 20) {
			setWarnState(true)
			setWarnContent('密码不能为空，且长度必须在6-20位')
			return
		}
		//异步请求数据
		fetchData()
	}

	return (
		<div className='flex justify-center h-screen'>
			<div className='flex flex-col justify-center items-center'>
				<div className='flex flex-row items-center py-4'>
					<img className='w-8 mr-1' src={logo} alt='logo' />
					<span className='font-bold text-2xl'>登录DogChat</span>
				</div>
				{warnState && <WarnMsg content={warnContent} />}

				<form className='my-2' onSubmit={printValues}>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>邮箱</label>
						<input
							className='border-2 rounded w-64 py-1 px-2'
							type='text'
							name='email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>密码</label>
						<input
							className='border-2 rounded w-64 py-1 px-2'
							type='password'
							name='password'
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mt-6'>
						<button className='bg-gray-800 text-white rounded py-1 px-2 hover:bg-gray-900'>
							登 录
						</button>
					</div>
				</form>
				<div className='my-2'>
					<span className='text-sm'>
						tips: 未有帐号？点击
						<Link to='/register'>
							<span className='hover:text-gray-900 hover:underline'>
								{' '}
								这里{' '}
							</span>
						</Link>
						注册
					</span>
				</div>
			</div>
		</div>
	)
}

export default Login
