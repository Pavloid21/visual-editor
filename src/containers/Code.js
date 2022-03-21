import React, { useEffect } from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const EditorWrapper = styled.div`
  overflow-y: auto;
  width: 100%;
`;

const Code = (props) => {
  const code = useSelector((state) => state.code);
  const dispatch = useDispatch();
  const api = useSelector((state) => state.api);
  const bottomBar = useSelector((state) => state.layout.bottomBar);
  const appBar = useSelector((state) => state.layout.appBar);
  const blocks = useSelector((state) => state.layout.blocks);
  const initial = useSelector((state) => state.output);
  const buildJSONitem = (block) => {
    if (block.settingsUI.checked) {
      delete block.settingsUI.checked;
    }
    const settingsUI = {};
    Object.keys(block.settingsUI).forEach((key) => {
      if (typeof block.settingsUI[key] === "string") {
        settingsUI[key] = `${block.settingsUI[key].replace(/"{{|}}"/g, "")}`;
      }
      settingsUI[key] = block.settingsUI[key];
    });
    const data = {
      type: block.blockId.toUpperCase(),
      settingsUI: settingsUI,
    };
    if (block.listItems) {
      data.listItems = block.listItems.map((item) => buildJSONitem(item));
    }
    return data;
  };

  const prepareJSON = (initial) => {
    initial.listItems = blocks[0]
      ? blocks.map((block) => {
          return buildJSONitem(block);
        })
      : [];
    if (appBar) {
      initial.appBar = buildJSONitem(appBar);
    } else {
      delete initial.appBar;
    }
    if (bottomBar) {
      initial.bottomBar = buildJSONitem(bottomBar);
    } else {
      delete initial.bottomBar;
    }
  };

  useEffect(() => {
    const reference = { ...initial };
    if (api) {
      const constants = api.list.map((item) => {
        const headers = item.headers?.map((header) => {
          return `"${header.key}": "${header.value}"`;
        });
        const params = item.params?.map((param) => {
          return `"${param.key}": "${param.value}"`;
        });
        return `const ${item.varName} = await api.get("${item.url}"${
          (headers || params) && `, {`
        }${headers && `"headers": {${headers.join(",")}},`}${
          params && `"params": {${params.join(",")}}`
        }});`;
      });
      prepareJSON(reference);
      let jsonString = JSON.stringify(reference, null, 4);
      jsonString = jsonString.replace(/"{{|}}"/g, "");
      constants.push(`return ${jsonString}`);
      dispatch({ type: actionTypes.SAVE_CODE, code: constants.join("\r\n") });
    }
  }, [api, initial, blocks, bottomBar, appBar, code]);
  return (
    <Container {...props}>
      <EditorWrapper>
        <SyntaxHighlighter
          language="javascript"
          style={stackoverflowLight}
          showLineNumbers
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </EditorWrapper>
    </Container>
  );
};

export default Code;
