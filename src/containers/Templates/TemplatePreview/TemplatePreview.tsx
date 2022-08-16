import {Button} from 'components/controls';
import {DeviceKeys, mockByDeviceKey} from 'containers/MobileSelect/consts';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {createProject} from 'services/ApiService';
import {H2, PhoneWrapper} from './TemplatePreview.styled';
import type {Project as TProject} from 'store/types';
import {useDispatch} from 'react-redux';
import {selectProject} from 'store/project.slice';

export const TemplatePreview: React.FC<{projectData: any}> = ({projectData}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProjectSelect = (project: TProject) => {
    dispatch(
      selectProject({
        ...project,
      })
    );
    navigate(`/editor/${project.id}`);
  };

  const handleSaveProject = () => {
    createProject(JSON.stringify(projectData)).then((project) => {
      handleProjectSelect(project.data);
    });
  };

  return (
    <PhoneWrapper>
      {mockByDeviceKey[DeviceKeys.IPHONE_11_PRO_10]}
      <H2>Blank page</H2>
      <p>Description mobile app</p>
      <Button className="sm" onClick={handleSaveProject}>
        Select
      </Button>
    </PhoneWrapper>
  );
};
