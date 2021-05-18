import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Main from './components/Main';
import Profile from './components/Profile';

function App() {
  const token = window.localStorage.getItem('token')

  useEffect(() => {
    fetch('/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }, [])

  const isAuth = useSelector(store => store?.isAuth)
  
  return (

      <Router>
        <Switch>
          <Route exact path="/">
            <Main /> 
          </Route>
          <Route path="/profile">
          {isAuth === true ? <Profile/> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>

  );
}

export default App;
