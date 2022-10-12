import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {sortableContainer} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import {useDispatch, useSelector} from 'react-redux';
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
  shadowConfigBuilder,
  getSizeConfig,
  interactive
} from 'views/configs';
import {pushBlockInside} from 'store/layout.slice';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getSizeStyle} from 'views/utils/styles/size';

const VStack = styled.div`
  align-self: ${({alignment}) => {
    switch (alignment) {
      case 'CENTER':
        return 'center';
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
  margin: ${({alignment}) => {
    switch (alignment) {
      case 'CENTER':
        return '0 0';
      case 'TOP':
        return '0 auto auto auto';
      case 'BOTTOM':
        return 'auto auto 0 auto';
      case 'LEFT':
        return '0 0';
      case 'RIGHT':
        return '0 0';
      default:
        return '0 0';
    }
  }};
  width: ${(props) => {
    if (['FULLWIDTH', 'FULLSIZE'].includes(props.sizeModifier)) {
      return '100%';
    }
    return getSizeStyle('width', props);
  }};
  height: ${(props) => {
    if (['FULLHEIGHT', 'FULLSIZE'].includes(props.sizeModifier)) {
      return '100%';
    }
    return getSizeStyle('height', props);
  }};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  display: flex;
  justify-content: ${(props) => (props.distribution === 'SPACEBETWEEN' ? 'space-between' : props.distribution)};
  align-items: ${(props) => {
    switch (props.alignment) {
      case 'CENTER':
        return 'center';
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
  flex-direction: column;
  padding-top: ${(props) => props.padding?.top || 0}px;
  padding-bottom: ${(props) => props.padding?.bottom || 0}px;
  padding-left: ${(props) => props.padding?.left || 0}px;
  padding-right: ${(props) => props.padding?.right || 0}px;
  box-sizing: border-box;
  border-width: ${(props) => props.borderWidth || 0}px;
  border-style: ${(props) => props.borderColor ? 'solid' : 'none'};
  border-color: ${(props) => props.borderColor || 'transparent'};
  gap: ${(props) => props.spacing || 0}px;
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
      <VStack
        {...settingsUI}
        {...props}
        ref={drop}
        backgroundColor={backgroundColor}
        className="draggable"
      >
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

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'VSTACK',
    title: 'Container',
    description: 'A view that arranges its children.',
    previewImageUrl: vstack,
    category: 'Container',
    defaultInteractiveOptions: {
      action: {url: '',  target: '', fields: {}},
    },
    complex: [
      {label: 'Vertical', value: 'VSTACK'},
      {label: 'Horizontal', value: 'HSTACK'},
    ],
    defaultData: {
      size: {
        heightInPercent: 50,
        widthInPercent: 100,
      },
      backgroundColor: '#e3e3e3',
      distribution: '',
      spacing: 0,
      scroll: false,
      borderColor: '#e3e3e3',
      borderWidth: 0,
      padding: {
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
      },
      shadow: {
        color: '#000000',
        opacity: 0,
        offsetSize: {
          width: 0,
          height: 0,
        },
        radius: 0,
      },
    },
    listItems: [],
    interactive,
    config: {
      alignment: alignmentConfig.horizontally,
      backgroundColor,
      distribution,
      spacing,
      scroll,
      borderColor,
      borderWidth,
      size: getSizeConfig(blockState.deviceInfo.device),
      padding,
      shadow: shadowConfigBuilder().withRadius.done(),
      corners,
    },
  });
};

export default block;
