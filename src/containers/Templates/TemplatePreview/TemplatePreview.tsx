import {Button} from 'components/controls';
import {DeviceKeys, mockByDeviceKey} from 'containers/MobileSelect/consts';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {applyTemplate, createProject} from 'services/ApiService';
import {H2, PhoneWrapper} from './TemplatePreview.styled';
import type {Project as TProject} from 'store/types';
import {useDispatch} from 'react-redux';
import {selectProject} from 'store/project.slice';
import Routes from 'routes/routes';
import {ITemplatePreview} from '../types';

export const TemplatePreview: React.FC<ITemplatePreview> = ({project, template}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaults = {
    name: 'Blank page',
    description: 'Description mobile app',
  };

  const handleProjectSelect = (project: TProject) => {
    dispatch(
      selectProject({
        ...project,
      })
    );
    navigate(`${Routes.EDITOR}/${project.id}`);
  };

  const handleSaveProject = async () => {
    const newProject = await createProject(
      JSON.stringify({...project, platform: JSON.parse(project.platform.toString() || '{}')})
    );
    if (template) {
      await applyTemplate(template.id, JSON.stringify({projectId: project.id}));
    }
    handleProjectSelect(newProject.data);
  };

  return (
    <PhoneWrapper>
      {mockByDeviceKey[DeviceKeys.IPHONE_11_PRO_10]}
      <H2>{template?.title || defaults.name}</H2>
      <p>{template?.description || defaults.description}</p>
      <Button className="sm" onClick={handleSaveProject}>
        Select
      </Button>
    </PhoneWrapper>
  );
};
