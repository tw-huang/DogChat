import React from 'react'

interface Props {
	msgList: Array<object>
}

const Content: React.FC<Props> = (props) => {
	var msgList = props.msgList

	// @ts-ignore
	const list = msgList.map((item) => <li key={item.id}>{item.body}</li>)

	return (
		<div className="my-2">
			content:
			<span>list:</span>
			{list}
			<hr />
		</div>
	)
}

export default Content
