import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CollapseIcon } from "../assets/collapse.svg";
import Input from "../components/Input";
import BlockPreview from "../components/BlockPreview";
import blocks from "../views/blocks";
import { useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";

const GalleryHeader = styled.div`
  border-top: 1px solid var(--neo-gray);
  border-bottom: 1px solid var(--neo-gray);
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Container = styled.div`
  padding: 4px 6px 0px 16px;
  height: calc(100% - 46px);
  & > div {
    height: calc(100% - 50px);
    overflow-y: auto;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: 118px 118px 118px;
    grid-template-rows: 118px 118px 118px;
    column-gap: 18px;
    row-gap: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const Gallery = (props) => {
  const dispatch = useDispatch();

  const handlePushBlock = (blockId) => {
    dispatch({
      type: actionTypes.PUSH_BLOCK,
      blockId,
    });
  };

  const handlePushBlockInside = (blockId, uuid) => {
    dispatch({
      type: actionTypes.PUSH_BLOCK_INSIDE,
      blockId,
      uuid,
    });
  };

  const allBlocks = (filteredBlocks) => {
    return Object.keys(filteredBlocks || blocks).map((blockId) => {
      const block = blocks[blockId];
      return (
        <BlockPreview
          key={blockId}
          name={block.name}
          blockId={blockId}
          image={block.previewImageUrl}
          onPushBlock={handlePushBlock}
          onPushBlockInside={handlePushBlockInside}
        />
      );
    });
  };

  const [gallery, setGallery] = useState(allBlocks());

  const handleFilterChange = (event) => {
    if (event.target.value) {
      const filteredKeys = Object.keys(blocks).filter((blockId) => {
        const block = blocks[blockId];
        if (block.name.indexOf(event.target.value) >= 0) {
          return true;
        }
      });
      const filteredBlocks = {};
      filteredKeys.forEach((key) => {
        filteredBlocks[key] = blocks[key];
      });
      setGallery(allBlocks(filteredBlocks));
    } else {
      setGallery(allBlocks());
    }
  };

  return (
    <div>
      <GalleryHeader>
        <span>Components</span>
        <CollapseIcon className="icon" />
      </GalleryHeader>
      <Container>
        <Input placeholder="Filter components" onChange={handleFilterChange} />
        <div>{gallery}</div>
      </Container>
    </div>
  );
};

export default Gallery;
