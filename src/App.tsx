import React from 'react'
// @ts-ignore
import { Route, Switch} from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import './utils/expire'

const App: React.FC = () => {
	return (
		<div className="text-gray-700 bg-white">
			<Switch>
				<Route exact path='/' component={Chat} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/profile' component={Profile} />
			</Switch>
		</div>
	)
}

export default App
