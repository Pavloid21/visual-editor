import React, {useEffect} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {useAppDispatch, useAppSelector} from 'store';
import {snippet} from 'utils';
import {Container, EditorWrapper} from './Code.styled';
import {saveCode} from 'store/code.slice';
import {setSnippet} from 'store/layout.slice';

const Code: React.FC<any> = (props) => {
  const {code} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.api);
  const {bottomBar, blocks, selectedScreen, topAppBar, snippets} = useAppSelector((state) => state.layout);
  const {screen, navigationSettings, settingsUI, logic} = useAppSelector((state) => state.output);

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
