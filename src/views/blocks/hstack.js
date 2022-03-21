import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants/actionTypes";
import renderHandlebars from "../../utils/renderHandlebars";
import styled from "styled-components";
import { sortableContainer } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { observer } from "../../utils/observer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import actionTypes from "../../constants/actionTypes";
import hstack from "../../assets/hstack.svg";
import Wrapper from "../../utils/wrapper";

const HStack = styled.div`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: ${(props) =>
    props.distribution === "SPACEBETWEEN"
      ? "space-between"
      : props.distribution};
  text-align: ${(props) => props.alignment};
  flex-direction: row;
  align-items: center;
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
  gap: ${(props) => props.spacing}px;
  position: relative;
  border-radius: ${(props) => `
    ${props.corners?.topLeftRadius}px 
    ${props.corners?.topRightRadius}px 
    ${props.corners?.bottomRightRadius}px
    ${props.corners?.bottomLeftRadius}px 
  `};
  ${(props) => {
    if (!props.alignment || props.alignment === "FILL") {
      return "width: 100%;";
    }
  }}
`;

const SortableContainer = sortableContainer(
  ({ drop, backgroundColor, listItems, settingsUI, ...props }) => {
    return (
      <Wrapper id={props.id}>
        <HStack
          {...settingsUI}
          {...props}
          backgroundColor={backgroundColor}
          ref={drop}
          className="draggable"
        >
          {listItems && renderHandlebars(listItems, "document2").components}
        </HStack>
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
      axis="x"
      drop={drop}
      backgroundColor={backgroundColor}
      onSortEnd={onSortEnd}
      listItems={listItems}
      settingsUI={settingsUI}
      {...props}
      distance={1}
    />
  );
};

const block = {
  Component,
  name: "HSTACK",
  title: "HStack",
  description: "A view that arranges its children in a horizontal line.",
  previewImageUrl: hstack,
  category: "Layouts",
  defaultData: {
    alignment: "CENTER",
    backgroundColor: "#C6C6C6",
    distribution: "SPACEBETWEEN",
    spacing: 16,
    padding: {
      top: "100",
      bottom: "100",
      left: "10",
      right: "10",
    },
    corners: {
      topLeftRadius: 0,
      topRightRadius: 0,
      bottomLeftRadius: 0,
      bottomRightRadius: 0,
    },
  },
  listItems: [],
  config: {
    alignment: { type: "string", name: "Alignment" },
    backgroundColor: { type: "color", name: "Background color" },
    distribution: { type: "string", name: "Distribution" },
    spacing: {
      type: "number",
      name: "Spacing",
    },
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
    corners: {
      topLeftRadius: {
        type: "number",
        name: "Top left radius",
      },
      topRightRadius: {
        type: "number",
        name: "Top right radius",
      },
      bottomLeftRadius: {
        type: "number",
        name: "Bottom left radius",
      },
      bottomRightRadius: {
        type: "number",
        name: "Bottom right radius",
      },
    },
  },
};

export default block;
