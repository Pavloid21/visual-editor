import React, {useEffect, useState} from 'react';
import {Modal as CustomModal} from 'components';
import {ReactComponent as Close} from 'assets/close.svg';
import {ContentModal, Bar, EditModalTabs, Actions} from './Modal.styled';
import type {ModalProps} from 'containers/Project/types';
import {MainInfoContent} from './components/MainInfoContent';
import {EDIT_MODAL_TABS} from 'containers/Project/constants';
import {BusinessContent} from './components/BusinessContent';
import {getDataActionByName} from 'services/ApiService';
import {parseRuturnStatement} from 'utils/parse';
import {clearBusinessSetting, setBusinessSetting} from 'store/business-setting.slice';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from 'store/types';
import {Button} from 'components/controls';

const Modal: React.FC<ModalProps> = (props) => {
  const projectID = useSelector((state: RootStore) => state.project.id);
  const project_id = projectID || location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const screenList = useSelector((state: RootStore) => state.screenList);
  const actionsData = useSelector((state: RootStore) => state.actions.data);
  const dispatch = useDispatch();
  const {itemModalOpen, setItemModalOpen, form, control, handleSave, handleSubmit, isEdit, setValue} = props;

  const [activeTab, setActiveTab] = useState(EDIT_MODAL_TABS.MAIN);

  const getClassTabById = (tab: string) => activeTab === tab ? 'tab_active' : '';

  const widthModal = isEdit ? '600px' : '502px';

  const handlerClickTabs = (event: React.MouseEvent<HTMLDivElement>) => {
    const activeTab = (event.target as HTMLDivElement)?.dataset?.tabId || EDIT_MODAL_TABS.MAIN;
    setActiveTab(activeTab);
  };

  useEffect(() => {
    const businessSettings = async () => {
      if (project_id !== 'project') {
        const data = await getDataActionByName(project_id, 'appSettings');
        const settings = parseRuturnStatement(data);
        dispatch(setBusinessSetting(settings));
      }
    };
    businessSettings();
  }, []);

  const renderMainInfo = () => (
    <MainInfoContent
      handleSubmit={handleSubmit}
      control={control}
      form={form}
      handleSave={handleSave}
      isEdit={isEdit}
      setItemModalOpen={setItemModalOpen}
      setValue={setValue}
    />
  );

  return (
    <CustomModal isActive={itemModalOpen} handleClose={() => setItemModalOpen(false)} style={{maxWidth: widthModal}}>
      <Bar>
        <h3>{isEdit ? 'Edit' : 'Create New'} Project</h3>
        <div>
          <Close className="icon" onClick={() => setItemModalOpen(false)} />
        </div>
      </Bar>
      {isEdit ?
        <>
          <EditModalTabs onClick={handlerClickTabs}>
            <h3 data-tab-id={EDIT_MODAL_TABS.MAIN} className={getClassTabById(EDIT_MODAL_TABS.MAIN)}>Main info</h3>
            <h3 data-tab-id={EDIT_MODAL_TABS.BUSINESS} className={getClassTabById(EDIT_MODAL_TABS.BUSINESS)}>Business
              setting</h3>
          </EditModalTabs>
          <ContentModal>
          {activeTab === EDIT_MODAL_TABS.MAIN ?
            renderMainInfo() :
            <BusinessContent
              screenList={screenList}
              setItemModalOpen={setItemModalOpen}
            />}
          </ContentModal>
        </> :
        renderMainInfo()
      }
      <Actions>
        <Button onClick={handleSubmit(handleSave)}>{isEdit ? 'Save' : 'Create'}</Button>
        <Button className="secondary" onClick={() => setItemModalOpen(false)}>
          Cancel
        </Button>
      </Actions>
    </CustomModal>
  );
};

export default Modal;
