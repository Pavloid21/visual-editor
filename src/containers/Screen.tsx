import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Input, Label} from 'components/controls';
import actionTypes from 'constants/actionTypes';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import fullScreenIcon from '../assets/full-screen.svg';
import {useModal, snippet} from 'utils';
import Prism from 'prismjs';
import {atomOneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {CustomModal} from 'components';
import {Store} from 'reducers/types';

const Container = styled.div`
  padding: 14px;
`;

const EditorWrapper = styled.div<any>`
  max-height: 638px;
  overflow: auto;
  padding: 8px 12px;
  border: 1px solid var(--neo-gray);
  border-radius: 4px;
  position: relative;
  & > button.fullScreen {
    position: absolute;
    right: 12px;
    padding: 0;
    border: none;
    background: transparent;
    background-image: url(${(props) => props.icon});
    width: 16px;
    height: 16px;
    z-index: 2;
  }
`;

const Screen: React.FC<any> = (props) => {
  const screenName = useSelector((state: Store) => state.output.screen);
  const logic = useSelector((state: Store) => state.output.logic);
  const selectedScreen = useSelector((state: Store) => state.layout.selectedScreen);
  const layout = useSelector((state: Store) => state.layout);
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const dispatch = useDispatch();
  return props.display ? (
    <Container>
      <div className="form-group">
        <Input
          $isWide
          $clearable
          label="Screen name"
          type="text"
          placeholder="Screen name"
          value={screenName}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement> & React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: actionTypes.EDIT_SCREEN_NAME,
              screen: e.target.value,
              snippet: {
                screenID: selectedScreen.uuid,
                endpoint: e.target.value.replace(/\s/g, '_'),
                snippet: snippet({
                  screen: e.target.value,
                  listItems: layout,
                }),
              },
            })
          }
        />
        <>
          <Label>Code for the Screen</Label>
          <EditorWrapper icon={fullScreenIcon}>
            <button
              className="fullScreen"
              onClick={(e) => {
                e.stopPropagation();
                toggleModal();
              }}
            ></button>
            <Editor
              textareaClassName="code"
              highlight={(code) => Prism.highlight(code, Prism.languages.js, 'javascript')}
              onValueChange={(value) => {
                dispatch({
                  type: actionTypes.EDIT_LOGIC,
                  logic: value,
                });
              }}
              style={{
                ...atomOneLight,
                fontSize: '16px',
                lineHeight: '20px',
              }}
              tabSize={4}
              insertSpaces
              value={logic || ''}
            />
          </EditorWrapper>
        </>
      </div>
      <CustomModal isActive={itemModalOpen} handleClose={() => setItemModalOpen(false)} padding="16px">
        <EditorWrapper icon={fullScreenIcon}>
          <Editor
            highlight={(code) => Prism.highlight(code, Prism.languages.js, 'javascript')}
            onValueChange={(value) => {
              dispatch({
                type: actionTypes.EDIT_LOGIC,
                logic: value,
              });
            }}
            style={{
              ...atomOneLight,
              fontSize: '16px',
              lineHeight: '20px',
            }}
            tabSize={4}
            insertSpaces
            value={logic || ''}
          />
        </EditorWrapper>
      </CustomModal>
    </Container>
  ) : null;
};

export default Screen;
