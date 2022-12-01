import React, {useCallback} from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as HideLeft} from '../../assets/hide_left.svg';
import {ReactComponent as HideRight} from '../../assets/hide_right.svg';
import {Button} from 'components/controls';
import {useAppDispatch} from 'store';
import {useKeycloak} from '@react-keycloak/web';
import {useLocation} from 'react-router-dom';
import {useOutside} from 'utils';
import {toggleLeftBar, toggleRightBar} from 'store/side-bar.slice';
import {Bar, VerticalDivider} from './TopBar.styled';
import {SaveAppWrapper} from './SaveAppWrapper';

const TopBar = () => {
  const dispatch = useAppDispatch();
  const {keycloak} = useKeycloak();
  const location = useLocation();
  const {ref, isShow, setIsShow} = useOutside(false);
  const isEditorPath = location.pathname.indexOf('editor') >= 0;

  const handleHideLeft = useCallback(() => {
    dispatch(toggleLeftBar());
  }, [dispatch]);

  const handleHideRight = useCallback(() => {
    dispatch(toggleRightBar());
  }, [dispatch]);

  const openMenu = useCallback(() => {
    setIsShow(true);
  }, [setIsShow]);

  const handleLogOut = useCallback(() => {
    keycloak.logout();
  }, [keycloak]);

  return (
    <React.StrictMode>
      <Bar isHidden={keycloak.authenticated}>
        <div>
          <Logo className="icon" />
          <VerticalDivider />
          {isEditorPath && <HideLeft className="icon" onClick={handleHideLeft} />}
        </div>
        <div>
          <div>
            {isEditorPath && (
              <>
                <SaveAppWrapper />
                <HideRight className="icon" onClick={handleHideRight} />
              </>
            )}
          </div>
          <VerticalDivider />
          <div className="user" onClick={openMenu}>
            {keycloak?.idTokenParsed?.given_name[0]}
            {keycloak?.idTokenParsed?.family_name[0]}
            {isShow && (
              <div className="account_menu" ref={ref}>
                <span>{keycloak?.idTokenParsed?.given_name + ' ' + keycloak?.idTokenParsed?.family_name}</span>
                <Button onClick={handleLogOut}>Logout</Button>
              </div>
            )}
          </div>
        </div>
      </Bar>
    </React.StrictMode>
  );
};

export default React.memo(TopBar);
