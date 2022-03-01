import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants/actionTypes";
import { useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";

const BlockPreview = (props) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id: props.blockId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (!dropResult.uuid && item.id !== "bottombar") {
          props.onPushBlock(props.blockId);
        } else {
          dispatch({
            type: actionTypes.PUSH_BOTTOMBAR,
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
