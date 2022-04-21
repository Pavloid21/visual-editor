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
import box from "../../assets/box.svg";
import Wrapper from "../../utils/wrapper";

const Box = styled.div`
  border: ${(props) => `${props.borderWidth}px solid ${props.borderColor}`};
  width: ${(props) => (props.size?.width ? props.size.width + "px" : "100%")};
  height: ${(props) => props.size?.height}px;
  background-color: ${(props) =>
    props.backgroundColor?.indexOf("#") >= 0
      ? props.backgroundColor
      : "transparent"};
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const SortableContainer = sortableContainer(
  ({ drop, backgroundColor, listItems, settingsUI, ...props }) => {
    return (
      <Wrapper id={props.id} {...settingsUI}>
        <Box
          {...settingsUI}
          {...props}
          ref={drop}
          backgroundColor={backgroundColor}
          className="draggable"
        >
          {listItems && renderHandlebars(listItems, "document2").components}
        </Box>
      </Wrapper>
    );
  }
);

const Component = ({ settingsUI, uuid, listItems, ...props }) => {
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
  let backgroundColor = settingsUI.backgroundColor;
  if (isActive) {
    backgroundColor = "#f1f8ff";
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
  name: "BOX",
  title: "Box",
  description:
    "A stylized view, with an optional label, that visually collects a logical grouping of content.",
  previewImageUrl: box,
  category: 'Container',
  defaultData: {
    borderColor: "#EFEFEF",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    size: {
      height: 56,
      width: 100,
    },
  },
  listItems: [],
  config: {
    borderColor: { type: "color", name: "Border color" },
    borderWidth: { type: "number", name: "Border width" },
    backgroundColor: { type: "color", name: "Background color" },
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
