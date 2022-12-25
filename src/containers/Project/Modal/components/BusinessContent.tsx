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
      countTouchIdAttempt: businessSettings.countTouchIdAttempt,
      countPincodeAttempt: businessSettings.countPincodeAttempt,
      countFaceIdAttempt: businessSettings.countFaceIdAttempt,
      loginUrl: businessSettings.loginUrl,
      passCodeVerificationUrl: businessSettings.passCodeVerificationUrl,
      isTouchId: businessSettings.isTouchId,
      isFaceId: businessSettings.isFaceId,
      mainScreenUrl: businessSettings.mainScreenUrl,
      invalidAccessTime: businessSettings.invalidAccessTime,
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
      'countPincodeAttempt',
      'countFaceIdAttempt',
      'countTouchIdAttempt',
      'mainScreenUrl',
      'invalidAccessTime',
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
                  label="URL скрина логина"
                  placeholder="http://example.com"
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
                  label="URL скрина пинкода"
                  placeholder="http://example.com"
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
                  <p>Вход по Touchid</p>
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
                  <p>Вход по FaceId</p>
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
                  label="Время протухания токена в секундах"
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
                  label="URL токена устройства"
                  placeholder="http://example.com"
                  {...field}
                />
              </div>
            );
          }}
        />
        <div className="attempt">
          <Controller
            name="countTouchIdAttempt"
            control={control}
            render={({field}) => {
              return (
                <div>
                  <Input
                    $isWide
                    label="Попытки входа по TouchId"
                    type="number"
                    {...field}
                  />
                </div>
              );
            }}
          />
          <Controller
            name="countPincodeAttempt"
            control={control}
            render={({field}) => {
              return (
                <div>
                  <Input
                    $isWide
                    label="Попытки ввода пинкода"
                    type="number"
                    {...field}
                  />
                </div>
              );
            }}
          />
          <Controller
            name="countFaceIdAttempt"
            control={control}
            render={({field}) => {
              return (
                <div>
                  <Input
                    $isWide
                    label="Попытки входа по FaceId"
                    type="number"
                    {...field}
                  />
                </div>
              );
            }}
          />
        </div>
        <Controller
          name="mainScreenUrl"
          control={control}
          render={({field}) => {
            return (
              <div className="dropdownSelect">
                <Select
                  options={screenList}
                  label="URL главной страницы"
                  placeholder="http://example.com"
                  {...field}
                />
              </div>
            );
          }}
        />
        <Controller
          name="invalidAccessTime"
          control={control}
          render={({field}) => {
            return (
              <div>
                <Input
                  $isWide
                  label="Отображения всплывающего окна при неудачной попытке входа в секундах"
                  placeholder="e.g. 86 400"
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
