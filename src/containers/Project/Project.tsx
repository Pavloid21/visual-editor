import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useKeycloak} from '@react-keycloak/web';
import {ButtonSelector} from 'components';
import {v4} from 'uuid';
import {Button, Input} from 'components/controls';
import {ReactComponent as Plus} from '../../assets/button_plus.svg';
import {createProject, getProjectData, getProjectsList} from 'services/ApiService';
import {Card} from './Card';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import actionTypes from 'constants/actionTypes';
import {Project as TProject} from 'reducers/types';
import {AxiosResponse} from 'axios';
import Loader from 'components/Loader';
import {useModal} from 'utils/hooks';
import CustomModal from 'components/Modal';
import {useForm, Controller} from 'react-hook-form';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as Close} from '../../assets/close.svg';
import {VerticalDivider} from 'components/TopBar';

type Inputs = {
  form: {
    name: string;
    icon: string;
    description: string;
  };
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 48px 36px;
  flex-direction: column;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const H1 = styled.h1`
  font-size: 40px;
`;

const P = styled.p`
  color: var(--neo-secondary-gray);
`;

const Header = styled.div`
  background-color: #f3f3f3;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  & > section {
    margin-bottom: 0;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;
  background: #fafafa;
  box-shadow: inset 0px -1px 4px rgba(0, 0, 0, 0.3);
  flex-wrap: wrap;
  gap: 32px;
  padding: 32px;
  height: calc(100vh - 300px);
`;

const Bar = styled.div<any>`
  height: 60px;
  width: 100%;
  background: var(--background);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  top: 0;
  z-index: 3;
  & > div {
    display: flex;
    position: relative;
    & > h3 {
      font-weight: 500;
      font-size: 20px;
      align-self: center;
      margin-bottom: 0;
    }
    & > div {
      gap: 16px;
    }
    &.user {
      color: #ffffff;
      background-color: #333333;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px;
    }
  }
`;

const Subheader = styled.div`
  height: 36px;
  background: var(--background);
  padding: 6px 16px;
  & > span {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  & > div:first-child {
    padding: 8px 16px;
    border-right: 1px solid #e6e6e6;
  }
  & > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
    padding: 26px 28px;
  }
`;

export const Project: React.FC<any> = () => {
  const {keycloak} = useKeycloak();
  const {name, preferred_username} = keycloak.idTokenParsed!;
  const [projects, setProjects] = useState<TProject[]>([]);
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const formRef = React.createRef<HTMLFormElement>();
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProjects = async () => {
    await getProjectsList().then((projects: AxiosResponse) => {
      if (projects.data) {
        const promises: Promise<AxiosResponse>[] = projects.data.map((project: string) => getProjectData(project));
        Promise.allSettled(promises).then((data: PromiseSettledResult<any>[]) => {
          setProjects(data.map((item: any) => item.value.data));
        });
      }
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleProjectSelect = (project: TProject) => {
    dispatch({
      type: actionTypes.SELECT_PROJECT,
      ...project,
    });
    navigate(`/editor/${project.id}`);
  };

  const handleAddProject = () => {
    toggleModal();
  };

  const handleSave = () => {
    const {name, icon, description} = getValues().form;
    resetField('form.name');
    resetField('form.icon');
    resetField('form.description');
    createProject(
      JSON.stringify({
        id: v4(),
        name,
        icon,
        description,
      })
    ).then(() => {
      setProjects([]);
      toggleModal();
      getProjects();
    });
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
              onChange={function (button: string): void {
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
            {!projects.length && <Loader loading={true} />}
            {projects.map((project) => (
              <Card {...project} key={v4()} onClick={() => handleProjectSelect(project)} />
            ))}
          </Content>
        </div>
      </Container>
      <CustomModal isActive={itemModalOpen} handleClose={() => setItemModalOpen(false)}>
        <Bar>
          <div>
            <Logo />
            <VerticalDivider />
            <h3>Create New Project</h3>
          </div>
          <div>
            <Close className="icon" onClick={() => setItemModalOpen(false)} />
          </div>
        </Bar>
        <Subheader>
          <span>Project Settings</span>
        </Subheader>
        <Columns>
          <div>
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Controller
                name="form.name"
                control={control}
                rules={{required: 'Name is required'}}
                render={({field}) => {
                  return (
                    <div>
                      <Input
                        clearable
                        isWide
                        label="Project name"
                        placeholder="Project name"
                        extraText={form?.name?.message}
                        status={form?.name ? 'error' : undefined}
                        {...field}
                      />
                    </div>
                  );
                }}
              />
              <Controller
                name="form.icon"
                control={control}
                render={({field}) => {
                  return (
                    <div>
                      <Input clearable isWide label="Project icon" placeholder="Icon URL" {...field} />
                    </div>
                  );
                }}
              />
              <Controller
                name="form.description"
                control={control}
                render={({field}) => {
                  return (
                    <div>
                      <Input
                        clearable
                        isWide
                        textarea
                        label="Description"
                        placeholder="Your project description"
                        {...field}
                      />
                    </div>
                  );
                }}
              />
            </form>
          </div>
          <div>
            <Button onClick={handleSubmit(handleSave)}>CREATE</Button>
          </div>
        </Columns>
      </CustomModal>
    </>
  );
};
