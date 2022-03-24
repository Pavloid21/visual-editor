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
import lazyvstack from "../../assets/lazyvstack.svg";
import Wrapper from "../../utils/wrapper";

const LazyVStack = styled.div`
  overflow-y: auto;
  background-color: ${(props) =>
    props.backgroundColor?.indexOf("#") >= 0
      ? props.backgroundColor
      : "transparent"};
  display: flex;
  justify-content: ${(props) =>
    props.distribution === "SPACEBETWEEN"
      ? "space-between"
      : props.distribution};
  align-items: ${(props) => {
    if (props.alignment === "LEFT") {
      return "start";
    } else if (props.alignment === "RIGHT") {
      return "end";
    }
    return props.alignment;
  }};
  flex-direction: column;
  flex: 1 1 auto;
  padding-top: ${(props) => props.padding?.top}px;
  padding-bottom: ${(props) => props.padding?.bottom}px;
  padding-left: ${(props) => props.padding?.left}px;
  padding-right: ${(props) => props.padding?.right}px;
  border: 1px dashed blue;
  box-sizing: border-box;
  & .lazevstack_row {
    height: ${(props) => props.rowHeight}px;
    display: flex;
    align-items: center;
  }
`;

const SortableContainer = sortableContainer(
  ({ drop, backgroundColor, listItems, settingsUI, ...props }) => {
    return (
      <Wrapper id={props.id}>
        <LazyVStack
          {...settingsUI}
          {...props}
          ref={drop}
          backgroundColor={backgroundColor}
          className="draggable"
        >
          {listItems &&
            renderHandlebars(listItems, "document2").components.map(
              (component) => {
                return <div className="lazevstack_row">{component}</div>;
              }
            )}
        </LazyVStack>
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
  name: "LAZYVSTACK",
  title: "LazyVStack",
  description:
    "A view that arranges its children in a line that grows vertically, creating items only as needed.",
  previewImageUrl: lazyvstack,
  category: "Layouts",
  defaultData: {
    alignment: "CENTER",
    backgroundColor: "#C6C6C6",
    distribution: "SPACEBETWEEN",
    rowHeight: 58,
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
    distribution: { type: "string", name: "Distribution" },
    rowHeight: { type: "number", name: "Row height" },
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
