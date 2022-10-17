import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100% - 44px);
  padding: 9px 19px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  & > .action-item {
    min-height: 36px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
    & > div {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    & > div > svg > * {
      fill: #404040;
    }
    &:hover {
      cursor: pointer;
      background-color: var(--light-orange);
    }
    &.active {
      & > div > svg > * {
        fill: #ffffff;
      }
      color: #ffffff;
      background-color: var(--main-color);
    }
  }
`;

export const FilterActionContainer = styled.div`
  display: flex;
  padding: 0 0 0 16px;

  & div {
    display: flex;
    align-items: center;
    margin: 0 12px 0 0;
  }

  & label {
    font-size: 12px;
    line-height: 16px;
    margin: 0 0 0 10px;
  }
`;

export const ActionImage = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-between;
`;
