import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {arrayMoveImmutable} from 'array-move';
import {sortableContainer} from 'react-sortable-hoc';
import {useDispatch, useSelector} from 'react-redux';
import Wrapper from 'utils/wrapper';
import {onSortMove} from 'utils/hooks';
import {observer} from 'utils/observer';
import renderHandlebars from 'utils/renderHandlebars';
import {ItemTypes} from 'constants/actionTypes';
import screen from 'assets/screen.svg';
import {
  backgroundColor,
  spacing,
  size,
  padding
} from 'views/configs';
import {pushBlockInside} from 'store/layout.slice';
import {pageSize, shadowConfigBuilder, shapeConfigBuilder, startPage} from '../configs/index';

const VStack = styled.div`
  align-self: center;
  width: fit-content;
  height: fit-content;
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  justify-content: ${(props) => (props.distribution === 'SPACEBETWEEN' ? 'space-between' : props.distribution)};
  align-items: center;
  flex-direction: column;
  padding-top: ${(props) => props.padding?.top || 5}px;
  padding-bottom: ${(props) => props.padding?.bottom || 5}px;
  padding-left: ${(props) => props.padding?.left || 5}px;
  padding-right: ${(props) => props.padding?.right || 5}px;
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
      {...props}
      sizeModifier="FULLSIZE"
      style={{alignItems: 'center'}}
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

const block = {
  Component,
  name: 'SCREEN',
  title: 'Screen',
  description: 'A view that arranges its children.',
  previewImageUrl: screen,
  category: 'Container',
  defaultInteractiveOptions: {
    id: 'Screen',
    url: ''
  },
  defaultData: {
    backgroundColor: '#C6C6C6',
    wrapContent: '',
    spacing: 0,
    pageSize: {
      type: 'number',
      name: 'Page size',
    },
    startPage: {
      type: 'number',
      name: 'Start page',
    },
    shadow: {
      offsetSize: {
        width: 0,
        height: 0,
      },
      radius: 8,
    },
    size: {
      heightInPercent: 100,
      widthInPercent: 100,
    }
  },
  listItems: [],
  config: {
    backgroundColor,
    spacing,
    size,
    padding,
    startPage,
    pageSize,
    shape: shapeConfigBuilder().withAllCornersRound.withRadius.done(),
    shadow: shadowConfigBuilder()
      .withRadius
      .done(),
  },
  interactive: {
    id: {type: 'string', name: 'Screen name'},
    url: {type: 'string', name: 'URL'},
  }
};

export default block;
