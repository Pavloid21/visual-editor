import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { sortableContainer } from "react-sortable-hoc";
import { ItemTypes } from "../constants/actionTypes";
import { arrayMoveImmutable } from "array-move";
import { observer } from "../utils/observer";
import IphoneX from "../assets/mockups/IphoneX";
import styled from "styled-components";
import Code from "./Code";

const SourceCode = styled.div`
  position: absolute;
  width: 100%;
  left: 16px;
  & button {
    padding: 10px;
    background-color: white;
    border: none;
    border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  }
`;

const SortableContainer = sortableContainer(
  ({ children, drop, backgroundColor }) => {
    return (
      <div
        ref={drop}
        style={{
          height: "100%",
          backgroundColor,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    );
  }
);

const Preview = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => {
      return;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [isShowCode, showCode] = useState(false);
  const layout = useSelector((state) => state.layout);

  useEffect(() => {
    const scrollY = localStorage.getItem("scrollY");
    const bodyHeight = localStorage.getItem("bodyHeight");
    if (scrollY) {
      window.scrollTo(0, scrollY);
    }

    if (bodyHeight) {
      window.scroll(0, scrollY);
    }

    window.addEventListener("scroll", () => {
      localStorage.setItem("scrollY", window.scrollY);
    });
  });

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

  const isActive = canDrop && isOver;
  let backgroundColor = "#FFFFFF";
  if (isActive) {
    backgroundColor = "#f1f8ff";
  }

  return (
    <div
      className="page-content-wrapper overflow-hidden d-flex justify-content-center"
      style={{ position: "relative" }}
    >
      <SourceCode>
        <button
          className="btn"
          onClick={() => {
            showCode(!isShowCode);
          }}
        >
          <img src="https://icons.getbootstrap.com/assets/icons/code-slash.svg" />
        </button>
      </SourceCode>
      <IphoneX>
        <SortableContainer
          drop={drop}
          backgroundColor={backgroundColor}
          onSortEnd={onSortEnd}
          distance={1}
        >
          {props.components}
        </SortableContainer>
      </IphoneX>
      <Code show={isShowCode} />
    </div>
  );
};

export default Preview;
