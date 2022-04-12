import React, {useCallback} from 'react';
import {Button} from 'components/controls';
import styled from 'styled-components';
import {Navigate} from 'react-router-dom';
import {useKeycloak} from '@react-keycloak/web';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > p {
    color: var(--neo-secondary-gray);
  }
`;

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
