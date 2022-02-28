import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { sortableContainer } from "react-sortable-hoc";
import { ItemTypes } from "../constants/actionTypes";
import { arrayMoveImmutable } from "array-move";
import { observer } from "../utils/observer";

const SortableContainer = sortableContainer(
  ({ children, drop, backgroundColor }) => {
    return (
      <div ref={drop} style={{ height: "100%", backgroundColor, overflow: "hidden" }}>
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
    backgroundColor = "#BEF3FF";
  }

  return (
    <div className="page-content-wrapper overflow-hidden d-flex justify-content-center">
      <div
        className={`preview-window shadow-lg preview-mode-${props.previewMode}`}
      >
        <div className="preview-toolbar d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="material-icons preview-toolbar-dot">
              stop_circle
            </span>
            <span className="material-icons preview-toolbar-dot">
              stop_circle
            </span>
            <span className="material-icons preview-toolbar-dot">
              stop_circle
            </span>
          </div>
          <div className="d-flex">
            <button
              onClick={() => props.onChangePreviewMode(0)}
              className={`btn btn-sm btn-preview-toolbar d-flex align-items-center ${
                props.previewMode === 0 ? "active" : ""
              }`}
            >
              <span className="material-icons">devices</span>
            </button>
            <button
              onClick={() => props.onChangePreviewMode(1)}
              className={`btn btn-sm btn-preview-toolbar d-flex align-items-center ${
                props.previewMode === 1 ? "active" : ""
              }`}
            >
              <span className="material-icons">tv</span>
            </button>
            <button
              onClick={() => props.onChangePreviewMode(2)}
              className={`btn btn-sm btn-preview-toolbar d-flex align-items-center ${
                props.previewMode === 2 ? "active" : ""
              }`}
            >
              <span className="material-icons">tablet</span>
            </button>
            <button
              onClick={() => props.onChangePreviewMode(3)}
              className={`btn btn-sm btn-preview-toolbar d-flex align-items-center ${
                props.previewMode === 3 ? "active" : ""
              }`}
            >
              <span className="material-icons">smartphone</span>
            </button>
          </div>
        </div>
        <SortableContainer
          drop={drop}
          backgroundColor={backgroundColor}
          onSortEnd={onSortEnd}
          distance={1}
        >
          {props.components}
        </SortableContainer>
      </div>
    </div>
  );
};

export default Preview;
