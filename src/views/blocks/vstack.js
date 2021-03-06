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
import vstack from '../../assets/vstack.svg';
import Wrapper from '../../utils/wrapper';

const VStack = styled.div`
  flex: ${(props) => (props.wrapContent === 'WRAPCONTENTHEIGHT' ? '0 1 auto' : '1 1 auto')};
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  justify-content: ${(props) => (props.distribution === 'SPACEBETWEEN' ? 'space-between' : props.alignment)};
  align-items: ${(props) => props.alignment};
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
  name: 'VSTACK',
  title: 'Container',
  description: 'A view that arranges its children.',
  previewImageUrl: vstack,
  category: 'Layouts',
  complex: [
    {label: 'Vertical', value: "VSTACK"},
    {label: 'Horizontal', value: "HSTACK"}
  ],
  defaultData: {
    alignment: 'CENTER',
    backgroundColor: '#C6C6C6',
    distribution: '',
    wrapContent: '',
    spacing: 0,
    scroll: false,
    padding: {
      top: '100',
      bottom: '100',
      left: '10',
      right: '10',
    },
    corners: {
      topLeftRadius: 0,
      topRightRadius: 0,
      bottomLeftRadius: 0,
      bottomRightRadius: 0,
    },
  },
  listItems: [],
  config: {
    alignment: {type: 'string', name: 'Alignment'},
    backgroundColor: {type: 'color', name: 'Background color'},
    distribution: {type: 'string', name: 'Distribution'},
    wrapContent: {type: 'string', name: 'Wrap content'},
    spacing: {type: 'number', name: 'Spacing'},
    scroll: {type: 'boolean', name: 'Scroll'},
    padding: {
      top: {
        type: 'number',
        name: 'Top',
      },
      bottom: {
        type: 'number',
        name: 'Bottom',
      },
      left: {
        type: 'number',
        name: 'Left',
      },
      right: {
        type: 'number',
        name: 'Right',
      },
    },
    corners: {
      topLeftRadius: {
        type: 'number',
        name: 'Top left radius',
      },
      topRightRadius: {
        type: 'number',
        name: 'Top right radius',
      },
      bottomLeftRadius: {
        type: 'number',
        name: 'Bottom left radius',
      },
      bottomRightRadius: {
        type: 'number',
        name: 'Bottom right radius',
      },
    },
  },
};

export default block;
