import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {arrayMoveImmutable} from 'array-move';
import {sortableContainer} from 'react-sortable-hoc';
import {range} from 'external/lodash';
import renderHandlebars from 'utils/renderHandlebars';
import {onSortMove} from 'utils/hooks';
import {observer} from 'utils/observer';
import Wrapper from 'utils/wrapper';
import {ItemTypes} from 'constants/actionTypes';
import lists from 'assets/lists.svg';
import {
  backgroundColor,
  getSizeConfig,
  shapeConfigBuilder,
  dataSourceSettings,
  filter,
} from 'views/configs';
import {pushBlockInside} from 'store/layout.slice';
import {blockStateSafeSelector} from 'store/selectors';
import store, {useAppDispatch, useAppSelector} from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';

const List = styled.div`
  align-self: center;
  margin: 0 0;
  ${(props) => getDimensionStyles(props)
    .width()
    .height()
    .apply()
  }
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  padding: 4px 0;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto;
  ${(props) => {
    if (props.shape?.type === 'ALLCORNERSROUND') {
      return `border-radius: ${props.shape.radius}px;`;
    }
  }}
`;

const SortableContainer = sortableContainer(({
  drop,
  backgroundColor,
  listItem,
  settingsUI,
  pageSize = 5,
  ...props
}) => {
  const listItems = listItem
    && range(pageSize).map(() => renderHandlebars([listItem], 'document2').components);

  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <List
        {...settingsUI}
        {...props}
        ref={drop}
        backgroundColor={backgroundColor}
        className="draggable"
      >
        {listItems}
      </List>
    </Wrapper>
  );
});

const Component = ({settingsUI, uuid, listItems, ...props}) => {
  const dispatch = useAppDispatch();
  const {layout} = useAppSelector((state) => state);
  const [{canDrop, isOver, target}, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => {
      if (target.isOver()) {
        dispatch(pushBlockInside({
          blockId: item.id,
          uuid,
        }));
      }
      return {
        uuid,
        target: target.targetId,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({shallow: true}),
      canDrop: monitor.canDrop(),
      target: monitor,
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = settingsUI.backgroundColor;
  if (isActive) {
    backgroundColor = '#f1f8ff';
  }

  const onSortEnd = ({oldIndex, newIndex, nodes}) => {
    const newOrder = arrayMoveImmutable(nodes, oldIndex, newIndex).map((item) => item.node.getAttribute('id'));
    observer.broadcast({
      layout,
      newOrder,
      parentID: nodes[0].node.parentNode.getAttribute('id'),
      event: 'sorted',
    });
  };

  return (
    <SortableContainer
      drop={drop}
      onSortEnd={onSortEnd}
      listItems={listItems}
      {...settingsUI}
      {...props}
      backgroundColor={backgroundColor}
      distance={1}
      shouldCancelStart={onSortMove}
    />
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'LIST',
    title: 'Lists',
    description:
      'A container that presents rows of data arranged in a single column, optionally providing the ability to select one or more members.',
    previewImageUrl: lists,
    category: 'Container',
    defaultInteractiveOptions: {
      dataSource: '',
      startPage: 0,
      pageSize: 20,
    },
    defaultData: {
      backgroundColor: '',
      size: {
        heightInPercent: 50,
        widthInPercent: 100,
      },
    },
    listItem: null,
    interactive: {
      dataSource: dataSourceSettings.dataSource,
      startPage: dataSourceSettings.startPage,
      pageSize: dataSourceSettings.pageSize,
      filter,
  },
    config: {
      shape: shapeConfigBuilder()
        .withRadius
        .withAllCornersRound
        .done(),
      backgroundColor,
      size: getSizeConfig(blockState.deviceInfo.device),
    },
  });
};

export default block;
