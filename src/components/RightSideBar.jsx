import React from "react";
import styled from "styled-components";
import SideBarHeader from "./SideBarHeader";
import Inspector from "../containers/Inspector";
import Screen from "../containers/Screen";
import { useSelector } from "react-redux";

const Container = styled.div`
  min-width: 422px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--neo-gray);
  height: calc(100vh - 60px);
  z-index: 2;
  & > div {
    height: 100%;
  }
`;

const APIContainer = styled.div`
  padding: 16px;
`;

export default function RightSidebar({ children, ...props }) {
  const activeTab = useSelector((state) => state.config.activeTab);
  const selected = useSelector((state) => state.layout.selectedBlockUuid);

  if (!props.display) {
    return null;
  }
  return (
    <Container>
      <div>
        <SideBarHeader title="Properties" />
        <Inspector display />
        {activeTab === 5 && (
          <Screen
            category="screen"
            display={activeTab === 5}
            onPushBlock={() => {}}
            onPushBlockInside={() => {}}
          />
        )}
        {
          selected === "" && (
            <APIContainer>
            </APIContainer>
          )
        }
      </div>
    </Container>
  );
}
