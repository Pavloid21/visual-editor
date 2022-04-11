import React from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from './AuthContext';

const RequireAuth = (props: any) => {
  const {authenticated} = React.useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return props.children;
};

export default RequireAuth;
