import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Login from './components/Login';
import OrderLotMain from './components/OrderLotMain';

const Grid = styled.div`
  display: grid;
  grid-gap: 7px;
  grid-template-columns: 1fr 600px 1fr;
  grid-template-rows: repeat(10, 50px);
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch('api/auth/verify/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setAuth(true);
        } else {
          throw new Error('No valid token!');
        }
      } catch {
        setAuth(false);
      }
    };

    void verify();
  }, [token]);

  return (
    <Grid>
      <Router>
        <Switch>
          <Route
            exact
            path="/order"
            render={(props) =>
              isAuthenticated ? <OrderLotMain {...props} token={token} /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} setToken={setToken} />
              ) : (
                <Redirect to="/order" />
              )
            }
          />
        </Switch>
      </Router>
    </Grid>
  );
}

export default App;
