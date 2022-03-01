import handlebars from "handlebars";
import documents from "../views/documents";
import section from "../views/section";
import blocks from "../views/blocks";
import { sortableElement } from "react-sortable-hoc";
import { observer } from "./observer";

const SortableItem = sortableElement(({ layoutBlock, Component, ...props }) => {
  return (
    <Component
      {...{ ...layoutBlock, uuid: layoutBlock.uuid }}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        observer.broadcast({ blockId: layoutBlock.uuid, event: "click" });
      }}
    />
  );
});

function render(layoutBlocks, documentId, bottomBar) {
  const components = [];
  const innerHTML = layoutBlocks.reduce((acc, layoutBlock) => {
    let blockHTML;
    if (blocks[layoutBlock.blockId].Component) {
      const Component = blocks[layoutBlock.blockId].Component;
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

    const sectionTemplate = handlebars.compile(section);
    const sectionHTML = sectionTemplate({
      content: blockHTML,
      uuid: layoutBlock.uuid,
    });

    return `${acc}${sectionHTML}`;
  }, ``);

  if (bottomBar) {
    const Component = blocks[bottomBar.blockId].Component;
    components.push(
      <Component
        {...{ ...bottomBar, uuid: bottomBar.uuid }}
        id={bottomBar.uuid}
        key={bottomBar.uuid}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          observer.broadcast({ blockId: bottomBar.uuid, event: "click" });
        }}
      />
    );
  }

  return {
    components,
    schema: handlebars.compile(documents[documentId].hbs)({
      content: innerHTML,
    }),
  };
}

export default render;
