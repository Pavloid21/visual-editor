import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants/actionTypes";

const BlockPreview = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id: props.blockId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (!dropResult.uuid) {
          props.onPushBlock(props.blockId);
        } 
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      className="card card-body p-2 shadow-lg block-entry mb-2"
      style={{ opacity }}
      ref={drag}
    >
      <img src={props.image} alt={props.name} className="img-fluid" />
      <div className="prompt">
        <div className="prompt-inside">
          <div>{props.name}</div>
        </div>
      </div>
    </div>
  );
};

BlockPreview.propTypes = {
  blockId: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  onPushBlock: PropTypes.func,
};

export default BlockPreview;
