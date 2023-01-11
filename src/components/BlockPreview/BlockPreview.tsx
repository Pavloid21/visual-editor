import React from 'react';
import {useDrag} from 'react-dnd';
import {ItemTypes} from 'constants/actionTypes';
import {Container} from './BlockPreview.styled';
import {TBlockPreview} from './types';
import {pushBlockInside, pushBottomBar, pushTopAppBar} from 'store/layout.slice';
import {useAppDispatch, useAppSelector} from 'store';

const BlockPreview: React.FC<TBlockPreview> = (props) => {
  const {blocks} = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();

  const correctContainer = ['vstack', 'hstack'];
  const actualStateBlocks = Boolean(blocks.length);

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {id: props.blockId, type: props.type},
    end: (item, monitor) => {
      const dropResult: Record<string, any> | null = monitor.getDropResult();
      if (item && dropResult) {
        if (!actualStateBlocks && correctContainer.includes(item.id)) {
          dispatch(pushBlockInside({
            blockId: props.blockId,
            uuid: dropResult.uuid,
          }, true));
        } else if (item.id === 'topappbar') {
          dispatch(pushTopAppBar(item.id));
        } else if (item.id === 'bottombar') {
          dispatch(pushBottomBar(item.id));
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [actualStateBlocks]);
  const opacity = isDragging ? 0.4 : 1;

  return (
    <Container style={{opacity}} mode={props.mode} ref={drag}>
      <img src={props.image} alt={props.name} />
      <div>
        <p>{props.title}</p>
        {props.mode === 'list' && <p>{props.description}</p>}
      </div>
    </Container>
  );
};

export default BlockPreview;
