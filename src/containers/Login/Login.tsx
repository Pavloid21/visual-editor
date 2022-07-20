import React, {useCallback} from 'react';
import {Button} from 'components/controls';
import {Navigate} from 'react-router-dom';
import {useKeycloak} from '@react-keycloak/web';
import {Container} from './Login.styled';

const Login: React.FC<any> = () => {
  const currentLocationState: any = {
    from: {pathname: '/project'},
  };

  const {keycloak} = useKeycloak();

  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  if (keycloak?.authenticated) return <Navigate to={currentLocationState.from as string} />;

  return (
    <Container>
      <p>You are not authorized. Log in with your account or create a new one.</p>
      <Button onClick={login}>Login</Button>
    </Container>
  );
};

export default Login;
