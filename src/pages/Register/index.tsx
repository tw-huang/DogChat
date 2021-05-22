import React from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Register: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='flex flex-row items-center py-4'>
				<img className='w-8 mx-2' src={logo} alt='logo' />
				<span className="font-bold text-xl" >欢迎注册DogChat</span>
			</div>
			<div className="my-2">
				<div className='flex flex-col mb-2'>
					<label className='text-sm mb-1'>昵称</label>
					<input className="border-2 rounded" type='text'  name='nickname' />
				</div>
				<div className='flex flex-col mb-2'>
					<label className='text-sm mb-1'>邮箱</label>
					<input className="border-2 rounded" type='text' name='email' />
				</div>
				<div className='flex flex-col mb-2'>
					<label className='text-sm mb-1'>密码</label>
					<input className="border-2 rounded" type='text' name='password' />
				</div>
				<div className='flex flex-col mb-2'>
					<label className='text-sm mb-1'>重复密码</label>
					<input className="border-2 rounded" type='text' name='password2' />
				</div>
			</div>
			<div className="my-2">
				<button className="bg-gray-800 text-white rounded p-1">注 册</button>
			</div>
			<div className="my-2">
				<span className='text-sm'>
					已有帐号？点击 <Link to='/login'><span className="hover:text-gray-900 hover:underline">这里</span></Link> 登录
				</span>
			</div>
		</div>
	)
}

export default Register
