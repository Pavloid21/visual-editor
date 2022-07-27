import blocks from 'views/blocks';
import {sortableElement} from 'react-sortable-hoc';
import {observer} from './observer';

const SortableItem = sortableElement(({layoutBlock, Component, ...props}) => {
  return (
    <Component
      {...layoutBlock}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        observer.broadcast({blockId: layoutBlock.uuid, event: 'click'});
      }}
    />
  );
});

function render(layoutBlocks, documentId, bottomBar, topAppBar) {
  const components = [];
  if (layoutBlocks[0]) {
    layoutBlocks.forEach((layoutBlock) => {
      const Component = blocks[layoutBlock.blockId.toLowerCase()]().Component;
      if (Component) {
        components.push(
          <SortableItem
            id={layoutBlock.uuid}
            key={layoutBlock.uuid}
            index={components.length}
            Component={Component}
            layoutBlock={layoutBlock}
          />
        );
      }
    });
  }

  if (bottomBar) {
    const Component = blocks[bottomBar.blockId.toLowerCase()]().Component;
    components.push(
      <Component
        {...{...bottomBar, uuid: bottomBar.uuid}}
        id={bottomBar.uuid}
        key={bottomBar.uuid}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          observer.broadcast({blockId: bottomBar.uuid, event: 'click'});
        }}
      />
    );
  }

  if (topAppBar) {
    const Component = blocks[topAppBar.blockId.toLowerCase()]().Component;
    components.unshift(
      <Component
        {...{...topAppBar, uuid: topAppBar.uuid}}
        id={topAppBar.uuid}
        key={topAppBar.uuid}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          observer.broadcast({blockId: topAppBar.uuid, event: 'click'});
        }}
      />
    );
  }

  return {components};
}

export default render;
