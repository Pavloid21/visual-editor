import styled from 'styled-components';

export const Bar = styled.div`
  height: 60px;
  width: 100%;
  background: var(--background);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  border-bottom: 1px solid var(--neo-gray);
  position: sticky;
  top: 0;
  z-index: 3;

  & > h3 {
    font-weight: 500;
    font-size: 20px;
    align-self: center;
    margin-bottom: 0;
  }
  & > div {
    gap: 16px;
    & > form {
      display: flex;
      gap: 12px;
    }
  }
  &.user {
    color: #ffffff;
    background-color: #333333;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4px;
  }

  & + div {
    padding: 32px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  & > button {
    font-size: 12px;
    line-height: 16px;
    width: 135px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;