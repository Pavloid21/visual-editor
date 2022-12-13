import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {arrayMoveImmutable} from 'array-move';
import {sortableContainer} from 'react-sortable-hoc';
import Wrapper from 'utils/wrapper';
import {observer} from 'utils/observer';
import {onSortMove} from 'utils/hooks';
import renderHandlebars from 'utils/renderHandlebars';
import {hexToRgb} from 'constants/utils';
import {ItemTypes} from 'constants/actionTypes';
import card from 'assets/card.svg';
import {
  backgroundColor, elevation, getSizeConfig,
  padding, shadowConfigBuilder,
  shapeConfigBuilder, interactive
} from 'views/configs';
import {pushBlockInside} from 'store/layout.slice';
import {blockStateSafeSelector} from 'store/selectors';
import store, {useAppDispatch, useAppSelector} from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';
import {transformHexWeb} from '../../utils/color';

const Card = styled.div`
  align-self: stretch;
  box-sizing: border-box;
  border: ${(props) => props.border};
  background-color: ${(props) => transformHexWeb(props.backgroundColor)};
  display: flex;
  flex-direction: column;
  ${(props) => getDimensionStyles(props)
    .height()
    .padding()
    .borderRadius()
    .apply()
  }
  overflow: hidden;
  box-shadow: ${(props) => {
    const color = transformHexWeb(props.shadow?.color);
    const RGB = hexToRgb(color);
    return `${props.shadow?.offsetSize?.width}px ${props.shadow?.offsetSize?.height}px 8px rgba(${RGB?.r}, ${RGB?.g}, ${RGB?.b}, ${props.shadow?.opacity})`;
  }};
  ${(props) => {
    if (props.shape?.type === 'ALLCORNERSROUND') {
      return `border-radius: ${props.shape.radius}px;`;
    }
  }}
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItems, settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Card
        {...settingsUI}
        {...props}
        backgroundColor={backgroundColor}
        ref={drop}
        className="draggable"
      >
        {listItems && renderHandlebars(listItems, 'document2').components}
      </Card>
    </Wrapper>
  );
});

const Component = ({settingsUI, uuid, listItems, ...props}) => {
  const dispatch = useAppDispatch();
  const {layout} = useAppSelector((state) => state);
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
    name: 'CARD',
    title: 'Card',
    description: 'Cards contain content and actions about a single subject.',
    previewImageUrl: card,
    category: 'Element',
    defaultInteractiveOptions: {
      action: {url: '', fields: {}},
    },
    defaultData: {
      elevation: 3,
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
      backgroundColor,
      shape: shapeConfigBuilder()
        .withAllCornersRound
        .withRadius
        .done(),
      shadow: shadowConfigBuilder().done(),
      padding,
      size: {
        height: getSizeConfig(blockState.deviceInfo.device).height,
      },
    },
    interactive,
  });
};

export default block;
