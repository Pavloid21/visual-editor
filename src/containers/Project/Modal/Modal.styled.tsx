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
  padding: 10px 24px;

  & button {
    padding: 8px 16px;
  }
`;

export const EditModalTabs = styled.div`
  display: flex;
  padding: 32px 0 0 32px;
  width: 300px;

  & h3 {
    font-weight: 400;
    font-size: 20px;
    align-self: center;
    margin: 0 16px 0 0;
    padding: 0 0 2px 0;
  }

  .tab_active {
    font-weight: 500;
    border-bottom: 2px solid #333333;
  }
`;

export const ContentModal = styled.div`
  padding: 12px 8px 32px 8px;
  height: 560px;
`;
