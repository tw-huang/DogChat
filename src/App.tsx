import React from 'react'
// @ts-ignore
import { Route, Switch} from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import About from './pages/About'
import './utils/expire'

const App: React.FC = () => {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={Chat} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/profile' component={Profile} />
				<Route exact path='/about' component={About} />
			</Switch>
		</div>
	)
}

export default App
