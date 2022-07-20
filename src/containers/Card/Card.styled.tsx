import styled from 'styled-components';
import Dropdown, {ReactDropdownProps} from 'react-dropdown';

export const DropdownIcon = styled<any>(Dropdown)<ReactDropdownProps>`
  & > .Dropdown-control {
    padding: 0;
    background-color: transparent;
    border: none;
  }
  & > .Dropdown-menu {
    width: auto;
    right: 0;
    border-radius: 4px;
  }
`;

export const Container = styled.div`
  width: 422px;
  height: 287px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  & > hr {
    margin: 0;
  }
  & > .card_header {
    & > div {
      font-weight: 500;
      font-size: 30px;
      line-height: 20px;
      color: #ffffff;
    }
    & > svg:hover {
      cursor: pointer;
    }
    background: var(--neo-secondary-gray);
    padding: 16px 6px 16px 20px;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & > .card_body {
    display: flex;
    padding: 13px 10px;
    gap: 9px;
    & > img {
      width: 100px;
      height: 100px;
      min-width: 100px;
      border-radius: 4px;
      background: #c4c4c4;
      object-fit: contain;
      object-position: center;
    }
  }
  & > .card_footer {
    padding: 13px 18px;
    & > .platform_tags {
      display: flex;
      justify-content: center;
      gap: 12px;
      & > span {
        display: inline-block;
        width: 121px;
        text-align: center;
        height: 27px;
        border-radius: 4px;
        border: 1px solid var(--main-color);
      }
    }
  }
`;
