import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EditorMode} from 'reducers/types';
import {Device, optionsByDevice} from 'containers/MobileSelect/consts';
import {Zoom} from 'containers/ZoomSelect/types';

const initialState: EditorMode = {
  mode: 'editor',
  device: Device.IOS,
  model: optionsByDevice[Device.IOS][0].value,
  zoom: Zoom['100%']
};

const editorModeSlice = createSlice({
  name: 'editorMode',
  initialState,
  reducers: {
    setEditorMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
    setDevice: (state, action: PayloadAction<Device>) => {
      state.device = action.payload;
      state.model = optionsByDevice[action.payload][0].value;
    },
    setModelDevice: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setZoom: (state, action: PayloadAction<Zoom>) => {
      state.zoom = action.payload;
    }
  }
});

export const {setEditorMode, setDevice, setModelDevice, setZoom} = editorModeSlice.actions;
export default editorModeSlice.reducer;
