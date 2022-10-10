import React from 'react';
import {Container, MenuItem} from './LeftSideBarMenu.styled.jsx';
import screen from 'assets/left-sidebar-menu/screens.svg';
import screenActive from 'assets/left-sidebar-menu/screens-active.svg';
import action from 'assets/left-sidebar-menu/actions.svg';
import actionActive from 'assets/left-sidebar-menu/actions-active.svg';
import image from 'assets/left-sidebar-menu/images.svg';
import imageActive from 'assets/left-sidebar-menu/images-active.svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from '../../store/types';
import {setLeftBarMenu} from '../../store/left-bar-menu.slice';

const LeftSideBarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootStore) => state.leftBarMenu.activeTab);

  const handleModeClick = (mode: string) => {
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
  return (
    <Container>
      <MenuItem className={screenClass} onClick={() => handleModeClick('screen')}>
        {activeTab === 'screen' ?
          <img src={screenActive} alt='screen' /> :
          <img src={screen} alt='screen' />
        }
      </MenuItem>
      <MenuItem className={actionClass} onClick={() => handleModeClick('action')}>
        {activeTab === 'action' ?
          <img src={actionActive} alt='action' /> :
          <img src={action} alt='action' />
        }
      </MenuItem>
      <MenuItem className={imageClass} onClick={() => handleModeClick('image')}>
        {activeTab === 'image' ?
          <img src={imageActive} alt='image' /> :
          <img src={image} alt='image' />
        }
      </MenuItem>
    </Container>
  );
};

export default LeftSideBarMenu;
