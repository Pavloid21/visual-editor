import React from 'react';
import {SideBar} from 'store/types';
import styled from 'styled-components';

export const Bar = styled.div<{barState: SideBar}>`
  height: 60px;
  background: var(--background);
  position: absolute;
  left: 0;
  right: 0;
  margin-left: ${(props) => (props.barState.left ? '457px' : '0px')};
  margin-right: ${(props) => (props.barState.right ? '422px' : '0px')};
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .mode_selector {
    gap: 16px;
    margin-left: auto;
    display: flex;
  }
  @media (max-width: 1500px) {
    margin-left: ${(props) => (props.barState.left ? '335px' : '0px')};
    margin-right: ${(props) => (props.barState.right ? '300px' : '0px')};
  }
`;

export const ServiceBar = React.memo(styled.div<{barState: SideBar}>`
  height: 42px;
  background: var(--background);
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0 25px;
  margin-left: ${(props) => (props.barState?.left ? '421px' : '0px')};
  margin-right: ${(props) => (props.barState?.right ? '422px' : '0px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .mode_selector {
    gap: 16px;
    display: flex;
  }
  @media (max-width: 1500px) {
    margin-left: ${(props) => (props.barState.left ? '299px' : '0px')};
    margin-right: ${(props) => (props.barState.right ? '300px' : '0px')};
  }
`);

export const Container = styled.div<{backgroundColor: string}>`
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  position: relative;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    overflow-y: auto;
  }
  & > :first-child {
    overflow: initial;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
