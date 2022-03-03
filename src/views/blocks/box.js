import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants/actionTypes";
import renderHandlebars from "../../utils/renderHandlebars";
import styled from "styled-components";
import { observer } from "../../utils/observer";
import { sortableContainer } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import actionTypes from "../../constants/actionTypes";
import "./common.css";

const Box = styled.div`
  border: ${(props) => `${props.borderWidth}px solid ${props.borderColor}`};
  width: ${(props) => (props.size.width ? props.size.width + "px;" : "100%;")}
  height: ${(props) => props.size.height}px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const SortableContainer = sortableContainer(
  ({ drop, border, listItems, data, ...props }) => {
    return (
      <Box
        {...data}
        {...props}
        ref={drop}
        border={border}
        className="draggable"
      >
        {listItems && renderHandlebars(listItems, "document2").components}
      </Box>
    );
  }
);

const Component = ({ data, uuid, listItems, ...props }) => {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layout);
  const [{ canDrop, isOver, target }, drop] = useDrop(() => ({
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
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      target: monitor,
    }),
  }));

  const isActive = canDrop && isOver;
  let border = "none";
  if (isActive) {
    border = "3px dashed green";
  }

  const onSortEnd = ({ oldIndex, newIndex, nodes }) => {
    const newOrder = arrayMoveImmutable(nodes, oldIndex, newIndex).map((item) =>
      item.node.getAttribute("id")
    );
    observer.broadcast({
      layout,
      newOrder,
      parentID: nodes[0].node.parentNode.getAttribute("id"),
      event: "sorted",
    });
  };

  return (
    <SortableContainer
      drop={drop}
      border={border}
      onSortEnd={onSortEnd}
      listItems={listItems}
      {...data}
      {...props}
      distance={1}
    />
  );
};

const block = {
  Component,
  name: "BOX",
  previewImageUrl: "https://cdn-icons-png.flaticon.com/128/1239/1239779.png",
  category: "Layouts",
  defaultData: {
    borderColor: "#EFEFEF",
    borderWidth: 1,
    size: {
      height: 56,
      width: 100,
    },
  },
  listItems: [],
  config: {
    borderColor: { type: "color", name: "Border color" },
    borderWidth: { type: "number", name: "Border width" },
    size: {
      height: {
        type: "number",
        name: "Height",
      },
      width: {
        type: "number",
        name: "Width",
      },
    },
  },
};

export default block;