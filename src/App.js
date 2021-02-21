import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGNUP} component={Signup} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route path={ROUTES.NOTFOUND} component={NotFound} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
          <Route path='*'>
            <Redirect to='/not-found' />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
