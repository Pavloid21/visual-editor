/* eslint-disable no-case-declarations */
import React, {useEffect, useState} from 'react';
import {ReactComponent as Dots} from 'assets/dots.svg';
import 'react-dropdown/style.css';
import {createProject, deleteProject, getScreenByName, getScreensList, saveScreen} from 'services/ApiService';
import {useOutside} from 'utils';
import {Container, DropdownIcon} from './Card.styled';
import {TCardProps} from './types';
import logo from 'assets/image_placeholder.png';
import {capitalize} from 'external/lodash';
import {Option} from 'react-dropdown';
import {Project} from 'store/types';
import {v4} from 'uuid';
import moment from 'moment';

export const Card: React.FC<TCardProps> = ({
  name,
  description,
  icon,
  onClick,
  onDelete,
  onChangeState,
  created,
  edited,
  id,
  platform,
}) => {
  const {ref, isShow} = useOutside(false, true);
  const [platforms, setPlatforms] = useState('');

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

  const handleChangeDropdown = async (arg: Option, id: string) => {
    switch (arg.value) {
      case 'Delete':
        await deleteProject(id);
        onDelete(id);
        break;
      case 'Duplicate':
        const newProjId = v4();
        const duplicated: Project = {
          name,
          description,
          platform,
          icon: '',
          id: newProjId,
        };
        const screensList = await getScreensList(id);
        const screensObjArr = screensList.data.map(async (screen: string) => {
          try {
            const response = await getScreenByName(screen, true, id);
            return {
              screen,
              object: response.data,
              logic: response.data,
              id,
            };
          } catch (e) {
            console.log('e :>> ', e);
          }
        });
        const resolves = await Promise.allSettled(screensObjArr);
        await createProject(JSON.stringify(duplicated));
        resolves.forEach((screen: any) => {
          saveScreen(newProjId, screen.value.screen, `return ${JSON.stringify(screen.value.logic)}`);
        });
        onChangeState();
    }
  };

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        if (!isShow) onClick!(e);
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
          <div className="project_name">{name}<span className="tooltip">{name}</span></div>
          <div className="project_dates">
            <div>{`Created: ${created ? moment(created).format('DD.MM.yyyy HH:mm:ss') : ''}`}</div>
            <div>{`Last edit: ${edited ? moment(edited).format('DD.MM.yyyy HH:mm:ss') : ''}`}</div>
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
      {description && (
        <div className="card_description">
          <hr />
          <div className="card_body_description">{description}</div>
        </div>
      )}
    </Container>
  );
};
