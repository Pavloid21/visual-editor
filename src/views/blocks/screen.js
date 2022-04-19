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
import screen from '../../assets/screen.svg';
import Wrapper from '../../utils/wrapper';

const VStack = styled.div`
  width: ${(props) => (props.sizeModifier === 'FULLWIDTH' ? '100%' : 'auto')};
  flex: ${(props) => (props.wrapContent === 'WRAPCONTENTHEIGHT' ? '0 1 auto' : '1 1 auto')};
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  justify-content: ${(props) => (props.distribution === 'SPACEBETWEEN' ? 'space-between' : props.distribution)};
  align-items: ${(props) => {
    switch (props.alignment) {
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-start';
      case 'JUSTIFY':
        return 'stretch';
      default:
        return 'center';
    }
  }};
  flex-direction: column;
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
  box-sizing: border-box;
  gap: ${(props) => props.spacing}px;
  border-radius: ${(props) => `
    ${props.corners?.topLeftRadius || 0}px 
    ${props.corners?.topRightRadius || 0}px 
    ${props.corners?.bottomRightRadius || 0}px
    ${props.corners?.bottomLeftRadius || 0}px 
  `};
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItems, settingsUI, ...props}) => {
  return (
    <Wrapper
      id={props.id}
      {...settingsUI}
      scroll={props.scroll}
      style={{flex: props.wrapContent === 'WRAPCONTENTHEIGHT' ? '0 1 auto' : '1 1 auto'}}
    >
      <VStack {...settingsUI} {...props} ref={drop} backgroundColor={backgroundColor} className="draggable">
        {listItems && renderHandlebars(listItems, 'document2').components}
      </VStack>
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
  name: 'SCREEN',
  title: 'Screen',
  description: 'A view that arranges its children.',
  previewImageUrl: screen,
  category: 'Layouts',
  defaultData: {
    alignment: 'CENTER',
    backgroundColor: '#C6C6C6',
    wrapContent: '',
    spacing: 0,
  },
  listItems: [],
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
    wrapContent: {type: 'string', name: 'Wrap content'},
    spacing: {type: 'number', name: 'Spacing'},
  },
};

export default block;
