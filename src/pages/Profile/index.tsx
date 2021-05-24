import React, { useEffect, useState } from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { getUser, putUser } from '../../services'
import WarnMsg from '../../components/WarnMsg'

const Profile: React.FC = () => {
	//表单数据
	const [github, setGithub] = useState<string>('')
	const [website, setWebsite] = useState<string>('')
	const [about, setAbout] = useState<string>('')

	//状态
	const [warnState, setWarnState] = useState<boolean>(false)
	//提示
	const [warnContent, setWarnContent] = useState<string>('')

	const history = useHistory()

	const printValues = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		const fetchData = async () => {
			let res = await putUser(github, website, about)
			console.log(res)
			if (res?.success) {
				if (res.code === 1) {
					setWarnState(true)
					setWarnContent("修改成功")
					history.push('/')
					return
				}
				return
			}
			setWarnState(true)
			setWarnContent('网络错误')
		}
		//异步请求数据
		fetchData()
	}

	useEffect(() => {
		const fetchData = async () => {
			let res = await getUser()
			console.log(res)
			if (res?.success) {
				if (res.code === 1) {
					setGithub(res.data.github)
					setWebsite(res.data.website)
					setAbout(res.data.about)
				}
				return
			}
			setWarnState(true)
			setWarnContent('网络错误')
		}
		fetchData()
	}, [])

	return (
		<div className='flex justify-center h-screen'>
			<div className='flex flex-col justify-center items-center'>
				<div className='flex flex-row items-center py-4'>
					<img className='w-8 mr-1' src={logo} alt='logo' />
					<span className='font-bold text-2xl'>修改个人资料</span>
				</div>
				{warnState && <WarnMsg content={warnContent} />}

				<form className='my-2' onSubmit={printValues}>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>github</label>
						<input
							className='border-2 rounded w-64 p-1'
							type='text'
							name='github'
							value={github || ''}
							onChange={(event) => setGithub(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>website</label>
						<input
							className='border-2 rounded w-64 p-1'
							type='text'
							name='website'
							value={website || ''}
							onChange={(event) => setWebsite(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mb-2'>
						<label className='text-sm mb-1'>关于我</label>
						<textarea
							className='border-2 rounded w-64 p-1'
							name='about'
							value={about || ''}
							onChange={(event) => setAbout(event.target.value)}
						/>
					</div>
					<div className='flex flex-col mt-6'>
						<button className='bg-gray-800 text-white rounded py-1 px-2'>
							完 成
						</button>
					</div>
				</form>
				<div className='my-2'>
					<span className='text-sm'>
						tips: 取消修改？
						<Link to='/'>
							<span className='hover:text-gray-900 hover:underline'>
								返回首页
							</span>
						</Link>{' '}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Profile
