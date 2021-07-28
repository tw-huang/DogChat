import React from 'react'

const WarnMsg: React.FC<{ content: string }> = ({ content }) => {
	return (
		<div className='my-2 text-sm text-red-400'>
			<span>{content}</span>
		</div>
	)
}

export default WarnMsg
