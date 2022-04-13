import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Dots} from '../../assets/dots.svg';

type TCardProps = {
  id: string;
  name: string;
  description: string;
  icon: string;
  onClick?: () => void;
};

const Container = styled.div`
  width: 422px;
  height: 287px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
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

export const Card: React.FC<TCardProps> = ({name, description, icon, onClick}) => {
  return (
    <Container>
      <div className="card_header">
        <div>{name}</div>
        <Dots onClick={onClick} />
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
