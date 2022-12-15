import React from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import {ColorPicker, Input, Label, Select} from 'components/controls';
import actionTypes from 'constants/actionTypes';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import fullScreenIcon from 'assets/full-screen.svg';
import {useModal, snippet} from 'utils';
import Prism from 'prismjs';
import {atomOneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Modal} from 'components';
import {editLogic} from 'store/output.slice';
import {transformHexWeb} from 'utils/color';

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
  const {screen: screenName, navigationSettings, settingsUI, logic} = useAppSelector((state) => state.output);
  const {selectedScreen} = useAppSelector((state) => state.layout);
  const {layout} = useAppSelector((state) => state);
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const dispatch = useAppDispatch();
  const screenOptions = useAppSelector((state) => state.screenList);

  const handleChange = React.useCallback((
    event: string | boolean,
    tag:'scrimColor' |
    'heightInPercent' |
    'isBottomSheet' |
    'screenName' |
    'saveScreen' |
    'showBottomBar' |
    'bottomBar',
    useEvent: boolean,
    navigationChange?: boolean,
  ) => {
    dispatch({
      type: actionTypes.EDIT_SCREEN_NAME,
      screen: tag === 'screenName' ? event : screenName,
      navigationSettings: navigationChange ? {
        saveScreen: tag === 'saveScreen' ? event : navigationSettings.saveScreen,
        showBottomBar: tag === 'showBottomBar' ? event : navigationSettings.showBottomBar,
        updateUrlBottomBar: tag === 'bottomBar' ? event : navigationSettings.updateUrlBottomBar,
      } : navigationSettings,
      settingsUI: {
        isBottomSheet: tag === 'isBottomSheet' ? Boolean(event) : settingsUI.isBottomSheet,
        bottomSheetSettings: {
          heightInPercent: tag === 'heightInPercent' ? event : settingsUI.bottomSheetSettings.heightInPercent,
          scrimColor: tag === 'scrimColor' ? event : settingsUI.bottomSheetSettings.scrimColor,
        }
      },
      snippet: {
        screenID: selectedScreen.uuid,
        endpoint: useEvent ? String(event).replace(/\s/g, '_') : screenName,
        snippet: snippet({
          screen: useEvent ? String(event).replace(/\s/g, '_') : screenName,
          listItems: layout,
        }),
      },
    });
  }, [
    dispatch,
    layout,
    navigationSettings,
    screenName,
    selectedScreen.uuid,
    settingsUI
  ]);

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
          onChange={(event) => handleChange(event.target.value, 'screenName', true)}
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
          onChange={(value) => handleChange(Boolean(value), 'isBottomSheet', false)}
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
              onChange={(event) => handleChange(event.target.value, 'heightInPercent', false)}
            />
            <ColorPicker
              debouncetimeout={500}
              label="Scrim color"
              $isWide
              placeholder="Scrim color"
              value={transformHexWeb(settingsUI.bottomSheetSettings?.scrimColor)}
              onChangeColor={(value) => handleChange(value, 'scrimColor', false)}
            />
          </>
        )}
        <Select
          value={navigationSettings?.saveScreen}
          label="Save screen"
          onChange={(value) => handleChange(Boolean(value), 'saveScreen', false, true)}
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
          onChange={(value) => handleChange(Boolean(value), 'showBottomBar', false, true)}
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
          onChange={(value) => handleChange(String(value), 'bottomBar', false, true)}
          options={screenOptions}
        />
      </div>

      <Modal
        isActive={itemModalOpen}
        handleClose={() => setItemModalOpen(false)}
        padding="16px"
      >
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
