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
import {onSortMove} from 'utils/hooks';

const VStack = styled.div`
  align-self: ${(props) => {
    switch (props.alignment) {
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-end';
      default:
        return 'center';
    }
  }};
  margin: ${(props) => {
    switch (props.alignment) {
      case 'CENTER':
        return 'auto';
      case 'TOP':
        return '0 auto auto auto';
      case 'BOTTOM':
        return 'auto auto 0 auto';
      case 'LEFT':
        return 'auto auto auto 0';
      case 'RIGHT':
        return 'auto 0 auto auto';
      default:
        return '0 0';
    }
  }};
  width: ${(props) =>
    ['FULLWIDTH', 'FULLSIZE'].includes(props.sizeModifier) ? '100%' : 'fit-content'};
  height: ${(props) => (['FULLHEIGHT', 'FULLSIZE'].includes(props.sizeModifier) ? '100%' : 'fit-content')};
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  justify-content: ${(props) => (props.distribution === 'SPACEBETWEEN' ? 'space-between' : props.distribution)};
  align-items: ${(props) => {
    switch (props.alignment) {
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-start';
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
      {...props}
      sizeModifier='FULLSIZE'
      style={{
        alignItems: (() => {
          switch (props.alignment) {
            case 'LEFT':
              return 'self-start';
            case 'RIGHT':
              return 'self-end';
            case 'FILL':
              return 'stretch';
            default:
              return 'center';
          }
        })(),
      }}
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
      shouldCancelStart={onSortMove}
    />
  );
};

const block = {
  Component,
  name: 'VSTACK',
  title: 'Container',
  description: 'A view that arranges its children.',
  previewImageUrl: vstack,
  category: 'Container',
  complex: [
    {label: 'Vertical', value: 'VSTACK'},
    {label: 'Horizontal', value: 'HSTACK'},
  ],
  defaultData: {
    sizeModifier: 'FULLSIZE',
    alignment: 'CENTER',
    backgroundColor: '#C6C6C6',
    distribution: '',
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
    sizeModifier: {
      type: 'select',
      name: 'Size modifier',
      options: [
        {label: 'Full width', value: 'FULLWIDTH'},
        {label: 'Full height', value: 'FULLHEIGHT'},
        {label: 'Full size', value: 'FULLSIZE'},
      ],
    },
    alignment: {
      type: 'select',
      name: 'Alignment',
      options: [
        {label: 'Center', value: 'CENTER'},
        {label: 'Left', value: 'LEFT'},
        {label: 'Right', value: 'RIGHT'},
        {label: 'Top', value: 'TOP'},
        {label: 'Bottom', value: 'BOTTOM'},
      ],
    },
    backgroundColor: {type: 'color', name: 'Background color'},
    distribution: {
      type: 'select',
      name: 'Distribution',
      options: [{label: 'Space between', value: 'SPACEBETWEEN'}],
    },
    spacing: {type: 'number', name: 'Spacing'},
    scroll: {
      type: 'select',
      name: 'Scroll',
      options: [
        {label: 'Enable scroll', value: true},
        {label: 'Disable scroll', value: false},
      ],
    },
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
