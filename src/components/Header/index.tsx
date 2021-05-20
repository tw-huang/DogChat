import React from 'react'

interface Props {
	online: number
	registers: number
}

const Header: React.FC<Props> = (props) => {
	return (
		<div className='sticky top-0'>
			header:
			{props.online} - {props.registers}
			<hr />
		</div>
	)
}

export default Header
