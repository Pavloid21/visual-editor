import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as IPhone } from "./iPhone_X.svg";

const Wrapper = styled.div``;

const IphoneX = (props) => {
  const topAppBar = useSelector((state) => state.layout.topAppBar);
  return (
    <>
      <Wrapper>
        <div
          style={{
            position: "absolute",
            width: "428px",
            height: "836px",
            borderRadius: "37px",
            overflow: "hidden",
            padding: "56px 26px 0px",
            backgroundColor: topAppBar
              ? topAppBar.blockId.backgroundColor
              : "rgb(255, 255, 255)",
            clipPath: "url(#maskRect1)",
          }}
        >
          {props.children}
        </div>
      </Wrapper>
      <IPhone />
    </>
  );
};

export default IphoneX;
