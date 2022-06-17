import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Dots} from 'assets/dots.svg';
import Dropdown, {ReactDropdownProps} from 'react-dropdown';
import 'react-dropdown/style.css';
import {deleteProject} from 'services/ApiService';
import {useOutside} from 'utils/hooks';

type TCardProps = {
  id: string;
  name: string;
  description: string;
  icon: string;
  onClick?: (event: React.MouseEvent) => void;
  onDelete: (id: string) => void;
};

const DropdownIcon = styled(Dropdown)<ReactDropdownProps>`
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

const Container = styled.div`
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

export const Card: React.FC<TCardProps> = ({name, description, icon, onClick, onDelete, id}) => {
  const handleChangeDropdown = (id: string) => {
    deleteProject(id);
    onDelete(id);
  };
  const {ref, isShow} = useOutside(false, true);

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        if (!isShow) {
          onClick!(e);
        }
      }}
    >
      <div className="card_header">
        <div>{name}</div>
        <div ref={ref}>
          <DropdownIcon
            options={['Delete']}
            placeholder=" "
            arrowClosed={<Dots />}
            arrowOpen={<Dots />}
            onChange={() => handleChangeDropdown(id)}
          />
        </div>
      </div>
      <div className="card_body">
        <img src={icon} alt="proj_icon" />
        <div className="card_body_description">{description}</div>
      </div>
      <hr />
      <div className="card_footer">
        <div className="platform_tags">
          <span>iOS</span>
          <span>Aurora</span>
          <span>Android</span>
        </div>
        <div>
          <div>Date of create:</div>
          <div>Date of last edit:</div>
        </div>
      </div>
    </Container>
  );
};
