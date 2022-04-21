import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {ReactComponent as CollapseIcon} from '../assets/collapse.svg';
import {ReactComponent as GridIcon} from '../assets/grid.svg';
import {ReactComponent as ListIcon} from '../assets/list.svg';
import {Input} from '../components/controls';
import BlockPreview from '../components/BlockPreview';
import {gallery as blocks} from '../views/blocks';
import {useDispatch, useSelector} from 'react-redux';
import {snippet} from '../utils/prepareModel';
import actionTypes from '../constants/actionTypes';

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
    display: ${(props) => (props.mode === 'grid' ? 'grid' : 'flex')};
    ${(props) =>
      props.mode === 'grid'
        ? `grid-template-columns: 118px 118px 118px;
    grid-template-rows: 118px 118px 118px;
    column-gap: 18px;
    row-gap: 18px;`
        : ''}
    ${(props) => (props.mode === 'list' ? `flex-direction: column;` : '')}
    padding-top: 10px;
    padding-bottom: 10px;
    @media (max-width: 1500px) {
      ${(props) =>
        props.mode === 'grid'
          ? `grid-template-columns: 118px 118px;
    grid-template-rows: 118px 118px;
    column-gap: 18px;
    row-gap: 18px;`
          : ''}
    }
  }
`;

const Collapse = styled(CollapseIcon)`
  ${(props) => {
    if (!props.collapse) {
      return 'transform: rotate(180deg);';
    }
  }}
`;

const Wrapper = styled.div`
  height: ${(props) => (props.show ? '50%' : 'auto')};
`;

const Gallery = (props) => {
  const dispatch = useDispatch();
  const output = useSelector((state) => state.output.screen);
  const selectedScreen = useSelector((state) => state.layout.selectedScreen);
  const layout = useSelector((state) => state.layout.blocks);
  const topAppBar = useSelector((state) => state.layout.topAppBar);
  const api = useSelector((state) => state.api);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  useEffect(() => {
    const constants = snippet(
      {
        screen: output,
        listItems: layout,
      },
      api,
      layout,
      topAppBar,
      bottomBar,
      'code'
    );
    dispatch({
      type: actionTypes.SET_SNIPPET,
      snippet: constants,
      selectedScreen,
    });
  }, [layout]);
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

  const [viewMode, setMode] = useState('grid');

  const allBlocks = (filteredBlocks, viewMode = 'grid') => {
    return Object.keys(filteredBlocks || blocks).map((blockId) => {
      const block = blocks[blockId];
      return (
        <BlockPreview
          mode={viewMode}
          key={blockId}
          title={block.title}
          description={block.description}
          blockId={blockId}
          type={block.category}
          image={block.previewImageUrl}
          onPushBlock={handlePushBlock}
          onPushBlockInside={handlePushBlockInside}
        />
      );
    });
  };

  const [gallery, setGallery] = useState(allBlocks());

  const handleModeChange = (event, mode) => {
    event.stopPropagation();
    setMode(mode);
    setGallery(allBlocks(null, mode));
  };

  const handleFilterChange = (event) => {
    if (event.target.value) {
      const filteredKeys = Object.keys(blocks).filter((blockId) => {
        const block = blocks[blockId];
        if (block.name.indexOf(event.target.value.toUpperCase()) >= 0) {
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
    <Wrapper show={props.show}>
      <GalleryHeader>
        <span>Components</span>
        <div>
          {viewMode === 'grid' ? (
            <ListIcon className="icon" onClick={(e) => handleModeChange(e, 'list')} />
          ) : (
            <GridIcon className="icon" onClick={(e) => handleModeChange(e, 'grid')} />
          )}
          <Collapse className="icon" collapse={props.show} onClick={() => props.toggleComponents(!props.show)} />
        </div>
      </GalleryHeader>
      {props.show && (
        <Container mode={viewMode}>
          <Input placeholder="Filter components" onChange={handleFilterChange} />
          <div>{gallery}</div>
        </Container>
      )}
    </Wrapper>
  );
};

export default Gallery;
