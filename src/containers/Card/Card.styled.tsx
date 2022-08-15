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
    box-shadow: 0px 20px 30px -10px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--neo-gray);
  }
  .Dropdown-option {
    color: var(--neo-black);
    font-size: 13px;
    line-height: 20px;
    min-width: 150px;
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

export const Container = styled.div<{isActive?: boolean}>`
  width: 422px;
  height: fit-content;
  box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isActive ? 'var(--main-color)' : 'var(--neo-gray)')};
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  &:hover {
    cursor: pointer;
  }
  & > hr {
    margin: 0 0 24px 0;
    border-top: 1px solid var(--neo-gray);
  }
  .card_body {
    padding: 24px 12px 24px 24px;
    display: flex;
    width: 100%;
    gap: 16px;
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
  .card_body_description {
    padding: 0 24px 24px 24px;
  }
  & > .card_footer {
    padding: 13px 18px;
  }
  .platform_tags {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: var(--neo-secondary-gray);
    margin-bottom: 4px;
  }
  .project_name {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: var(--neo-black);
    margin-bottom: 12px;
    max-width: 219px;
    overflow-wrap: break-word;
  }
  .project_dates {
    font-size: 16px;
    line-height: 20px;
    color: var(--neo-secondary-gray);
  }
`;
