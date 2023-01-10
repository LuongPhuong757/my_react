import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import * as handleStorage from './handle-local-storage'
import LoginContainer from './container/login/login.container';
import './App.css'
import AppChatComponent from './component/app-chat/index.component';
function App() {
  const user = handleStorage.getLocalStorage('user')

  return (
    <>
      <Router>
        <Route path='/' render={() => {
          if (user) {
            return (< Redirect to='/' />)
          } else {
            return (< Redirect to='/login' />)
          }
        }} />
        <Switch>
          <Route path='/message/:slug' render={(props) => {
            return <AppChatComponent {...props} />
          }} />
          <Route exact path='/login' component={LoginContainer} />
          <Route path='/' component={AppChatComponent} />
        </Switch>
      </Router>
    </>
  );
}

export default App;