import React from "react";
import styled from "styled-components";

const Header = styled.div`
  min-height: 60px;
  background-color: var(--background);
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: var(--neo-black);
  padding: 18px 16px;
`;

const Subheader = styled.div`
  height: 44px;
  border-bottom: 1px solid #E6E6E6;
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
  return <Header>{props.title}</Header>;
};

export const SideBarSubheader = (props) => {
  return <Subheader>{props.children}</Subheader>;
};

export default SideBarHeader;
