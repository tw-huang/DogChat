import React from 'react'


interface Props {
	online: number;
	registers: number;
}

const Header:React.FC<Props> = (props) =>{
	return(
		<div>
			header:
			{props.online} - {props.registers}
			<hr/>
		</div>
	)
}

export default Header