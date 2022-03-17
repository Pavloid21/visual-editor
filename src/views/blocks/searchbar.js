import React from "react";
import styled from "styled-components";
import searchbar from "../../assets/searchbar.svg";
import Wrapper from "../../utils/wrapper";

const SearchBar = styled.div`
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

const Component = (props) => {
  const { placeholder, text } = props.data;
  return (
    <Wrapper id={props.id}>
      <SearchBar {...props.data} {...props}>
        <input
          type="text"
          className="form-control draggable"
          placeholder={placeholder}
          value={text}
        />
      </SearchBar>
    </Wrapper>
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
