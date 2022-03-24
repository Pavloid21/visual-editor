import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";
import { snippet } from "../utils/prepareModel";

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
  const selectedScreen = useSelector((state) => state.layout.selectedScreen);
  const appBar = useSelector((state) => state.layout.appBar);
  const blocks = useSelector((state) => state.layout.blocks);
  const initial = useSelector((state) => state.output);
  const snippets = useSelector((state) => state.layout.snippets);
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    if (api) {
      const constants = snippet(
        initial,
        api,
        blocks,
        appBar,
        bottomBar,
        "code"
      );
      dispatch({ type: actionTypes.SAVE_CODE, code: constants });
      dispatch({
        type: actionTypes.SET_SNIPPET,
        snippet: constants,
        selectedScreen,
      });
    }
  }, [api, initial, blocks, bottomBar, appBar, code]);
  useEffect(() => {
    if (snippets) {
      const screenID = snippets.filter(
        (item) => item.screenID === selectedScreen
      )[0]?.endpoint;
      return fetch(
        `http://mobile-backend-resource-manager.apps.msa31.do.neoflex.ru/api/v1/admin/screens/${screenID}`
      )
        .then((response) => response.text())
        .then((data) => {
          setPrefix(data.match(/.*return/gs));
        });
    }
  }, [snippets]);
  return (
    <Container {...props}>
      <EditorWrapper>
        <SyntaxHighlighter
          language="javascript"
          style={stackoverflowLight}
          showLineNumbers
          wrapLongLines
        >
          {(prefix || "return") +
            snippets
              .filter((item) => item.screenID === selectedScreen)[0]
              ?.snippet.replace("return", "").replace(/"{{|}}"/g, "")}
        </SyntaxHighlighter>
      </EditorWrapper>
    </Container>
  );
};

export default Code;
