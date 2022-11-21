import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {TBusinessSetting} from './types';

const initialState: TBusinessSetting = {
  loginUrl: '',
  passCodeVerificationUrl: '',
  isTouchId: false,
  isFaceId: false,
  timeTokenExpired: 0,
  tokenDeviceUrl: '',
  countPincodeAttempt: 0,
  countFaceIdAttempt: 0,
  countTouchIdAttempt: 0,
  mainScreenUrl: '',
  invalidAccessTime: 0
};

const businessSettingSlice = createSlice({
  name: 'businessSetting',
  initialState,
  reducers: {
    setBusinessSetting: (state, action: PayloadAction<TBusinessSetting>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearBusinessSetting: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const {setBusinessSetting, clearBusinessSetting} = businessSettingSlice.actions;
export default businessSettingSlice.reducer;
