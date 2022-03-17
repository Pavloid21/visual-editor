import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants/actionTypes";
import renderHandlebars from "../../utils/renderHandlebars";
import styled from "styled-components";
import { sortableContainer } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { elevation } from "../../constants/classes";
import { observer } from "../../utils/observer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import actionTypes from "../../constants/actionTypes";
import card from "../../assets/card.svg";
import Wrapper from "../../utils/wrapper";

const Card = styled.div`
  box-sizing: border-box;
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: ${(props) => props.alignment};
  flex-direction: column;
  padding-top: ${(props) => props.padding?.top}px;
  padding-right: ${(props) => props.padding?.right}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  height: ${(props) =>
    props.size?.height ? props.size?.height + "px" : "auto"};
  box-shadow: ${(props) => elevation[props.elevation] || "none"};
  gap: ${(props) => props.spacing}px;
  border-radius: ${(props) => `
    ${props.corners?.topLeftRadius}px 
    ${props.corners?.topRightRadius}px 
    ${props.corners?.bottomRightRadius}px
    ${props.corners?.bottomLeftRadius}px 
  `};
`;

const SortableContainer = sortableContainer(
  ({ drop, backgroundColor, listItems, data, ...props }) => {
    console.log("backgroundColor", backgroundColor);
    return (
      <Wrapper id={props.id}>
        <Card
          {...data}
          {...props}
          backgroundColor={backgroundColor}
          ref={drop}
          className="draggable"
        >
          {listItems && renderHandlebars(listItems, "document2").components}
        </Card>
      </Wrapper>
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
  let backgroundColor = data.backgroundColor;
  if (isActive) {
    console.log("isActive", isActive);
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
      {...data}
      {...props}
      backgroundColor={backgroundColor}
      distance={1}
    />
  );
};

const block = {
  Component,
  name: "CARD",
  title: "Card",
  description: "Cards contain content and actions about a single subject.",
  previewImageUrl: card,
  category: "Layouts",
  defaultData: {
    elevation: 3,
    alignment: "CENTER",
    backgroundColor: "#C6C6C6",
    spacing: 16,
    padding: {
      top: 100,
      bottom: 100,
      left: 10,
      right: 10,
    },
    size: {
      height: 0,
    },
    corners: {
      topLeftRadius: 20,
      topRightRadius: 20,
      bottomLeftRadius: 0,
      bottomRightRadius: 0,
    },
  },
  listItems: [],
  config: {
    elevation: { type: "number", name: "Elevation" },
    alignment: { type: "string", name: "Alignment" },
    backgroundColor: { type: "color", name: "Background color" },
    spacing: { type: "number", name: "Spacing" },
    corners: {
      topLeftRadius: { type: "number", name: "Top left radius" },
      topRightRadius: { type: "number", name: "Top right radius" },
      bottomLeftRadius: { type: "number", name: "Bottom left radius" },
      bottomRightRadius: { type: "number", name: "Bottom right radius" },
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
    size: {
      height: { type: "number", name: "Height" },
    },
  },
};

export default block;
