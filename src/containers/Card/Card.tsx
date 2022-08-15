import React, {useEffect, useState} from 'react';
import {ReactComponent as Dots} from 'assets/dots.svg';
import 'react-dropdown/style.css';
import {createProject, deleteProject} from 'services/ApiService';
import {useOutside} from 'utils';
import {Container, DropdownIcon} from './Card.styled';
import {TCardProps} from './types';
import logo from 'assets/image_placeholder.png';
import {capitalize} from 'lodash';
import {Option} from 'react-dropdown';
import {Project} from 'store/types';
import {v4} from 'uuid';

export const Card: React.FC<TCardProps> = ({name, description, icon, onClick, onDelete, onChangeState, id, platform}) => {
  const handleChangeDropdown = async (arg: Option, id: string) => {
    switch (arg.value) {
      case 'Delete':
        await deleteProject(id);
        onDelete(id);
        break;
      case 'Duplicate':
        // eslint-disable-next-line no-case-declarations
        const duplicated: Project = {
          name,
          description,
          icon: '',
          id: v4(),
        };
        await createProject(JSON.stringify(duplicated));
        onChangeState();
    }
  };
  const {ref, isShow} = useOutside(false, true);
  const [platforms, setPlatforms] = useState('');
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  useEffect(() => {
    if (platform) {
      setPlatforms(
        Object.keys(platform)
          .map((key: string) => capitalize(key))
          .join(' / ')
          .replace('Ios', 'iOS')
      );
    }
  }, [platform]);

  return (
    <Container
      isActive={descriptionVisible}
      onClick={(e) => {
        e.stopPropagation();
        if (!isShow) setDescriptionVisible(true);
        if (descriptionVisible && !isShow) onClick!(e);
      }}
    >
      <div className="card_body">
        <img
          src={icon}
          alt="proj_icon"
          onError={({currentTarget}) => {
            currentTarget.onerror = null;
            currentTarget.src = logo;
          }}
        />
        <div className="card_footer">
          <div className="platform_tags">{platforms}</div>
          <div className="project_name">{name}</div>
          <div className="project_dates">
            <div>Created:</div>
            <div>Last edit:</div>
          </div>
        </div>
        <div ref={ref} style={{marginLeft: 'auto'}}>
          <DropdownIcon
            options={['Rename', 'Duplicate', 'Delete', 'Archive']}
            placeholder=" "
            arrowClosed={<Dots />}
            arrowOpen={<Dots />}
            onChange={(arg: Option) => handleChangeDropdown(arg, id)}
          />
        </div>
      </div>
      {descriptionVisible && description && (
        <>
          <hr />
          <div className="card_body_description">{description}</div>
        </>
      )}
    </Container>
  );
};
