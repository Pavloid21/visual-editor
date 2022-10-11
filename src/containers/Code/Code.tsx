import React, {useEffect} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {useSelector, useDispatch} from 'react-redux';
import {snippet} from 'utils';
import {Container, EditorWrapper} from './Code.styled';
import {saveCode} from 'store/code.slice';
import {setSnippet} from 'store/layout.slice';
import type {RootStore} from 'store/types';

const Code: React.FC<any> = (props) => {
  const code = useSelector((state: RootStore) => state.code);
  const dispatch = useDispatch();
  const api = useSelector((state: RootStore) => state.api);
  const {bottomBar, blocks, selectedScreen, topAppBar, snippets} = useSelector((state: RootStore) => state.layout);
  const {screen, navigationSettings, settingsUI, logic} = useSelector((state: RootStore) => state.output);

  useEffect(() => {
    if (api) {
      const constants = snippet(
        {
          screen: screen,
          navigationSettings,
          settingsUI,
          listItems: blocks,
        },
        api,
        blocks,
        topAppBar,
        bottomBar,
        'code'
      );
      dispatch(saveCode(constants));
      dispatch(
        setSnippet({
          snippet: constants,
          selectedScreen,
        })
      );
    }
  }, [api, blocks, bottomBar, topAppBar, code, screen, navigationSettings, settingsUI, logic]);

  return (
    <Container {...props}>
      <EditorWrapper>
        <SyntaxHighlighter language="javascript" style={atomOneLight} showLineNumbers wrapLongLines>
          {logic + snippets.filter((item) => item.screenID === selectedScreen)[0]?.snippet.replace(/"{{|}}"/g, '')}
        </SyntaxHighlighter>
      </EditorWrapper>
    </Container>
  );
};

export default Code;
