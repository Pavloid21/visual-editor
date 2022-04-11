import React from 'react';
import {useDrop} from 'react-dnd';
import {ItemTypes} from '../../constants/actionTypes';
import renderHandlebars from '../../utils/renderHandlebars';
import styled from 'styled-components';
import {observer} from '../../utils/observer';
import {sortableContainer} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import lists from '../../assets/lists.svg';
import Wrapper from '../../utils/wrapper';

const List = styled.div`
  height: 100%;
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  padding: 4px 0px;
  align-items: ${(props) => props.alignment};
  flex-direction: column;
  box-sizing: border-box;
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItem, settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id}>
      <List {...settingsUI} {...props} ref={drop} backgroundColor={backgroundColor} className="draggable">
        {listItem && renderHandlebars([listItem], 'document2').components}
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
  category: 'Layouts',
  defaultInteractiveOptions: {
    dataSource: '',
  },
  defaultData: {
    alignment: 'CENTER',
    backgroundColor: '#C6C6C6',
  },
  listItem: null,
  interactive: {
    dataSource: {
      type: 'string',
      name: 'Data Source',
    },
  },
  config: {
    alignment: {
      type: 'select',
      name: 'Alignment',
      options: [
        {label: 'Center', value: 'CENTER'},
        {label: 'Left', value: 'LEFT'},
        {label: 'Right', value: 'RIGHT'},
        {label: 'Justify', value: 'JUSTIFY'},
        {label: 'Fill', value: 'FILL'},
      ],
    },
    backgroundColor: {type: 'color', name: 'Background color'},
  },
};

export default block;
