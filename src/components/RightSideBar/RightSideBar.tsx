import React, {useRef} from 'react';
import {SideBarHeader} from 'components';
import {Inspector} from 'containers/Inspector';
import Screen from 'containers/Screen';
import {ActionsTabsForms} from 'containers/ActionForm';
import {useAppDispatch, useAppSelector} from 'store';
import {noop} from 'external/lodash';
import {useOutsideAlerter} from 'utils';
import {setSelectedBlock} from 'store/layout.slice';
import {APIContainer, Container} from './RightSideBar.styled';

const RightSidebar: React.FC<unknown> = () => {
  const {activeTab} = useAppSelector((state) => state.config);
  const {selectedBlockUuid: selectedBlock, selectedScreen} = useAppSelector((state) => state.layout);
  const barState = useAppSelector((state) => state.sideBar);
  const selectedAction = useAppSelector((state) => state.actions.selected);
  const dispatch = useAppDispatch();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => dispatch(setSelectedBlock('')));

  if (!barState.right) {
    return null;
  }

  return (
    <Container ref={wrapperRef}>
      <div>
        <SideBarHeader title="Properties" />
        <Inspector display />
        {selectedAction && !selectedBlock && <ActionsTabsForms selectedAction={selectedAction} />}
        {activeTab === 5 && selectedScreen && (
          <Screen category="screen" display={activeTab === 5} onPushBlock={noop} onPushBlockInside={noop} />
        )}
        {!selectedBlock && !selectedAction && activeTab !== 5 && (
          <APIContainer>
            <div>
              <span>Select screen or action to view properties</span>
            </div>
          </APIContainer>
        )}
      </div>
    </Container>
  );
};

export default React.memo(RightSidebar);
