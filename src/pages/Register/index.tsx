import React from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Register: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen '>
			<div className='flex flex-row items-center py-8'>
				<img className='w-8' src={logo} alt='logo' />
				<span>欢迎注册DogChat</span>
			</div>
			<div className='flex flex-col'>
				<div>
					<label className='text-sm'>昵称</label>
					<input type='text' placeholder='昵称' name='nickname' />
				</div>
				<div>
					<label className='text-sm'>邮箱</label>
					<input type='text' placeholder='邮箱' name='email' />
				</div>
				<div>
					<label className='text-sm'>密码</label>
					<input type='text' placeholder='密码' name='password' />
				</div>
				<div>
					<label className='text-sm'>重复密码</label>
					<input type='text' placeholder='重复密码' name='password2' />
				</div>
			</div>
			<div>
				<button>注册</button>
			</div>
			<div>
				<span className='text-sm'>
					已有帐号？点击 <Link to='/login'>这里</Link> 登录
				</span>
			</div>
		</div>
	)
}

export default Register
