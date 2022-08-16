import styled from 'styled-components';

export const Bar = styled.div<{isHidden?: boolean}>`
  height: 60px;
  width: 100%;
  background: var(--background);
  display: ${(props) => (props.isHidden ? 'flex' : 'none')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  top: 0;
  z-index: 3;
  & div {
    display: flex;
    position: relative;
    & div {
      gap: 16px;
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
      &:hover {
        cursor: pointer;
      }
      & > .account_menu {
        position: absolute;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 2px 10px rgba(51, 51, 51, 0.1), 0px 3px 8px rgba(244, 69, 50, 0.15);
        background-color: #ffffff;
        color: var(--neo-black);
        top: 30px;
        right: 0;
        border-radius: 4px;
        min-width: 230px;
        padding: 16px;
      }
    }
  }
`;

export const VerticalDivider = styled.div`
  width: 1px;
  background: #e6e6e6;
  margin: 0 16px;
`;
