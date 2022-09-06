import styled from 'styled-components';

export const Container = styled.div`
  min-width: 422px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--neo-gray);
  height: calc(100vh - 60px);
  & > div {
    height: 100%;
  }
  @media (max-width: 1500px) {
    min-width: 300px;
  }
`;

export const APIContainer = styled.div`
  padding: 16px;
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 8px;
  }
`;

export const RowContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 17px;
  & > svg {
    align-self: end;
    margin-bottom: 10px;
  }
  & input {
    max-width: 160px;
  }
`;

export const APIRow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
