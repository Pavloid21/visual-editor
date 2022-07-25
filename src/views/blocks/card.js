import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {arrayMoveImmutable} from 'array-move';
import {sortableContainer} from 'react-sortable-hoc';
import {useSelector, useDispatch} from 'react-redux';
import Wrapper from 'utils/wrapper';
import {observer} from 'utils/observer';
import {onSortMove} from 'utils/hooks';
import renderHandlebars from 'utils/renderHandlebars';
import {hexToRgb} from 'constants/utils';
import {ItemTypes} from 'constants/actionTypes';
import card from 'assets/card.svg';
import {
  alignmentConfig, backgroundColor, corners, elevation, interactive,
  padding, shadowConfigBuilder,
  shapeConfigBuilder,
  sizeModifier,
} from 'views/configs';
import {pushBlockInside} from 'store/layout.slice';

const Card = styled.div`
  align-self: ${(props) => {
    switch (props.alignment) {
      case 'LEFT':
        return 'flex-start';
      case 'RIGHT':
        return 'flex-end';
      default:
        return 'stretch';
    }
  }};
  margin: ${(props) => {
    switch (props.alignment) {
      case 'CENTER':
        return 'auto';
      case 'LEFT':
        return 'auto auto auto 0';
      case 'RIGHT':
        return 'auto 0 auto auto';
      default:
        return '0 0';
    }
  }};
  box-sizing: border-box;
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: ${(props) => props.alignment};
  flex-direction: column;
  padding-top: ${(props) => props.padding?.top}px;
  padding-right: ${(props) => props.padding?.right}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  height: ${(props) => {
    if (props.size?.height !== undefined) {
      return props.size.height + 'px';
    } else if (props.size?.heightInPercent !== undefined) {
      return props.size.heightInPercent + '%';
    }
    return 'fit-content';
  }};
  overflow: hidden;
  box-shadow: ${(props) => {
    const RGB = hexToRgb(props.shadow?.color);
    return `${props.shadow?.offsetSize?.width}px ${props.shadow?.offsetSize?.height}px 8px rgba(${RGB?.r}, ${RGB?.g}, ${RGB?.b}, ${props.shadow?.opacity})`;
  }};
  border-radius: ${(props) => `
    ${props.corners?.topLeftRadius}px
    ${props.corners?.topRightRadius}px
    ${props.corners?.bottomRightRadius}px
    ${props.corners?.bottomLeftRadius}px
  `};
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItems, settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Card {...settingsUI} {...props} backgroundColor={backgroundColor} ref={drop} className="draggable">
        {listItems && renderHandlebars(listItems, 'document2').components}
      </Card>
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
    console.log('isActive', isActive);
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
  name: 'CARD',
  title: 'Card',
  description: 'Cards contain content and actions about a single subject.',
  previewImageUrl: card,
  category: 'Element',
  defaultInteractiveOptions: {
    action: {url: 'nextScreenName', fields: ['field1', 'field2'], target: ''},
  },
  defaultData: {
    elevation: 3,
    sizeModifier: 'FULLWIDTH',
    backgroundColor: '#C6C6C6',
    spacing: 16,
    padding: {
      top: 100,
      bottom: 100,
      left: 10,
      right: 10,
    },
    size: {
      height: 0,
    },
    shape: {
      type: 'ROUND',
      radius: 20,
    },
    corners: {
      topLeftRadius: 20,
      topRightRadius: 20,
      bottomLeftRadius: 0,
      bottomRightRadius: 0,
    },
    shadow: {
      color: '#000000',
      opacity: 0.5,
      offsetSize: {
        width: 0,
        height: 0,
      },
    },
  },
  listItems: [],
  config: {
    elevation,
    sizeModifier,
    alignment: alignmentConfig.horizontally,
    backgroundColor,
    shape: shapeConfigBuilder()
      .withAllCornersRound
      .withRadius
      .done(),
    corners,
    shadow: shadowConfigBuilder().done(),
    padding,
    size: {
      height: {
        type: 'units',
        name: 'Height',
        options: [
          {label: 'px', value: 'px'},
          {label: '%', value: '%'},
        ],
      },
    },
  },
  interactive,
};

export default block;
