import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {arrayMoveImmutable} from 'array-move';
import {useDispatch, useSelector} from 'react-redux';
import {sortableContainer} from 'react-sortable-hoc';
import {range} from 'external/lodash';
import renderHandlebars from 'utils/renderHandlebars';
import {onSortMove} from 'utils/hooks';
import {observer} from 'utils/observer';
import Wrapper from 'utils/wrapper';
import actionTypes, {ItemTypes} from 'constants/actionTypes';
import lists from 'assets/lists.svg';
import {
  backgroundColor,
  pageSize,
  shapeConfigBuilder,
  size,
  sizeModifier,
  startPage
} from 'views/configs';

const List = styled.div`
  align-self: center;
  margin: 0 0;
  width: ${(props) => {
      if (props.size?.width !== undefined) {
        return props.size.width + 'px';
      } else if (props.size?.widthInPercent !== undefined) {
        return props.size.widthInPercent + '%';
      }
      return '100%';
    }};
    height: ${(props) => {
      if (props.size?.height !== undefined) {
        return props.size.height + 'px';
      } else if (props.size?.heightInPercent !== undefined) {
        return props.size.heightInPercent + '%';
      }
      return 'auto';
    }};
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  padding: 4px 0;
  align-items: ${(props) => props.alignment};
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
  pageSize = 1,
  ...props
}) => {
  const listItems = listItem
    && range(pageSize).map(() => renderHandlebars([listItem], 'document2').components);

  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <List {...settingsUI} {...props} ref={drop} backgroundColor={backgroundColor} className="draggable">
        {listItems}
      </List>
    </Wrapper>
  );
});

const Component = ({settingsUI, uuid, listItems, ...props}) => {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layout);
  const [{canDrop, isOver, target}, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => {
      if (target.isOver()) {
        dispatch({
          type: actionTypes.PUSH_BLOCK_INSIDE,
          blockId: item.id,
          uuid,
        });
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

const block = {
  Component,
  name: 'LIST',
  title: 'Lists',
  description:
    'A container that presents rows of data arranged in a single column, optionally providing the ability to select one or more members.',
  previewImageUrl: lists,
  category: 'Container',
  defaultInteractiveOptions: {
    dataSource: '',
  },
  defaultData: {
    sizeModifier: 'FULLWIDTH',
    backgroundColor: '#C6C6C6',
    pageSize: 1,
  },
  listItem: null,
  interactive: {
    dataSource: {
      type: 'string',
      name: 'Data Source',
    },
  },
  config: {
    sizeModifier,
    startPage,
    pageSize,
    shape: shapeConfigBuilder()
      .withRadius
      .withAllCornersRound
      .done(),
    backgroundColor,
    size,
  },
};

export default block;
