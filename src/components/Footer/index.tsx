import React from 'react'

interface Props {
	isLogin: boolean
}

const Footer: React.FC<Props> = (props) => {
	const isLogin = props.isLogin

	return (
		<div>
			<div>{isLogin ? 'login' : 'noLogin'}</div>
		</div>
	)
}

export default Footer