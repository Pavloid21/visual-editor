import styled from 'styled-components';

export const Container = styled.div`
  width: 36px;
  background: #F3F3F3;
  & > div {
    border-bottom: 1px solid #B3B3B3;
    border-top: 1px solid #F3F3F3;
  }
  & > div:first-child {
    border-top: 1px solid #B3B3B3;
  }
  & > div.active {
    border-bottom: 1px solid #F3F3F3;
    border-top: 1px solid #F3F3F3;
    background: #ffffff;
  }
  & > div.borderNone {
    border-bottom: 1px solid #F3F3F3;
  }
  & > div:hover {
    background: #ffffff;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
`;
