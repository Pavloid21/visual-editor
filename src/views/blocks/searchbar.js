import React from "react";
import styled from "styled-components";
import searchbar from "../../assets/searchbar.svg";
import Wrapper from "../../utils/wrapper";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants/actionTypes";
import { observer } from "../../utils/observer";
import { sortableContainer } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import actionTypes from "../../constants/actionTypes";
import renderHandlebars from "../../utils/renderHandlebars";

const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  & > input {
    pointer-events: none;
    &::placeholder {
      color: ${(props) => props.placeholderColor};
    }

    color: ${(props) => props.textColor};
    background-color: ${(props) => props.backgroundColor};
    height: ${(props) => props.size?.height}px;
    width: ${(props) => (props.size?.width ? props.size.width + "px" : "100%")};
    text-align: ${(props) => props.textAllignment || "left"};
  }

  &::after {
    content: "";
    display: block;
    width: ${(props) => props.size?.height}px;
    height: ${(props) => props.size?.height}px;
    position: absolute;
    top: 0;
    right: 0;
    mask: url(${(props) => props.imageUrl}) no-repeat center;
    background-position: center;
    background-color: ${(props) => props.textColor};
    background-size: cover;
  }
`;

const SortableContainer = sortableContainer(
  ({
    drop,
    backgroundColor,
    listItems,
    text,
    placeholder,
    settingsUI,
    ...props
  }) => {
    return (
      <Wrapper id={props.id} style={{ maxHeight: "100%" }}>
        <SearchBar
          {...props.settingsUI}
          {...props}
          ref={drop}
          backgroundColor={backgroundColor}
        >
          <input
            type="text"
            className="form-control draggable"
            placeholder={placeholder}
            value={text}
          />
          {listItems && renderHandlebars(listItems, "document2").components}
        </SearchBar>
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
  name: "SEARCHBAR",
  title: "Search",
  description: "Search allows users to quickly find app content.",
  previewImageUrl: searchbar,
  imgUrl: "https://icons.getbootstrap.com/assets/icons/search.svg",
  category: "Controls",
  defaultData: {
    placeholder: "Введите имя",
    placeholderColor: "#7F7F7F",
    imageUrl: "https://icons.getbootstrap.com/assets/icons/search.svg",
    text: "neo",
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
    size: {
      height: 48,
      width: "",
    },
  },
  config: {
    placeholder: { type: "string", name: "Placeholder" },
    imageUrl: { type: "string", name: "Image URL" },
    placeholderColor: { type: "color", name: "Placeholder color" },
    text: { type: "string", name: "Text" },
    textAlignment: { type: "string", name: "Text alignment" },
    textColor: { type: "color", name: "Text color" },
    backgroundColor: { type: "color", name: "Background color" },
    fontSize: { type: "number", name: "Font size" },
    size: {
      height: { type: "number", name: "Height" },
      width: { type: "number", name: "Width" },
    },
  },
};

export default block;
