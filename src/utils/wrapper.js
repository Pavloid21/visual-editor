import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 4px;
  border: 1px dashed var(--main-color);
  display: grid;
  align-items: ${(props) =>
    props.wrapContent === "WRAPCONTENTHEIGHT" ? "start" : "stretch"};
  ${(props) =>
    props.wrapContent === "WRAPCONTENTHEIGHT" ? "align-self: start" : ""};
  overflow-y: auto;
`;

export default Wrapper;
