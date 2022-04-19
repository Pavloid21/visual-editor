import {Inputs} from 'containers/Project/Project';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useModal} from 'utils/hooks';
import {ReactComponent as ArrowBack} from '../assets/arrow_back.svg';
import {ReactComponent as Settings} from '../assets/settings.svg';
import {editProject, getProjectData} from 'services/ApiService';
import {v4} from 'uuid';
import Modal from 'containers/Project/Modal';

const Header = styled.div`
  min-height: 60px;
  background-color: var(--background);
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: var(--neo-black);
  padding: 18px 16px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Subheader = styled.div`
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & div {
    display: flex;
    font-size: 16px;
    line-height: 20px;
    gap: 8px;
  }
  & span {
    color: var(--neo-secondary-gray);
    &:hover {
      cursor: pointer;
    }
  }
`;

type SideBarHeaderProps = {
  title: string;
  left?: boolean;
};

const SideBarHeader: React.FC<SideBarHeaderProps> = (props) => {
  const navigate = useNavigate();
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const {
    setValue,
    getValues,
    resetField,
    handleSubmit,
    control,
    formState: {
      errors: {form},
    },
  } = useForm<Inputs>({
    criteriaMode: 'all',
    mode: 'onBlur',
  });
  const {title, left} = props;
  const formRef = React.createRef<HTMLFormElement>();
  const location = useLocation();
  const [project, setProject] = useState({
    id: '',
    name: '',
  });
  const projectId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    getProjectData(projectId).then((project) => {
      setProject(project.data);
      setValue('form', {
        name: project.data.name,
        description: project.data.description,
        icon: project.data.icon,
      });
    });
  }, [itemModalOpen]);

  const handleSave = () => {
    const {name, icon, description} = getValues().form;
    editProject(
      projectId,
      JSON.stringify({
        id: project?.id,
        name,
        icon,
        description,
      })
    ).then((project) => {
      resetField('form.name');
      resetField('form.icon');
      resetField('form.description');
      setProject(project.data);
      toggleModal();
    });
  };

  return (
    <Header>
      {left && <ArrowBack className="icon" onClick={() => navigate('/project')} />}
      {left ? project?.name : title}
      {left && (
        <Settings
          className="icon"
          style={{marginLeft: 'auto'}}
          width="24"
          height="24"
          viewBox="6 6 24 24"
          onClick={() => toggleModal()}
        />
      )}
      <Modal
        control={control}
        formRef={formRef}
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        itemModalOpen={itemModalOpen}
        setItemModalOpen={setItemModalOpen}
        form={form}
        isEdit
      />
    </Header>
  );
};

export const SideBarSubheader = (props: React.HTMLProps<any>) => {
  return <Subheader>{props.children}</Subheader>;
};

export default SideBarHeader;
