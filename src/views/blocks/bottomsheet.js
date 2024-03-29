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
import bottomsheet from '../../assets/bottomsheet.svg';
import Wrapper from '../../utils/wrapper';

const BottomSheet = styled.div`
  margin-top: auto;
  overflow: hidden;
  background-color: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  display: flex;
  height: ${(props) =>
    props.bottomSheetState === 'EXPANDED' ? props.size?.heightInPercent : props.bottomSheetCollapsePercent}%;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: ${(props) => `
    ${props.shape?.radius || 0}px 
    ${props.shape?.radius || 0}px 
    ${props.shape?.radius || 0}px
    ${props.shape?.radius || 0}px 
  `};
`;

const SortableContainer = sortableContainer(({drop, backgroundColor, listItems, settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} style={{height: '100%', position: 'absolute', zIndex: '100'}}>
      <BottomSheet {...settingsUI} {...props} ref={drop} backgroundColor={backgroundColor} className="draggable">
        {listItems && renderHandlebars(listItems, 'document2').components}
      </BottomSheet>
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
    />
  );
};

const block = {
  Component,
  name: 'BOTTOMSHEET',
  title: 'BottomSheet',
  description:
    'A view that display content that complements the screen’s primary content. View remain visible while users interact with the primary content.',
  previewImageUrl: bottomsheet,
  category: 'Layouts',
  defaultData: {
    backgroundColor: '#EFEFEF',
    bottomSheetState: 'EXPANDED',
    bottomSheetCollapsePercent: 7.5,
    shape: {
      type: 'ALLCORNERSROUND',
      radius: 24,
    },
    size: {
      heightInPercent: 85,
    },
  },
  listItems: [],
  config: {
    backgroundColor: {type: 'color', name: 'Background color'},
    bottomSheetState: {type: 'string', name: 'Bottom sheet state'},
    bottomSheetCollapsePercent: {type: 'number', name: 'Bottom sheet collapse percent'},
    shape: {
      type: {
        type: 'string',
        name: 'Shape type',
      },
      radius: {
        type: 'number',
        name: 'Radius',
      },
    },
    size: {
      heightInPercent: {
        type: 'number',
        name: 'Height in percent',
      },
    },
  },
};

export default block;
