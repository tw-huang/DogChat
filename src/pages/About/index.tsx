import React from 'react'

const About: React.FC = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<div>
				Hello，DogChat 聊天室是模仿{' '}
				<a
					href='http://catchat.helloflask.com/'
					className='hover:text-gray-900 hover:underline'
				>
					CatChat
				</a>{' '}
				项目而来的。
			</div>
			<div>出发点就是熟悉一下 React + websocket 技术。</div>
			<div>
				ps:{' '}
				<a
					href='https://github.com/tw-huang/dogchat-react'
					className='hover:text-gray-900 hover:underline'
					target="_blank"
				>
					开源地址
				</a>
			</div>
		</div>
	)
}

export default About
