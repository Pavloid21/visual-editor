import React, {useState, useEffect} from 'react';
import {ReactComponent as GridIcon} from '../../assets/grid.svg';
import {ReactComponent as ListIcon} from '../../assets/list.svg';
import {Input} from 'components/controls';
import {BlockPreview} from 'components';
import {gallery as blocks} from 'views/blocks';
import {useDispatch, useSelector} from 'react-redux';
import {snippet} from 'utils';
import {Collapse, Container, GalleryHeader, Wrapper} from './Gallery.styled';
import {setSnippet} from 'store/layout.slice';
import type {RootStore} from 'store/types';

const Gallery: React.FC<unknown> = () => {
  const dispatch = useDispatch();
  const output = useSelector((state: RootStore) => state.output.screen);
  const {selectedScreen, blocks: layout, topAppBar, bottomBar} = useSelector((state: RootStore) => state.layout);
  const api = useSelector((state: RootStore) => state.api);

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
    dispatch(setSnippet({
      snippet: constants,
      selectedScreen,
    }));
  }, [layout, topAppBar, bottomBar]);

  const [viewMode, setMode] = useState('grid');
  const [show, toggleComponents] = useState<boolean>(true);

  const allBlocks = (filteredBlocks?: Record<string, any>, viewMode = 'grid') => {
    return Object.keys(filteredBlocks || blocks).map((blockId: string) => {
      const block = blocks[blockId]();
      return (
        <BlockPreview
          mode={viewMode}
          key={blockId}
          title={block.title}
          description={block.description}
          blockId={blockId}
          type={block.category}
          image={block.previewImageUrl}
        />
      );
    });
  };

  const [gallery, setGallery] = useState(() => allBlocks());

  const handleModeChange = (event: React.MouseEvent, mode: string) => {
    event.stopPropagation();
    setMode(mode);
    setGallery(allBlocks(undefined, mode));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      const filteredKeys = Object.keys(blocks).filter((blockId) => {
        const block = blocks[blockId];
        if (block.name.indexOf(event.target.value.toUpperCase()) >= 0) {
          return true;
        }
      });
      const filteredBlocks: Record<string, any> = {};
      filteredKeys.forEach((key) => {
        filteredBlocks[key] = blocks[key];
      });
      setGallery(allBlocks(filteredBlocks));
    } else {
      setGallery(allBlocks());
    }
  };

  return (
    <Wrapper show={show}>
      <GalleryHeader>
        <span>Components</span>
        <div>
          {viewMode === 'grid' ? (
            <ListIcon className="icon" onClick={(e) => handleModeChange(e, 'list')} />
          ) : (
            <GridIcon className="icon" onClick={(e) => handleModeChange(e, 'grid')} />
          )}
          <Collapse className="icon" collapse={show} onClick={() => toggleComponents(!show)} />
        </div>
      </GalleryHeader>
      {show && (
        <Container mode={viewMode}>
          <Input placeholder="Filter components" onChange={handleFilterChange} />
          <div>{gallery}</div>
        </Container>
      )}
    </Wrapper>
  );
};

export default Gallery;
