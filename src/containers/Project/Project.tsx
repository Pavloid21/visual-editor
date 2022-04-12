import React from 'react';
import styled from 'styled-components';
import {useKeycloak} from '@react-keycloak/web';
import {ButtonSelector} from 'components';
import {v4} from 'uuid';
import {Button} from 'components/controls';
import {ReactComponent as Plus} from '../../assets/button_plus.svg';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 48px 36px;
  flex-direction: column;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const H1 = styled.h1`
  font-size: 40px;
`;

const P = styled.p`
  color: var(--neo-secondary-gray);
`;

const Header = styled.div`
  background-color: #f3f3f3;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  & > section {
    margin-bottom: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;
  background: #fafafa;
  box-shadow: inset 0px -1px 4px rgba(0, 0, 0, 0.3);
`;

export const Project: React.FC<any> = () => {
  const {keycloak} = useKeycloak();
  const {name, preferred_username} = keycloak.idTokenParsed!;
  return (
    <Container>
      <H1>Welcome, {name || preferred_username}!</H1>
      <P>You are on the main page where you can create a new project or modify an already created one. </P>
      <div>
        <Header>
          <ButtonSelector
            buttons={[
              {title: 'My Projects', key: 'own', uuid: v4()},
              {title: 'Team Projects', key: 'team', uuid: v4()},
            ]}
            onChange={function (button: string): void {
              throw new Error('Function not implemented.');
            }}
            value={'own'}
          ></ButtonSelector>
          <Button>
            <Plus />
            Create New Project
          </Button>
        </Header>
        <Content></Content>
      </div>
    </Container>
  );
};
