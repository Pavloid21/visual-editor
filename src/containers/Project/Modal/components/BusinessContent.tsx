import {Input, Select} from 'components/controls';
import React, {useEffect} from 'react';
import {Toggle} from 'components/controls/Toggle';
import {BusinessContainer} from './BusinessContent.styled';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore, TScreenListOption} from 'store/types';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {setBusinessSettingChange} from 'store/business-setting.slice';

type BusinessContentType = {
  screenList: TScreenListOption[],
  setItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BusinessContent = ({screenList}: BusinessContentType) => {
  const {businessSettings, cancelSettings} = useSelector((state: RootStore) => state.businessSetting);
  const dispatch = useDispatch();
  const {
    getValues,
    setValue,
    reset,
    control,
  } = useForm({
    defaultValues: {
      timeTokenExpired: businessSettings.timeTokenExpired,
      tokenDeviceUrl: businessSettings.tokenDeviceUrl,
      loginUrl: businessSettings.loginUrl,
      passCodeVerificationUrl: businessSettings.passCodeVerificationUrl,
      isTouchId: businessSettings.isTouchId,
      isFaceId: businessSettings.isFaceId,
      mainScreenUrl: businessSettings.mainScreenUrl,
    }
  });

  const watchFields = useWatch({
    control,
    name: [
      'loginUrl',
      'passCodeVerificationUrl',
      'isTouchId',
      'isFaceId',
      'timeTokenExpired',
      'tokenDeviceUrl',
      'mainScreenUrl',
    ]});

  useEffect(() => {
    dispatch(setBusinessSettingChange(getValues()));
  }, [watchFields]);

  useEffect(() => {
    reset(businessSettings);
  }, [cancelSettings]);

  return (
    <BusinessContainer>
      <div className="businessForm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="dropdownSelect"></div>
        <Controller
          name="loginUrl"
          control={control}
          render={({field}) => {
            return (
              <div className="dropdownSelect login">
                <Select
                  options={screenList}
                  label="Screen login"
                  placeholder="Select Screen"
                  {...field}
                />
              </div>
            );
          }}
        />
        <Controller
          name="passCodeVerificationUrl"
          control={control}
          render={({field}) => {
            return (
              <div className="dropdownSelect pincode">
                <Select
                  options={screenList}
                  label="Screen pin code"
                  placeholder="Select Screen"
                  {...field}
                />
              </div>
            );
          }}
        />
        <div className="toggles">
          <Controller
            name="isTouchId"
            control={control}
            render={({field}) => {
              return (
                <div className="toggle">
                  <Toggle
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <p>Login with Touchid</p>
                </div>
              );
            }}
          />
          <Controller
            name="isFaceId"
            control={control}
            render={({field}) => {
              return (
                <div className="toggle">
                  <Toggle
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <p>Login with FaceId</p>
                </div>
              );
            }}
          />
        </div>
        <Controller
          name="timeTokenExpired"
          control={control}
          render={({field}) => {
            return (
              <div>
                <Input
                  $isWide
                  label="Token decay time in seconds"
                  placeholder="e.g. 86 400"
                  {...field}
                />
              </div>
            );
          }}
        />
        <Controller
          name="tokenDeviceUrl"
          control={control}
          render={({field}) => {
            return (
              <div>
                <Input
                  $isWide
                  label="Device token URL"
                  placeholder="http://example.com"
                  {...field}
                />
              </div>
            );
          }}
        />
        <Controller
          name="mainScreenUrl"
          control={control}
          render={({field}) => {
            return (
              <div className="dropdownSelect">
                <Select
                  options={screenList}
                  label="Screen main"
                  placeholder="Select Screen"
                  {...field}
                />
              </div>
            );
          }}
        />
      </form>
      </div>
    </BusinessContainer>
  );
};
