import React, {useEffect, useState} from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {sortableContainer} from 'react-sortable-hoc';
import actionTypes, {ItemTypes} from '../constants/actionTypes';
import {arrayMoveImmutable} from 'array-move';
import {observer} from '../utils/observer';
import IphoneX from '../assets/mockups/IphoneX';
import styled from 'styled-components';
import Code from './Code';
import {ReactComponent as Screen} from '../assets/screen.svg';
import {ReactComponent as Json} from '../assets/json.svg';
import {ReactComponent as Reference} from '../assets/preview.svg';
import {ReactComponent as Save} from '../assets/save.svg';
import MobileSelect from './MobileSelect';
import clsx from 'clsx';

const Bar = styled.div`
  height: 60px;
  background: var(--background);
  width: 100%;
  position: absolute;
  left: 0;
  padding-left: ${(props) => (props.barState.left ? '437px' : '16px')};
  padding-right: ${(props) => (props.barState.right ? '437px' : '16px')};
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .mode_selector {
    gap: 16px;
    display: flex;
  }
`;

const ServiceBar = styled.div`
  height: 36px;
  background: var(--background);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding-left: ${(props) => (props.barState?.left ? '437px' : '16px')};
  padding-right: ${(props) => (props.barState?.right ? '437px' : '16px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .mode_selector {
    gap: 16px;
    display: flex;
  }
`;

const Container = styled.div`
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  /* overflow: auto; */
  position: relative;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    overflow-y: auto;
  }
  & > :first-child {
    overflow: initial;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const SortableContainer = sortableContainer(({children, drop, backgroundColor}) => {
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  return (
    <Container backgroundColor={backgroundColor} ref={drop}>
      <div style={{flex: bottomBar ? 1 : 'none'}}>
        {children.map((child, index) => {
          if (index !== children.length - 1) {
            return child;
          }
          return null;
        })}
      </div>
      {children[children.length - 1]}
    </Container>
  );
});

const Preview = (props) => {
  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => {
      return;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({shallow: true}),
      canDrop: monitor.canDrop(),
    }),
  }));

  const dispatch = useDispatch();
  const [isShowCode, showCode] = useState(false);
  const editorMode = useSelector((state) => state.editorMode.mode);
  const layout = useSelector((state) => state.layout);
  const barState = useSelector((state) => state.sideBar);

  useEffect(() => {
    const scrollY = localStorage.getItem('scrollY');
    const bodyHeight = localStorage.getItem('bodyHeight');
    if (scrollY) {
      window.scrollTo(0, scrollY);
    }

    if (bodyHeight) {
      window.scroll(0, scrollY);
    }

    window.addEventListener('scroll', () => {
      localStorage.setItem('scrollY', window.scrollY);
    });
  });

  const onSortEnd = ({oldIndex, newIndex, nodes}) => {
    const newOrder = arrayMoveImmutable(nodes, oldIndex, newIndex).map((item) => item.node.getAttribute('id'));
    observer.broadcast({
      layout,
      newOrder,
      parentID: nodes[0].node.parentNode.getAttribute('id'),
      event: 'sorted',
    });
  };

  const handleModeClick = (mode) => {
    dispatch({
      type: actionTypes.SET_EDITOR_MODE,
      mode,
    });
  };

  const handleSaveSnippet = () => {
    // fetch(`/api/v1/configurations/${initial.screen.replace(/\s/g, "_")}`, {
    //   method: "PUT",
    //   body: code.replace(/\s/g, "").replace(/\n/g, ""),
    //   headers: {
    //     "Content-Type": "application/javascript",
    //   },
    // })
    //   .then((response) => {})
    //   .then(() => {
    //     alert("SUCCESS");
    //   });
  };

  const isActive = canDrop && isOver;
  let backgroundColor = '#FFFFFF';
  if (isActive) {
    backgroundColor = '#f1f8ff';
  }

  return (
    <>
      <Bar barState={barState}>
        {editorMode === 'editor' && <MobileSelect />}
        <div className="mode_selector">
          <Screen
            className={clsx('icon', {
              active: editorMode === 'editor',
            })}
            onClick={() => handleModeClick('editor')}
          />
          <Json
            className={clsx('icon', {
              active: editorMode === 'json',
            })}
            onClick={() => handleModeClick('json')}
          />
          <Reference
            className={clsx('icon', {
              active: editorMode === 'preview',
            })}
            onClick={() => handleModeClick('preview')}
          />
        </div>
      </Bar>
      <div
        className="page-content-wrapper overflow-hidden d-flex justify-content-center"
        style={{position: 'relative', transform: 'scale(0.9)'}}
      >
        {editorMode === 'editor' && (
          <IphoneX>
            <SortableContainer drop={drop} backgroundColor={backgroundColor} onSortEnd={onSortEnd} distance={1}>
              {props.components}
            </SortableContainer>
          </IphoneX>
        )}
        {editorMode === 'json' && <Code show={isShowCode} />}
      </div>
      <ServiceBar barState={barState}>
        {editorMode === 'json' && <Save className="icon" onClick={handleSaveSnippet} />}
      </ServiceBar>
    </>
  );
};

export default Preview;
