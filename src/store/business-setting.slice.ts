import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {TBusinessSetting} from './types';

const businessSettings: TBusinessSetting = {
  loginUrl: '',
  passCodeVerificationUrl: '',
  isTouchId: false,
  isFaceId: false,
  timeTokenExpired: 0,
  tokenDeviceUrl: '',
  mainScreenUrl: '',
  countPinCodeAttempt: 2
};

const initialState = {
  businessSettings,
  businessSettingsChange: businessSettings,
  cancelSettings: false
};

const businessSettingSlice = createSlice({
  name: 'businessSetting',
  initialState,
  reducers: {
    setBusinessSetting: (state, action: PayloadAction<TBusinessSetting>) => {
      state.businessSettings = action.payload;
    },
    setBusinessSettingChange: (state, action: PayloadAction<TBusinessSetting>) => {
      state.businessSettingsChange = action.payload;
    },
    setCancelBusinessSettings: (state, action: PayloadAction<boolean>) => {
      state.cancelSettings = action.payload;
    }
  },
});

export const {setBusinessSetting, setBusinessSettingChange, setCancelBusinessSettings} = businessSettingSlice.actions;
export default businessSettingSlice.reducer;
