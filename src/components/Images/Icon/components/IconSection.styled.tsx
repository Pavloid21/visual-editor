import styled from 'styled-components';

export const Container = styled.div`
  width: 118px;
  height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  margin: 7px;
  position: relative;
  & > div {
    margin: 10px 0 0 0;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
  & .nameIconItem {
    top: 75px;
    width: 118px;
    word-wrap: break-word;
    text-align: center;
    position: absolute;
  }
`;
