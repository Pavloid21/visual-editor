import React from 'react';
import {Container, MenuItem} from './LeftSideBarMenu.styled.jsx';
import {setLeftBarMenu} from 'store/left-bar-menu.slice';
import {ReactComponent as ScreenImage} from 'assets/left-sidebar-menu/screens.svg';
import {ReactComponent as ActionImage} from 'assets/left-sidebar-menu/actions.svg';
import {ReactComponent as ImageImage} from 'assets/left-sidebar-menu/images.svg';
import {deleteAction, setSelectAction} from 'store/actions.slice';
import {useAppDispatch, useAppSelector} from 'store';

const LeftSideBarMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const {activeTab} = useAppSelector((state) => state.leftBarMenu);

  const handleModeClick = (mode: string| undefined) => {
    if (!mode) return;
    dispatch(setLeftBarMenu(mode));
  };

  let screenClass = '';
  let actionClass = '';
  let imageClass = '';
  if (activeTab === 'screen') {
    screenClass = 'active';
  }
  if (activeTab === 'action') {
    actionClass = 'active';
    screenClass = 'borderNone';
  }
  if (activeTab === 'image') {
    imageClass = 'active';
    actionClass = 'borderNone';
  }

  const ContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const tab = (event.target as HTMLDivElement).closest('div');
    if (tab) {
      handleModeClick(tab.dataset.tabActive);
    }
    if (tab?.dataset.tabActive !== 'action') {
      dispatch(setSelectAction(null));
      dispatch(deleteAction(null));
    }
  };

  const getClassTabById = (value: string) => activeTab === value ? 'left-bar-image active' : 'left-bar-image';

  return (
    <Container onClick={ContainerClick}>
      <MenuItem data-tab-active='screen' className={screenClass}>
        <ScreenImage className={getClassTabById('screen')} />
      </MenuItem>
      <MenuItem data-tab-active='action' className={actionClass}>
        <ActionImage className={getClassTabById('action')} />
      </MenuItem>
      <MenuItem data-tab-active='image' className={imageClass}>
        <ImageImage className={getClassTabById('image')} />
      </MenuItem>
    </Container>
  );
};

export default LeftSideBarMenu;
