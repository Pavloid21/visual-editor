import {Inputs} from 'containers/Project/Project';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import {useModal} from 'utils';
import {ReactComponent as ArrowBack} from 'assets/arrow_back.svg';
import {ReactComponent as Settings} from 'assets/settings.svg';
import {ReactComponent as Warning} from 'assets/warning.svg';
import {editProject, getProjectData} from 'services/ApiService';
import Modal from 'containers/Project/Modal/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {Modal as CustomModal} from '../Modal';
import {Button} from 'components/controls/Button';
import {useBackListener} from 'constants/utils';
import {setLayout} from 'store/layout.slice';
import type {RootStore} from '../../store/types';
import type {SideBarHeaderProps} from './types';
import {Header, Subheader, WarningWrapper} from './SideBarHeader.styled';
import {filesToDTO} from 'utils/files';
import {head} from 'external/lodash';
import Routes from 'routes/routes';

export const SideBarHeader: React.FC<SideBarHeaderProps> = (props) => {
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
        platform: JSON.stringify(project.data.platform),
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

  const handleSave = async () => {
    const {name, icon: icons, description, platform, url} = getValues().form;
    const requestIcons = await filesToDTO(icons);
    editProject(
      projectId,
      JSON.stringify({
        id: project?.id,
        name,
        icon: head(requestIcons),
        description,
        platform: JSON.parse(platform.toString()),
        url,
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
    navigate(Routes.PROJECT);
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
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        itemModalOpen={itemModalOpen}
        setItemModalOpen={setItemModalOpen}
        setValue={setValue}
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
