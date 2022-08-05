import {Inputs} from 'containers/Project/Project';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useModal} from 'utils';
import {ReactComponent as ArrowBack} from 'assets/arrow_back.svg';
import {ReactComponent as Settings} from 'assets/settings.svg';
import {ReactComponent as Warning} from 'assets/warning.svg';
import {editProject, getProjectData} from 'services/ApiService';
import Modal from 'containers/Project/Modal/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {Modal as CustomModal} from './Modal';
import {Button} from 'components/controls/Button';
import {useBackListener} from 'constants/utils';
import {setLayout} from 'store/layout.slice';
import type {RootStore} from '../store/types';

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
  padding: 0 16px;
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

const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  & > svg {
    margin-bottom: 30px;
  }
  & > h3 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 24px;
  }
  & > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    max-width: 384px;
    text-align: center;
    margin-bottom: 28px;
  }
  & > .button_group {
    display: flex;
    gap: 16px;
  }
`;

type SideBarHeaderProps = {
  title: string;
  left?: boolean;
};

const SideBarHeader: React.FC<SideBarHeaderProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const [warningOpen, setWarningOpen, toggleWarning] = useModal();
  const layout = useSelector((state: RootStore) => state.layout);
  const location = useLocation();
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
        platform: project.data.platform,
        url: project.data.url,
      });
    });
  }, [itemModalOpen]);

  useBackListener(() => {
    if (layout.editedScreens.length || layout.deletedScreens.length) {
      toggleWarning();
    } else {
      redirect();
    }
  });

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

  const redirect = () => {
    dispatch(
      setLayout({
        layout: [],
      })
    );
    navigate('/project');
  };

  return (
    <Header>
      {left && (
        <ArrowBack
          className="icon"
          onClick={() => {
            if (layout.editedScreens.length || layout.deletedScreens.length) {
              toggleWarning();
            } else {
              redirect();
            }
          }}
        />
      )}
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
      <CustomModal
        handleClose={() => setWarningOpen(false)}
        isActive={warningOpen}
        style={{maxWidth: '432px', minHeight: '268px', display: 'flex'}}
      >
        <WarningWrapper>
          <Warning />
          <h3>Warning!</h3>
          <p>You are about to leave the page, but there are unsaved changes. Do you want to leave the page?</p>
          <div className="button_group">
            <Button
              onClick={() => {
                redirect();
              }}
            >
              Don&#39;t save
            </Button>
            <Button className="secondary" onClick={() => toggleWarning()}>
              Cancel
            </Button>
          </div>
        </WarningWrapper>
      </CustomModal>
    </Header>
  );
};

export const SideBarSubheader = (props: React.HTMLProps<any>) => {
  return <Subheader>{props.children}</Subheader>;
};

export default SideBarHeader;
