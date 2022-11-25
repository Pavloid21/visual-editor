import styled from 'styled-components';

export const Container = styled.div`
  margin: 8px auto;

  & .accordionTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    height: 40px;
    background: #FFFFFF;
    border-top: 1px solid #E6E6E6;
    margin-right: 15px;
    & > div {
      font-weight: 500;
    }

    & .arrowList {
      margin: 0 18px 0 18px;
    }
  }

  & .contentWrapper {
    transition: all 0.5s cubic-bezier(0,1,0,1);
    max-height: 0;
    overflow: hidden;

    & .accordionContent {
      @media (max-width: 1500px) {
        width: 283px;
      }
    }
  }

  & .showcontentWrapper {
    height: auto;
    max-height: 9999px;
    transition: all 0.5s cubic-bezier(1,0,1,0);
  }
`;
