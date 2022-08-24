import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {sortableContainer} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import {useDispatch, useSelector} from 'react-redux';
import {isNil} from 'external/lodash';
import Wrapper from 'utils/wrapper';
import {onSortMove} from 'utils/hooks';
import {observer} from 'utils/observer';
import renderHandlebars from 'utils/renderHandlebars';
import {hexToRgb} from 'constants/utils';
import {ItemTypes} from 'constants/actionTypes';
import vstack from 'assets/vstack.svg';
import {
  alignmentConfig,
  backgroundColor,
  corners,
  distribution,
  scroll,
  borderColor,
  borderWidth,
  spacing,
  padding,
  size,
  shadowConfigBuilder,
} from 'views/configs';
import {pushBlockInside} from 'store/layout.slice';

const VStack = styled.div`
  align-self: ${({alignment}) => {
    switch (alignment) {
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-end';
      default:
        return 'center';
    }
  }};
  margin: ${({alignment}) => {
    switch (alignment) {
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
  width: ${(props) => {
    if (!isNil(props.size?.width)) {
      return props.size.width + 'px';
    } else if (!isNil(props.size?.widthInPercent)) {
      return props.size.widthInPercent + '%';
    } else {
      return '100%';
    }
  }};
  height: ${(props) => {
    if (!isNil(props.size?.height)) {
      return props.size.height + 'px';
    } else if (!isNil(props.size?.heightInPercent)) {
      return props.size.heightInPercent + '%';
    }
    return '100%';
  }};
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: ${(props) => (props.distribution === 'SPACEBETWEEN' ? 'space-between' : props.distribution)};
  align-items: ${(props) => {
    switch (props.alignment) {
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-end';
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
  border-width: ${(props) => props.borderWidth}px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
  gap: ${(props) => props.spacing}px;
  border-radius: ${(props) => `
    ${props.corners?.topLeftRadius || 0}px
    ${props.corners?.topRightRadius || 0}px
    ${props.corners?.bottomRightRadius || 0}px
    ${props.corners?.bottomLeftRadius || 0}px
  `};
  ${(props) => {
    if (props.shadow) {
      return `box-shadow: ${props.shadow?.offsetSize?.width}px ${props.shadow?.offsetSize?.height}px ${props.shadow?.radius
        }px rgba(${hexToRgb(props.shadow?.color).r}, ${hexToRgb(props.shadow?.color).g}, ${hexToRgb(props.shadow?.color).b
        }, ${props.shadow?.opacity});`;
    }
  }}
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItems, settingsUI, ...props}) => {
  return (
    <Wrapper
      id={props.id}
      {...settingsUI}
      {...props}
      sizeModifier='FULLSIZE'
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
  name: 'VSTACK',
  title: 'Container',
  description: 'A view that arranges its children.',
  previewImageUrl: vstack,
  category: 'Container',
  defaultInteractiveOptions: {
    action: {url: '',  target: ''},
  },
  complex: [
    {label: 'Vertical', value: 'VSTACK'},
    {label: 'Horizontal', value: 'HSTACK'},
  ],
  defaultData: {
    backgroundColor: '#C6C6C6',
    distribution: '',
    spacing: 0,
    scroll: false,
    borderColor: '#EFEFEF',
    borderWidth: 1,
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
    shadow: {
      color: '#000000',
      opacity: 0,
      offsetSize: {
        width: 0,
        height: 0,
      },
      radius: 8,
    },
  },
  listItems: [],
  config: {
    alignment: alignmentConfig.horizontally,
    backgroundColor,
    distribution,
    spacing,
    scroll,
    borderColor,
    borderWidth,
    size,
    padding,
    shadow: shadowConfigBuilder().withRadius.done(),
    corners,
  },
  interactive: {
    action: {
      url: {
        type: 'select',
        name: 'Action URL',
        action_types: 'actions,data'
      },
      target: {type: 'string', name: 'Target'},
      method: {
        type: 'select',
        name: 'Method',
        options: [
          {label: 'Get', value: 'get'},
          {label: 'Post', value: 'post'},
        ],
      },
    },
  },
};

export default block;
