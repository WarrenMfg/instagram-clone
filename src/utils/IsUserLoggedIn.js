import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function IsUserLoggedIn({
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
      render={() => {
        if (user) {
          return <Redirect to={{ pathname: redirect }} />;
        } else if (!user) {
          return <Component />;
        } else {
          return null;
        }
      }}
    />
  );
}

export default IsUserLoggedIn;
