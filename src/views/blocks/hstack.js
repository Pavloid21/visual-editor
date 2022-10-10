import React from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {sortableContainer} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import Wrapper from 'utils/wrapper';
import {onSortMove} from 'utils/hooks';
import {observer} from 'utils/observer';
import renderHandlebars from 'utils/renderHandlebars';
import {ItemTypes} from 'constants/actionTypes';
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
import hstack from 'assets/hstack.svg';
import {pushBlockInside} from 'store/layout.slice';
import {hexToRgb} from 'constants/utils';
import {getSizeStyle} from '../utils/styles/size';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';

const HStack = styled.div`
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
  width: ${(props) => getSizeStyle('width', props)};
  height: ${(props) => getSizeStyle('height', props)};
  background-color: ${(props) => props.backgroundColor || '#FFFFFF00'};
  display: flex;
  justify-content: ${(props) => (props.distribution === 'SPACEBETWEEN' ? 'space-between' : props.distribution)};
  text-align: ${(props) => props.alignment};
  flex-direction: row;
  align-items: center;
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
  border-width: ${(props) => props.borderWidth}px;
  border-style: solid;
  border-color: ${(props) => props.borderColor || '#FFFFFF00'};
  gap: ${(props) => props.spacing}px;
  position: relative;
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
    <Wrapper id={props.id} {...settingsUI} {...props} sizeModifier="FULLSIZE">
      <HStack {...settingsUI} {...props} backgroundColor={backgroundColor} ref={drop} className="draggable">
        {listItems && renderHandlebars(listItems, 'document2').components}
      </HStack>
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
      axis="x"
      drop={drop}
      backgroundColor={backgroundColor}
      onSortEnd={onSortEnd}
      listItems={listItems}
      {...props}
      settingsUI={settingsUI}
      distance={1}
      shouldCancelStart={onSortMove}
    />
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'HSTACK',
    title: 'HStack',
    description: 'A view that arranges its children in a horizontal line.',
    previewImageUrl: hstack,
    category: 'Container',
    defaultInteractiveOptions: {
      action: {url: '', target: ''},
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
      alignment: alignmentConfig.vertically,
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
    interactive,
  });
};

export default block;
