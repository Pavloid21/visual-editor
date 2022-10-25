import styled from 'styled-components';
import Dropdown, {ReactDropdownProps} from 'react-dropdown';

export const Container = styled.div`
  height: calc(100% - 44px);
  padding: 9px 19px 83px 19px;
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
    padding-left: 8px ;
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
      & .Dropdown-control svg > * {
        fill: #ffffff;
      }
      & .Dropdown-menu:hover {
        & svg {
          fill: #ffffff;
        }
      }
      color: #ffffff;
      background-color: var(--main-color);
    }
  }
  & > .action-item.active:first-child {
    .Dropdown-menu {
      top: -7px;
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
  }

  & .radio-label {
    padding: 0 0 0 10px;
    margin: 0;
  }
`;

export const ActionImage = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-between;
`;

export const DropdownIcon = styled<any>(Dropdown)<ReactDropdownProps>`
  & > .Dropdown-control {
    padding: 0;
    background-color: transparent;
    border: none;
    width: 15px;
    text-align: center;
  }
  & > .Dropdown-menu {
    width: auto;
    right: 17px;
    top: -47px;
    border-radius: 4px;
    box-shadow: 0px 20px 30px -10px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--neo-gray);
    z-index: 100;
  }
  .Dropdown-option {
    color: var(--neo-black);
    font-size: 13px;
    line-height: 20px;
    min-width: 150px;
    & > div {
      display: flex;
      align-items: center;
      svg {
        margin-right: 8px;
      }
    }
    &.is-selected {
      background-color: var(--main-color);
      color: white;
    }
    &:hover {
      background-color: var(--hover-color);
      color: white;
    }
  }
  .Dropdown-placeholder.is-selected {
    display: none;
  }
`;
