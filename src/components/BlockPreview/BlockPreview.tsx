import React from 'react';
import {useDrag} from 'react-dnd';
import actionTypes, {ItemTypes} from 'constants/actionTypes';
import {useDispatch} from 'react-redux';
import {Container} from './BlockPreview.styled';
import {TBlockPreview} from './types';

const BlockPreview: React.FC<TBlockPreview> = (props) => {
  const dispatch = useDispatch();
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {id: props.blockId, type: props.type},
    end: (item, monitor) => {
      const dropResult: Record<string, any> | null = monitor.getDropResult();
      if (item && dropResult) {
        if (!dropResult.uuid && item.id !== 'bottombar' && item.id !== 'topappbar') {
          props.onPushBlock(props.blockId);
        } else if (item.id === 'bottombar' || item.id === 'topappbar') {
          dispatch({
            type: item.id === 'bottombar' ? actionTypes.PUSH_BOTTOMBAR : actionTypes.PUSH_TOPAPPBAR,
            blockId: item.id,
          });
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
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
