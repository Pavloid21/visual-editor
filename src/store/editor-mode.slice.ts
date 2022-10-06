import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Device, optionByDeviceModelKey, optionsByDevice} from 'containers/MobileSelect/consts';
import {Zoom} from 'containers/ZoomSelect/types';
import type {EditorMode} from './types';

const initialState: EditorMode = {
  mode: 'editor',
  device: Device.IOS,
  model: optionsByDevice[Device.IOS][0].value.toString(),
  zoom: Zoom['100%'],
  dpi: optionByDeviceModelKey[optionsByDevice[Device.IOS][0].value.toString()].dpi
};

const editorModeSlice = createSlice({
  name: 'editorMode',
  initialState,
  reducers: {
    setEditorMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
    setDevice: (state, action: PayloadAction<Device>) => {
      const model = optionsByDevice[action.payload][0].value.toString();

      state.device = action.payload;
      state.model = model;
      state.dpi = optionByDeviceModelKey[model].dpi;
    },
    setModelDevice: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
      state.dpi = optionByDeviceModelKey[action.payload].dpi;
    },
    setZoom: (state, action: PayloadAction<Zoom>) => {
      state.zoom = action.payload;
    }
  }
});

export const {setEditorMode, setDevice, setModelDevice, setZoom} = editorModeSlice.actions;
export default editorModeSlice.reducer;
