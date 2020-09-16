import React from 'react'
import Login from './components/Login'
import RestrictedRoute from './components/RestrictedRoute'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { UserDetailsProvider } from './components/state/UserDetails' 
import Home from './components/Home'

const App = () => {
  return(
    <React.Fragment>
      <UserDetailsProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <RestrictedRoute path="/home" component={Home} />
          </Switch>
        </Router>
      </UserDetailsProvider>
    </React.Fragment>
  )
}
 
export default App
