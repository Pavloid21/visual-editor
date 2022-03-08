import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants/actionTypes";
import { useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";
import styled from "styled-components";

const Container = styled.div`
  border: 1px dashed #b3b3b3;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  width: 118px;
  height: 118px;
  flex: 1 1 30%;
  text-align: center;
  & img {
    width: 60px;
    height: 60px;
  }
  & p {
    margin-top: 13px;
    margin-bottom: 0;
    font-size: 12px;
    line-height: 16px;
    overflow-wrap: break-word;
  }
`;

const BlockPreview = (props) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id: props.blockId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (
          !dropResult.uuid &&
          item.id !== "bottombar" &&
          item.id !== "topappbar"
        ) {
          props.onPushBlock(props.blockId);
        } else if (item.id === "bottombar" || item.id === "topappbar") {
          dispatch({
            type:
              item.id === "bottombar"
                ? actionTypes.PUSH_BOTTOMBAR
                : actionTypes.PUSH_TOPAPPBAR,
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
    <Container style={{ opacity }} ref={drag}>
      <img src={props.image} alt={props.name} />
      <p>{props.name}</p>
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
