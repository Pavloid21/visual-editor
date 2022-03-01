import React from "react";
import { useSelector } from "react-redux";

const Output = (props) => {
  const blocks = useSelector((state) => state.layout.blocks);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const initial = useSelector((state) => state.output);

  const buildJSONitem = (block) => {
    const data = {
      type: block.blockId.toUpperCase(),
      settingsUI: block.data,
    };
    if (block.listItems) {
      data.listItems = block.listItems.map((item) => buildJSONitem(item));
    }
    return data;
  };

  const prepareJSON = () => {
    initial.listItems = initial.listItems[0]
      ? blocks.map((block) => {
          return buildJSONitem(block);
        })
      : [];
    if (bottomBar) {
      initial.bottomBar = buildJSONitem(bottomBar);
    }
  };

  prepareJSON();

  if (!props.display) return null;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h5>Export</h5>
      </div>
      <hr />
      <div>
        <label>Output JSON</label>
        <textarea
          readOnly
          className="form-control"
          rows={10}
          value={JSON.stringify(initial, null, 4)}
        ></textarea>
      </div>
    </div>
  );
};

export default Output;
