import React from 'react';
import PropTypes from 'prop-types';
import {useDrag} from 'react-dnd';
import {ItemTypes} from '../constants/actionTypes';
import {useDispatch} from 'react-redux';
import actionTypes from '../constants/actionTypes';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px dashed #b3b3b3;
  box-sizing: border-box;
  border-radius: 4px;
  ${(props) => props.mode === 'list' && 'margin: 10px 0px; padding: 16px;'};
  width: ${(props) => (props.mode === 'grid' ? '118px' : '390px')};
  height: ${(props) => (props.mode === 'grid' ? '118px' : '92px')};
  ${(props) => props.mode === 'list' && 'display: flex; gap: 20px; align-items: center;'}
  ${(props) => props.mode === 'grid' && 'flex: 1 1 30%;'}
  text-align: ${(props) => (props.mode === 'grid' ? 'center' : 'left')};
  @media (max-width: 1500px) {
    width: ${(props) => (props.mode === 'grid' ? '118px' : '270px')};
  }
  & img {
    margin-top: ${(props) => (props.mode === 'grid' ? '16px' : '0px')};
    width: 60px;
    height: 60px;
  }
  & p {
    padding: ${(props) => (props.mode === 'grid' ? '13px 8px' : '0px')};
    margin-bottom: ${(props) => (props.mode === 'grid' ? '0' : '2px')};
    font-size: 12px;
    line-height: 16px;
    overflow-wrap: break-word;
    @media (max-width: 1500px) {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const BlockPreview = (props) => {
  const dispatch = useDispatch();
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {id: props.blockId, type: props.type},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
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

BlockPreview.propTypes = {
  blockId: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  onPushBlock: PropTypes.func,
};

export default BlockPreview;
