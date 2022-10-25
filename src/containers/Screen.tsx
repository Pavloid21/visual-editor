import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ColorPicker, Input, Label, Select} from 'components/controls';
import actionTypes from 'constants/actionTypes';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import fullScreenIcon from '../assets/full-screen.svg';
import {useModal, snippet} from 'utils';
import Prism from 'prismjs';
import {atomOneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Modal} from 'components';
import {editLogic} from 'store/output.slice';
import type {RootStore} from 'store/types';

const Container = styled.div`
  padding: 14px;
  & > .form-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
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
  const {screen: screenName, navigationSettings, settingsUI} = useSelector((state: RootStore) => state.output);
  const logic = useSelector((state: RootStore) => state.output.logic);
  const selectedScreen = useSelector((state: RootStore) => state.layout.selectedScreen);
  const layout = useSelector((state: RootStore) => state.layout);
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const dispatch = useDispatch();
  const screenOptions = useSelector((state: RootStore) => state.screenList);

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
              navigationSettings: navigationSettings,
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
                dispatch(editLogic(value));
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
        <Select
          value={settingsUI?.isBottomSheet}
          label="Bottom sheet"
          onChange={(value) => {
            dispatch({
              type: actionTypes.EDIT_SCREEN_NAME,
              screen: screenName,
              settingsUI: {
                isBottomSheet: value,
              },
              snippet: {
                screenID: selectedScreen.uuid,
                endpoint: screenName.replace(/\s/g, '_'),
                snippet: snippet({
                  screen: screenName,
                  listItems: layout,
                }),
              },
            });
          }}
          options={[
            {
              label: 'True',
              value: true,
            },
            {
              label: 'False',
              value: false,
            },
          ]}
        />
        {settingsUI?.isBottomSheet && (
          <>
            <Input
              $isWide
              $clearable={false}
              label="Height"
              type="number"
              placeholder="Height"
              maxNumber={100}
              value={settingsUI.bottomSheetSettings?.heightInPercent}
              max={100}
              min={0}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement> & React.ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: actionTypes.EDIT_SCREEN_NAME,
                  screen: screenName,
                  navigationSettings: navigationSettings,
                  settingsUI: {
                    bottomSheetSettings: {
                      ...settingsUI.bottomSheetSettings,
                      heightInPercent: +e.target.value,
                    },
                  },
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
            <ColorPicker
              debouncetimeout={500}
              label="Scrim color"
              $isWide
              placeholder="Scrim color"
              value={settingsUI.bottomSheetSettings?.scrimColor}
              onChange={(e: any) =>
                dispatch({
                  type: actionTypes.EDIT_SCREEN_NAME,
                  screen: screenName,
                  navigationSettings: navigationSettings,
                  settingsUI: {
                    bottomSheetSettings: {
                      ...settingsUI.bottomSheetSettings,
                      scrimColor: e.target.value,
                    },
                  },
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
          </>
        )}
        <Select
          value={navigationSettings?.saveScreen}
          label="Save screen"
          onChange={(value) => {
            dispatch({
              type: actionTypes.EDIT_SCREEN_NAME,
              screen: screenName,
              navigationSettings: {
                saveScreen: value,
              },
              snippet: {
                screenID: selectedScreen.uuid,
                endpoint: screenName.replace(/\s/g, '_'),
                snippet: snippet({
                  screen: screenName,
                  listItems: layout,
                }),
              },
            });
          }}
          options={[
            {
              label: 'True',
              value: true,
            },
            {
              label: 'False',
              value: false,
            },
          ]}
        />
        <Select
          value={navigationSettings?.showBottomBar}
          label="Show bottom bar"
          onChange={(value) => {
            dispatch({
              type: actionTypes.EDIT_SCREEN_NAME,
              screen: screenName,
              navigationSettings: {
                showBottomBar: value,
              },
              snippet: {
                screenID: selectedScreen.uuid,
                endpoint: screenName.replace(/\s/g, '_'),
                snippet: snippet({
                  screen: screenName,
                  listItems: layout,
                }),
              },
            });
          }}
          options={[
            {
              label: 'True',
              value: true,
            },
            {
              label: 'False',
              value: false,
            },
          ]}
        />
        <Select
          value={navigationSettings?.updateUrlBottomBar}
          label="Bottom bar"
          onChange={(value) => {
            dispatch({
              type: actionTypes.EDIT_SCREEN_NAME,
              screen: screenName,
              navigationSettings: {
                updateUrlBottomBar: value,
              },
              snippet: {
                screenID: selectedScreen.uuid,
                endpoint: screenName.replace(/\s/g, '_'),
                snippet: snippet({
                  screen: screenName,
                  listItems: layout,
                }),
              },
            });
          }}
          options={screenOptions}
        />
      </div>
      <Modal isActive={itemModalOpen} handleClose={() => setItemModalOpen(false)} padding="16px">
        <EditorWrapper icon={fullScreenIcon}>
          <Editor
            highlight={(code) => Prism.highlight(code, Prism.languages.js, 'javascript')}
            onValueChange={(value) => {
              dispatch(editLogic(value));
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
      </Modal>
    </Container>
  ) : null;
};

export default Screen;
