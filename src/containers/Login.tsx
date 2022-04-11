import React, {useCallback} from 'react';
import {AuthContext} from 'auth';
import {Button} from 'components/controls';
import styled from 'styled-components';
import {useLocation, Navigate, Location} from 'react-router-dom';
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
  const location: Location = useLocation();
  const currentLocationState: any = location.state || {
    from: {pathname: '/'},
  };

  const {keycloak} = useKeycloak();

  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  if (keycloak?.authenticated) return <Navigate to={currentLocationState.from as string} />;

  const handleAuthenticate = async () => {
    // auth.tryLoginPopup();
    // // await until authorized
    // const token = await auth.token();
    // console.log('token :>> ', token);
    // setAuthenticated(true);
  };
  return (
    <Container>
      <p>You are not authorized. Log in with your account or create a new one.</p>
      <Button onClick={handleAuthenticate}>Login</Button>
    </Container>
  );
};

export default Login;
