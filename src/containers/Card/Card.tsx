import React from 'react';
import {ReactComponent as Dots} from 'assets/dots.svg';
import 'react-dropdown/style.css';
import {deleteProject} from 'services/ApiService';
import {useOutside} from 'utils';
import {Container, DropdownIcon} from './Card.styled';
import {TCardProps} from './types';

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
