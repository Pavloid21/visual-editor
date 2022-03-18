import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Copy } from "../assets/sm_copy.svg";
import { ReactComponent as Remove } from "../assets/close-c.svg";
import actionTypes from "../constants/actionTypes";

const Wrapper = styled.div`
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height + 20}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top - 20}px;
  box-shadow: 0px 2px 10px rgba(51, 51, 51, 0.1),
    0px 3px 8px rgba(244, 69, 50, 0.15);
  & > .options {
    background-color: white;
    display: flex;
    background-color: #ffffff;
    padding: 4px;
    border-radius: 4px 4px 0px 0px;
    height: 20px;
    width: 100%;
    align-items: center;
    justify-content: end;
    & > div {
      position: fixed;
      display: flex;
      gap: 8px;
      & > svg {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

export default function HighlightedElement() {
  const selectedBlock = useSelector((state) => state.layout.selectedBlockUuid);
  const dispatch = useDispatch();
  const [position, setPosition] = useState({});
  const ref = useRef(null);
  useEffect(() => {
    if (selectedBlock) {
      const element = document.getElementById(selectedBlock);
      const clone = element.cloneNode(true);
      const rect = element.getBoundingClientRect();
      setPosition({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      });
      ref.current.innerHTML = "";
      ref.current.appendChild(clone);
    }
  }, [selectedBlock]);

  if (!selectedBlock) {
    return null;
  }

  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch({
      type: actionTypes.DELETE_BLOCK,
      blockUuid: selectedBlock,
    });
  };

  const handleClone = (event) => {
    event.stopPropagation();
    dispatch({
      type: actionTypes.CLONE_BLOCK,
      blockUuid: selectedBlock,
    });
  };

  const { width, height, left, top } = position;

  return (
    <Wrapper width={width} height={height} left={left} top={top}>
      <div className="options">
        <div>
          <Copy className="icon" onClick={handleClone} />
          <Remove className="icon" onClick={handleRemove} />
        </div>
      </div>
      <div ref={ref} style={{visibility: "hidden"}}></div>
    </Wrapper>
  );
}
