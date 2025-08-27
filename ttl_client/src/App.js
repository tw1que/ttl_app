import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'

import Login from './components/Login'
import OrderLotMain from './components/OrderLotMain'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

const Grid = styled.div`
  display: grid;

  grid-gap: 7px;

  grid-template-columns: 1fr 600px 1fr;
  grid-template-rows: repeat(10, 50px);
`
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || "")
  const [keydown, setKeyDown] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  useEffect( () => {

    async function verify () {
        try {
          const response = await fetch('api/auth/verify/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          })
          if (response.ok) {
            setAuth(true)
          } else {
            throw new Error('No valid token!')
          }
          // setAuth(true)
          // console.log(response)
        } catch (error) {
          console.log(`message ${error.message}`)
          setAuth(false)
        }
      }
      verify();
  }, [])
  
  return (
    <Grid>
      <Router>
        <Switch>
          <Route exact path="/order" render={props => isAuthenticated ? <OrderLotMain {...props} setAuth={setAuth} token={token}/> : <Redirect to="/login" />} />
          <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} setToken={setToken}/> : <Redirect to="/order" />} />
        </Switch>
      </Router>
    </Grid>
  );
}

export default App;
