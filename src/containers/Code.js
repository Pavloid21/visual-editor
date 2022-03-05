import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: row;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const EditorWrapper = styled.div`
  align-self: end;
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
  flex: 1 1 auto;
`;

const Code = (props) => {
  const [code, setCode] = useState("");
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
      setCode(constants.join("\r\n"));
    }
  }, [api, initial, blocks, bottomBar, appBar]);
  return (
    <Container {...props}>
      <EditorWrapper>
        <SyntaxHighlighter
          language="javascript"
          style={monokai}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </EditorWrapper>
    </Container>
  );
};

export default Code;
