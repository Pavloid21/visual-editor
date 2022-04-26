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
import box from '../../assets/box.svg';
import Wrapper from '../../utils/wrapper';
import {onSortMove} from 'utils/hooks';
import {hexToRgb} from 'constants/utils';

const Box = styled.div`
  border: ${(props) => `${props.borderWidth}px solid ${props.borderColor}`};
  width: ${(props) => (props.size?.width ? props.size.width + 'px' : '100%')};
  height: ${(props) => props.size?.height}px;
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: ${(props) => {
    const RGB = hexToRgb(props.shadow?.color);
    return `${props.shadow?.offsetSize?.width}px ${props.shadow?.offsetSize?.height}px 8px rgba(${RGB?.r}, ${RGB?.g}, ${RGB?.b}, ${props.shadow?.opacity})`;
  }};
  border-radius: ${(props) => `${props.shape?.radius}px`};
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItems, settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI}>
      <Box {...settingsUI} {...props} ref={drop} backgroundColor={backgroundColor} className="draggable">
        {listItems && renderHandlebars(listItems, 'document2').components}
      </Box>
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
  name: 'BOX',
  title: 'Box',
  description: 'A stylized view, with an optional label, that visually collects a logical grouping of content.',
  previewImageUrl: box,
  category: 'Container',
  defaultData: {
    borderColor: '#EFEFEF',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    size: {
      height: 56,
      width: 100,
    },
    shape: {
      type: 'ALLCORNERSROUND',
      radius: 4,
    },
    shadow: {
      color: '#000000',
      opacity: 0.3,
      offsetSize: {
        width: 0,
        height: 0,
      },
      radius: 8,
    },
  },
  listItems: [],
  config: {
    borderColor: {type: 'color', name: 'Border color'},
    borderWidth: {type: 'number', name: 'Border width'},
    backgroundColor: {type: 'color', name: 'Background color'},
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
    shape: {
      type: {
        type: 'select',
        name: 'Shape type',
        options: [{label: 'All corners round', value: 'ALLCORNERSROUND'}],
      },
      radius: {type: 'number', name: 'Shape radius'},
    },
    shadow: {
      color: {type: 'color', name: 'Shadow color'},
      opacity: {type: 'number', name: 'Opacity'},
      offsetSize: {
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
    },
  },
};

export default block;
