import React, {useEffect, useState} from 'react';
import {useKeycloak} from '@react-keycloak/web';
import {ButtonSelector, Loader} from 'components';
import {v4} from 'uuid';
import {Button} from 'components/controls';
import {ReactComponent as Plus} from '../../assets/button_plus.svg';
import {BASE_URL, getProjectData, getProjectsList} from 'services/ApiService';
import {Card} from 'containers/Card';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AxiosResponse} from 'axios';
import {useModal} from 'utils';
import {useForm} from 'react-hook-form';
import Modal from './Modal/Modal';
import {selectProject} from 'store/project.slice';
import {Container, Content, H1, Header, P} from './Project.styled';
import type {Project as TProject} from 'store/types';
import {filesToDTO} from 'utils/files';
import {head} from 'external/lodash';
import {saveProjectForm} from 'store/project-form.slice';

export type Inputs = {
  form: {
    name: string;
    icon: File[];
    description: string;
    platform: Record<string, any> & {
      ios: boolean;
      android: boolean;
      aurora: boolean;
    } | string;
    url: string;
  };
};

export const Project: React.FC<unknown> = () => {
  const {keycloak} = useKeycloak();
  const {name, preferred_username} = keycloak.idTokenParsed!;
  const [projects, setProjects] = useState<TProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const {
    getValues,
    resetField,
    handleSubmit,
    setValue,
    control,
    formState: {
      errors: {form},
    },
  } = useForm<Inputs>({
    criteriaMode: 'all',
    mode: 'onBlur',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProjects = async () => {
    setLoading(true);
    await getProjectsList().then((projects: AxiosResponse) => {
      if (projects.data) {
        const promises: Promise<AxiosResponse>[] = projects.data.map((project: string) => getProjectData(project));
        Promise.allSettled(promises).then((data: PromiseSettledResult<any>[]) => {
          setProjects(
            data.map((item: any) => {
              const {data} = item.value;

              return {
                ...data,
                icon: `${BASE_URL}projects/${data.id}/files/${data.icon}`,
              };
            })
          );
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleProjectSelect = (project: TProject) => {
    dispatch(
      selectProject({
        ...project,
      })
    );
    navigate(`/editor/${project.id}`);
  };

  const handleAddProject = () => {
    toggleModal();
  };

  const handleSave = async () => {
    const {name, icon: icons, description, platform, url} = getValues().form;
    resetField('form.name');
    resetField('form.icon');
    resetField('form.description');
    resetField('form.platform');
    const requestIcons = await filesToDTO(icons);
    dispatch(
      saveProjectForm({
        id: v4(),
        name,
        icon: head(requestIcons),
        description,
        platform,
        url,
      })
    );
    navigate('/templates');
  };

  const refresh = () => {
    setProjects([]);
    getProjects();
  };

  return (
    <>
      <Container>
        <H1>Welcome, {name || preferred_username}!</H1>
        <P>You are on the main page where you can create a new project or modify an already created one. </P>
        <div>
          <Header>
            <ButtonSelector
              buttons={[
                {title: 'My Projects', key: 'own', uuid: v4()},
                {title: 'Team Projects', key: 'team', uuid: v4()},
              ]}
              onChange={function (): void {
                throw new Error('Function not implemented.');
              }}
              value={'own'}
            ></ButtonSelector>
            <Button onClick={handleAddProject}>
              <Plus />
              Create New Project
            </Button>
          </Header>
          <Content>
            {loading && <Loader loading={true} />}
            {projects.map((project) => (
              <Card
                {...project}
                key={v4()}
                onDelete={(id: string) => {
                  const nextProject = projects.filter((item) => item.id !== id);
                  setProjects(nextProject);
                }}
                onChangeState={refresh}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectSelect(project);
                }}
              />
            ))}
          </Content>
        </div>
      </Container>
      <Modal
        control={control}
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        itemModalOpen={itemModalOpen}
        setItemModalOpen={setItemModalOpen}
        setValue={setValue}
        form={form}
      />
    </>
  );
};
