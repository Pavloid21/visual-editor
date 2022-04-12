import React from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from './AuthContext';
import {useKeycloak} from '@react-keycloak/web';

const RequireAuth = (props: any) => {
  const {keycloak} = useKeycloak();

  if (!keycloak.authenticated || keycloak.isTokenExpired()) {
    return <Navigate to="/login" />;
  }

  return props.children;
};

export default RequireAuth;
