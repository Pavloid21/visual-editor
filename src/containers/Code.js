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
    if (block.data.checked) {
      delete block.data.checked;
    }
    const settingsUI = {};
    Object.keys(block.data).forEach((key) => {
      if (
        typeof block.data[key] === "string" &&
        block.data[key].indexOf("{{") >= 0
      ) {
        settingsUI[key] = `${block.data[key]
          .replace("{{", "")
          .replace("}}", "")}`;
      }
      settingsUI[key] = block.data[key];
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
      const listItemsString = jsonString.match(/"listItems":\s\[[^]*\],/g);
      const appBarString = jsonString.match(/"appBar":\s{[^]*\s(5,6)?},/g);
      const bottomBarString  = jsonString.match(/"bottomBar":\s{[^]*\s(5,6)?}/g);
      jsonString = jsonString.replace(/"listItems":\s\[[^]*\],/g, "l$");
      jsonString = jsonString.replace(/"appBar":\s{[^]*\s(5,6)?},/g, "a$");
      jsonString = jsonString.replace(/"bottomBar":\s{[^]*\s(5,6)?}/g, "b$");
      jsonString = jsonString.replace("l$", appBarString ? appBarString[0] : "");
      jsonString = jsonString.replace("a$", listItemsString ? listItemsString[0] : "");
      jsonString = jsonString.replace("b$", bottomBarString ? bottomBarString[0] : "");
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
