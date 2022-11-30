import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {arrayMoveImmutable} from 'array-move';
import {sortableContainer} from 'react-sortable-hoc';
import {useDispatch, useSelector} from 'react-redux';
import renderHandlebars from 'utils/renderHandlebars';
import Wrapper from 'utils/wrapper';
import {onSortMove} from 'utils/hooks';
import {observer} from 'utils/observer';
import {ItemTypes} from 'constants/actionTypes';
import {
  backgroundColor,
  getSizeConfig,
  padding,
  spacing,
  shapeConfigBuilder,
  metricStyle,
  dataSourceSettings,
} from 'views/configs';
import collection from 'assets/collection.svg';
import {pushBlockInside} from 'store/layout.slice';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';

const Collection = styled.div`
  align-self: center;
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  ${(props) => getDimensionStyles(props)
    .width()
    .height()
    .padding()
    .apply()
  }
  flex-direction: column;
  box-sizing: border-box;
  ${(props) => {
    if (props.shape?.type === 'ALLCORNERSROUND') {
      return `border-radius: ${props.shape?.radius || 0}px;`;
  } else if (props.shape?.type === 'TOPCORNERSROUND') {
      return `border-top-left-radius: ${props.shape?.radius || 0}px; border-top-right-radius: ${props.shape?.radius || 0}px;`;
  }
}}
  ${(props) => {
    if (props.collectionUiConfig?.scrollDirection === 'vertical') {
      return 'overflow-y: scroll; overflow-x: hidden;';
  }
    if (props.collectionUiConfig?.scrollDirection === 'horizontal') {
      return 'overflow-x: scroll; overflow-y: hidden;';
  }
}}
  & > div {
    display: grid;
    grid-template-columns: repeat(${(props) => props.collectionUiConfig?.itemsInHorisontal}, ${(props) => +props.collectionUiConfig?.pointWidth > 0 ? props.collectionUiConfig?.pointWidth + 'px' : '1fr'});
    grid-template-rows: repeat(${(props) => props.collectionUiConfig?.itemsInVertical}, ${(props) => +props.collectionUiConfig?.pointHeight > 0 ? +props.collectionUiConfig?.pointHeight + 'px' : '1fr'});
    overflow-x: inherit;
    overflow-y: inherit;
    grid-gap: ${(props) => props.spacing || 0}px;
    background-color: ${(props) => props.collectionUiConfig?.cellBackgroundColor || 'transparent'};
}
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItem, settingsUI, ...props}) => {
  return (
    <Wrapper
      id={props.id}
      {...settingsUI}
      {...props}
    >
      <Collection
        {...settingsUI}
        {...props}
        ref={drop}
        backgroundColor={backgroundColor}
        className="draggable"
      >
        <div>{listItem && renderHandlebars([listItem], 'document2').components}</div>
      </Collection>
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
    name: 'COLLECTION',
    title: 'Collection',
    description:
      'A container that presents rows of data arranged in a single column, optionally providing the ability to select one or more members.',
    previewImageUrl: collection,
    category: 'Container',
    defaultInteractiveOptions: {
      dataSource: '',
      startPage: 0,
      pageSize: 20,
    },
    defaultData: {
      backgroundColor: '',
      spacing: 16,
      size: {
        heightInPercent: 50,
        widthInPercent: 100,
      },
      padding: {
        left: 16,
        top: 16,
        right: 16,
        bottom: 16,
      },
      collectionUiConfig: {
        metricStyle: 'pointsAndItemsIn',
        pointHeight: 121,
        itemsInHorisontal: 2,
        itemsInVertical: 1,
        scrollDirection: 'vertical',
      },
    },
    listItem: null,
    interactive: {
      dataSource: dataSourceSettings.dataSource,
      startPage: dataSourceSettings.startPage,
      pageSize: dataSourceSettings.pageSize,

    },
    config: {
      backgroundColor,
      spacing,
      size: getSizeConfig(blockState.deviceInfo.device),
      padding,
      shape: shapeConfigBuilder().withRadius.withAllCornersRound.withTopCornersRound.done(),
      collectionUiConfig: {
        cellBackgroundColor: {type: 'color', name: 'Cell background color'},
        metricStyle,
        scrollDirection: {
          type: 'select', name: 'Scroll direction', options: [
            {label: 'Vertical', value: 'vertical'},
            {label: 'Horizontal', value: 'horizontal'}
          ]
        },
        pointHeight: {type: 'number', name: 'Point height', relations: {metricStyle: ['pointsAndItemsIn', 'points']}},
        pointWidth: {type: 'number', name: 'Point width', relations: {metricStyle: ['pointsAndItemsIn', 'points']}},
        itemsInHorisontal: {type: 'number', name: 'Items in horizontal', relations: {metricStyle: ['pointsAndItemsIn', 'itemsInAndProportional', 'itemsIn']}},
        itemsInVertical: {type: 'number', name: 'Items in vertical', relations: {metricStyle: ['pointsAndItemsIn', 'itemsInAndProportional', 'itemsIn']}},
        widthToHeight: {type: 'number', name: 'Width to height', relations: {metricStyle: ['itemsInAndProportional']}},
        heightToWidth: {type: 'number', name: 'Height to width', relations: {metricStyle: ['itemsInAndProportional']}},
      },
    },
  });
};

export default block;
