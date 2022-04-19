import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as ArrowBack} from '../assets/arrow_back.svg';

const Header = styled.div`
  min-height: 60px;
  background-color: var(--background);
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: var(--neo-black);
  padding: 18px 16px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Subheader = styled.div`
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & div {
    display: flex;
    font-size: 16px;
    line-height: 20px;
    gap: 8px;
  }
  & span {
    color: var(--neo-secondary-gray);
    &:hover {
      cursor: pointer;
    }
  }
`;

const SideBarHeader = (props) => {
  const navigate = useNavigate();
  return (
    <Header>
      <ArrowBack className="icon" onClick={() => navigate('/project')} />
      {props.title}
    </Header>
  );
};

export const SideBarSubheader = (props) => {
  return <Subheader>{props.children}</Subheader>;
};

export default SideBarHeader;
