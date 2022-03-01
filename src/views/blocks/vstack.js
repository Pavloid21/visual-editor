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

const VStack = styled.div`
  background-color: ${(props) => props.backgroundColor?.indexOf("#") >= 0 ? props.backgroundColor : "#FFFFFF"};
  display: flex;
  align-items: ${(props) =>
    props.alignment === "SPACEBETWEEN" ? "space-between" : props.alignment};
  flex-direction: column;
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
  border: ${(props) => props.border};
  gap: ${(props) => props.spacing}px;
`;

const SortableContainer = sortableContainer(
  ({ drop, border, listItems, data, ...props }) => {
    return (
      <VStack
        {...data}
        {...props}
        ref={drop}
        border={border}
        className="draggable"
      >
        {listItems && renderHandlebars(listItems, "document2").components}
      </VStack>
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
  name: "VSTACK",
  previewImageUrl: "https://cdn-icons-png.flaticon.com/128/1239/1239779.png",
  category: "Layouts",
  defaultData: {
    alignment: "CENTER",
    backgroundColor: "#C6C6C6",
    spacing: 16,
    padding: {
      top: "100",
      bottom: "100",
      left: "10",
      right: "10",
    },
  },
  listItems: [],
  config: {
    alignment: { type: "string", name: "Alignment" },
    backgroundColor: { type: "color", name: "Background color" },
    spacing: { type: "number", name: "Spacing" },
    padding: {
      top: {
        type: "number",
        name: "Top",
      },
      bottom: {
        type: "number",
        name: "Bottom",
      },
      left: {
        type: "number",
        name: "Left",
      },
      right: {
        type: "number",
        name: "Right",
      },
    },
  },
};

export default block;
