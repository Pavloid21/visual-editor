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
import collection from '../../assets/collection.svg';
import Wrapper from '../../utils/wrapper';
import {onSortMove} from 'utils/hooks';

const Collection = styled.div`
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
  width: ${(props) => {
    if (props.size?.width !== undefined) {
      return props.size.width + 'px';
    } else if (props.size?.widthInPercent !== undefined) {
      return props.size.widthInPercent + '%';
    }
    return '100%';
  }};
  height: ${(props) => {
    if (props.size?.height !== undefined) {
      return props.size.height + 'px';
    } else if (props.size?.heightInPercent !== undefined) {
      return props.size.heightInPercent + '%';
    }
    return 'auto';
  }};
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
  flex-direction: column;
  box-sizing: border-box;
  & > div {
    display: grid;
    grid-template-columns: repeat(${(props) => props.collectionUiConfig?.itemsInHorisontal}, 1fr);
    grid-auto-rows: ${(props) => props.collectionUiConfig?.pointHeight}px;
    grid-gap: ${(props) => props.spacing}px;
  }
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItem, settingsUI, ...props}) => {
  return (
    <Wrapper
      id={props.id}
      {...settingsUI}
      {...props}
    >
      <Collection {...settingsUI} {...props} ref={drop} backgroundColor={backgroundColor} className="draggable">
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
  name: 'COLLECTION',
  title: 'Collection',
  description:
    'A container that presents rows of data arranged in a single column, optionally providing the ability to select one or more members.',
  previewImageUrl: collection,
  category: 'Container',
  defaultInteractiveOptions: {
    dataSource: '',
  },
  defaultData: {
    alignment: 'CENTER',
    backgroundColor: '#C6C6C6',
    spacing: 16,
    size: {
      height: 300,
      width: '',
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
    },
  },
  listItem: null,
  interactive: {
    dataSource: {
      type: 'string',
      name: 'Data Source',
    },
  },
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
    spacing: {type: 'number', name: 'Spacing'},
    size: {
      height: {
        type: 'units',
        name: 'Height',
        options: [
          {label: 'px', value: 'px'},
          {label: '%', value: '%'},
        ],
      },
      width: {
        type: 'units',
        name: 'Width',
        options: [
          {label: 'px', value: 'px'},
          {label: '%', value: '%'},
        ],
      },
    },
    padding: {
      left: {type: 'number', name: 'Left'},
      top: {type: 'number', name: 'Top'},
      right: {type: 'number', name: 'Right'},
      bottom: {type: 'number', name: 'Bottom'},
    },
    collectionUiConfig: {
      metricStyle: {type: 'string', name: 'Metric style'},
      pointHeight: {type: 'number', name: 'Point height'},
      itemsInHorisontal: {type: 'number', name: 'Items in horizontal'},
    },
  },
};

export default block;
