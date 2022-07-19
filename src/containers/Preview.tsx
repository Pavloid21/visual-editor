import React, {ReactNode, useEffect} from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import actionTypes, {ItemTypes} from '../constants/actionTypes';
import {arrayMoveImmutable} from 'array-move';
import {observer, onSortMove} from 'utils';
import PhoneContainer from './PhoneContainer';
import styled from 'styled-components';
import Code from './Code';
import {ReactComponent as Screen} from '../assets/screen.svg';
import {ReactComponent as Json} from '../assets/json.svg';
import {ReactComponent as Reference} from '../assets/preview.svg';
import {ReactComponent as Save} from '../assets/save.svg';
import MobileSelect from './MobileSelect';
import clsx from 'clsx';
import ZoomSelect from './ZoomSelect';
import {Beforeunload} from 'react-beforeunload';
import {Store} from 'reducers/types';

const Bar = styled.div<any>`
  height: 60px;
  background: var(--background);
  position: absolute;
  left: 0;
  right: 0;
  margin-left: ${(props) => (props.barState.left ? '421px' : '0px')};
  margin-right: ${(props) => (props.barState.right ? '422px' : '0px')};
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .mode_selector {
    gap: 16px;
    margin-left: auto;
    display: flex;
  }
  @media (max-width: 1500px) {
    margin-left: ${(props) => (props.barState.left ? '299px' : '0px')};
    margin-right: ${(props) => (props.barState.right ? '300px' : '0px')};
  }
`;

const ServiceBar = styled.div<any>`
  height: 42px;
  background: var(--background);
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0 25px;
  margin-left: ${(props) => (props.barState?.left ? '421px' : '0px')};
  margin-right: ${(props) => (props.barState?.right ? '422px' : '0px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .mode_selector {
    gap: 16px;
    display: flex;
  }
  @media (max-width: 1500px) {
    margin-left: ${(props) => (props.barState.left ? '299px' : '0px')};
    margin-right: ${(props) => (props.barState.right ? '300px' : '0px')};
  }
`;

const Container = styled.div<any>`
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
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

interface ISortableList {
  backgroundColor: string;
  drop: React.Ref<any>;
  list: ReactNode[];
}

const SortableItem = SortableElement((props: any) => <>{props.children}</>);

const SortableList = SortableContainer<ISortableList>(({drop, backgroundColor, list}: ISortableList) => {
  const bottomBar = useSelector((state: Store) => state.layout.bottomBar);
  return (
    <Container backgroundColor={backgroundColor} ref={drop}>
      <div style={{flex: bottomBar ? 1 : 'none'}}>
        {list.map((child: ReactNode, index: number) => {
          if (index !== list.length - 1) {
            // @ts-ignore
            return <SortableItem index={index}>{child}</SortableItem>;
          }
          return null;
        })}
      </div>
      {/* @ts-ignore*/}
      {list.length > 0 && <SortableItem index={list.length - 1}>{list[list.length - 1]}</SortableItem>}
    </Container>
  );
});

const Preview = (props: any) => {
  const selectedScreen = useSelector((state: Store) => state.layout.selectedScreen);
  const [{canDrop, isOver}, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: (item) => {
        return item;
      },
      canDrop: (item: {type: string}) => {
        return item.type === 'Container' && !!selectedScreen;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({shallow: true}),
        canDrop: monitor.canDrop(),
      }),
    }),
    [selectedScreen]
  );

  const dispatch = useDispatch();
  const editorMode = useSelector((state: Store) => state.editorMode.mode);
  const layout = useSelector((state: Store) => state.layout);
  const barState = useSelector((state: Store) => state.sideBar);

  useEffect(() => {
    const scrollY = localStorage.getItem('scrollY');
    const bodyHeight = localStorage.getItem('bodyHeight');
    if (scrollY) {
      window.scrollTo(0, +scrollY);
    }

    if (bodyHeight) {
      window.scroll(0, +scrollY!);
    }

    window.addEventListener('scroll', () => {
      localStorage.setItem('scrollY', `${window.scrollY}`);
    });
  }, [selectedScreen]);

  const onSortEnd = ({oldIndex, newIndex, nodes}: any) => {
    const newOrder = arrayMoveImmutable(nodes, oldIndex, newIndex).map((item: any) => item.node.getAttribute('id'));
    observer.broadcast({
      layout,
      newOrder,
      parentID: nodes[0].node.parentNode.getAttribute('id'),
      event: 'sorted',
    });
  };

  const handleModeClick = (mode: string) => {
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
      {layout.editedScreens.length && (
        <Beforeunload
          onBeforeunload={(event) => {
            event.preventDefault();
            return;
          }}
        />
      )}
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
        style={{position: 'relative', marginTop: '60px', marginBottom: '32px'}}
      >
        {editorMode === 'editor' && (
          <PhoneContainer>
            {/* @ts-ignore*/}
            <SortableList
              drop={drop}
              backgroundColor={backgroundColor}
              onSortEnd={onSortEnd}
              shouldCancelStart={onSortMove}
              distance={1}
              list={props.components}
            />
          </PhoneContainer>
        )}
        {editorMode === 'json' && <Code />}
      </div>
      <ServiceBar barState={barState}>
        {editorMode === 'json' && <Save className="icon" onClick={handleSaveSnippet} />}
        <ZoomSelect />
      </ServiceBar>
    </>
  );
};

export default Preview;
