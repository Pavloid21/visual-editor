import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 4px;
  border: 1px dashed var(--main-color);
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: ${(props) =>
    props.wrapContent === "WRAPCONTENTHEIGHT" ? "0 1 auto" : ""};
`;

export default Wrapper;
