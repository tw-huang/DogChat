import React from 'react'

interface Props {
	isLogin: boolean
}

const Footer: React.FC<Props> = (props) => {
	const isLogin = props.isLogin
	return (
		<div className='sticky bottom-0'>
			<hr />
			<div>{isLogin ? 'login' : 'noLogin'}</div>
		</div>
	)
}

export default Footer
