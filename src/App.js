import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuth from './hooks/useAuth';

import IsUserLoggedIn from './utils/IsUserLoggedIn';
import ProtectedRoute from './utils/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';

function App() {
  const user = useAuth();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              path={ROUTES.LOGIN}
              component={Login}
              redirect={ROUTES.DASHBOARD}
            />
            <IsUserLoggedIn
              user={user}
              path={ROUTES.SIGNUP}
              component={Signup}
              redirect={ROUTES.DASHBOARD}
            />
            <Route path={ROUTES.SIGNUP} component={Signup} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.NOTFOUND} component={NotFound} />
            <ProtectedRoute
              user={user}
              path={ROUTES.DASHBOARD}
              component={Dashboard}
              redirect={ROUTES.LOGIN}
              exact
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
