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

const SideBarHeader = (props) => {
  return <Header>{props.title}</Header>;
};

export default SideBarHeader;
