import blocks from 'views/blocks';
import {sortableElement} from 'react-sortable-hoc';
import {observer} from './observer';
import {useSelector} from 'react-redux';
import {blockStateUnsafeSelector} from '../store/selectors';

// eslint-disable-next-line react/display-name
const providerBlockState = Child => (props) => {
  const blockState = useSelector(blockStateUnsafeSelector);

  return (<Child {...props} blockState={blockState} />);
};

const SortableItem = sortableElement(({layoutBlock, Component, ...props}) => {
  const blockState = useSelector(blockStateUnsafeSelector);

  return (
    <Component
      {...layoutBlock}
      {...props}
      blockState={blockState}
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
      const Component = blocks[layoutBlock.blockId.toLowerCase()]?.().Component;
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
    const ProvidedComponent = providerBlockState(Component);

    components.push(
      <ProvidedComponent
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
    const ProvidedComponent = providerBlockState(Component);

    components.unshift(
      <ProvidedComponent
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
