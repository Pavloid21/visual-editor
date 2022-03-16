import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Output = (props) => {
  const blocks = useSelector((state) => state.layout.blocks);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const appBar = useSelector((state) => state.layout.appBar);
  const initial = useSelector((state) => state.output);
  const code = useSelector((state) => state.code);

  const buildJSONitem = (block) => {
    if (block.data.checked) {
      delete block.data.checked;
    }
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
    initial.listItems = blocks[0]
      ? blocks.map((block) => {
          return buildJSONitem(block);
        })
      : [];
    if (bottomBar) {
      initial.bottomBar = buildJSONitem(bottomBar);
    } else {
      delete initial.bottomBar;
    }
    if (appBar) {
      initial.appBar = buildJSONitem(appBar);
    } else {
      delete initial.appBar;
    }
  };

  useEffect(() => {
    prepareJSON();
  }, [blocks, bottomBar, appBar, initial, code]);

  const handleSaveClick = () => {
    fetch(`/api/v1/screens/${initial.screen.replace(/\s/g, "_")}`, {
      method: "PUT",
      body: code,
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((response) => {})
      .then(() => {
        alert("SUCCESS");
      });
  };

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
        <button className="btn btn-primary" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Output;
