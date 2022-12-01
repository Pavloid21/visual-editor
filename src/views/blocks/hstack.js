import React from 'react';
import {useDrop} from 'react-dnd';
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
  distribution,
  scroll,
  borderColor,
  borderWidth,
  spacing,
  padding,
  shadowConfigBuilder,
  getSizeConfig,
  interactive,
  shapeConfigBuilder
} from 'views/configs';
import hstack from 'assets/hstack.svg';
import {pushBlockInside} from 'store/layout.slice';
import {hexToRgb} from 'constants/utils';
import {findParentInTree} from 'utils/blocks';
import {blockStateSafeSelector} from 'store/selectors';
import store, {useAppDispatch, useAppSelector} from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';

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
        return '0 auto auto auto';
    }
  }};
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  display: flex;
  justify-content: ${(props) => (props.distribution === 'SPACEBETWEEN' ? 'space-between' : props.distribution)};
  text-align: ${(props) => props.alignment};
  flex-direction: row;
  align-items: ${(props) => {
    switch(props.alignment) {
      case 'CENTER':
        return 'center';
      case 'TOP':
        return 'start';
      case 'BOTTOM':
        return 'end';
    }
  }};
  ${(props) => getDimensionStyles(props)
    .padding()
    .borderRadius()
    .apply()
  }
  border-width: ${(props) => props.borderWidth || 0}px;
  border-style: solid;
  border-color: ${(props) => props.borderColor || 'transparent'};
  gap: ${(props) => props.spacing || 0}px;
  position: relative;
  ${(props) => {
    if (props.shadow) {
      return `box-shadow: ${props.shadow?.offsetSize?.width}px ${props.shadow?.offsetSize?.height}px ${props.shadow?.radius
        }px rgba(${hexToRgb(props.shadow?.color).r}, ${hexToRgb(props.shadow?.color).g}, ${hexToRgb(props.shadow?.color).b
        }, ${props.shadow?.opacity});`;
    }
  }}
  ${(props) => {
    if (props.shape?.type === 'ALLCORNERSROUND') {
      return `border-radius: ${props.shape.radius}px;`;
    }
  }}
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItems, settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <HStack {...settingsUI} {...props} backgroundColor={backgroundColor} ref={drop} className="draggable">
        {listItems && renderHandlebars(listItems, 'document2').components}
      </HStack>
    </Wrapper>
  );
});

const Component = ({settingsUI, uuid, listItems, ...props}) => {
  const dispatch = useAppDispatch();
  const {layout} = useAppSelector((state) => state);
  const isRoot = !findParentInTree(layout.blocks, uuid);
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
      isRoot={isRoot}
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
      action: {url: '', fields: {}},
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
      shape: shapeConfigBuilder()
        .withAllCornersRound
        .withRadius
        .done(),
      size: getSizeConfig(blockState.deviceInfo.device),
      padding,
      shadow: shadowConfigBuilder().withRadius.done(),
    },
    interactive,
  });
};

export default block;
