import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({
  user,
  path,
  redirect,
  component: Component,
  ...restProps
}) {
  return (
    <Route
      {...restProps}
      path={path}
      render={({ location }) => {
        if (user) {
          return <Component />;
        } else if (!user) {
          return <Redirect to={{ pathname: redirect, from: location }} />;
        } else {
          return null;
        }
      }}
    />
  );
}

export default ProtectedRoute;
