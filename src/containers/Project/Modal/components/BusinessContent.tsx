import {Input, Select} from 'components/controls';
import React, {useEffect} from 'react';
import {Toggle} from 'components/controls/Toggle';
import {BusinessContainer} from './BusinessContent.styled';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore, TScreenListOption} from 'store/types';
import {Controller, useForm} from 'react-hook-form';
import {setBusinessSetting} from 'store/business-setting.slice';

type BusinessContentType = {
  screenList: TScreenListOption[],
  setItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BusinessContent = ({screenList}: BusinessContentType) => {
  const businessSettings = useSelector((state: RootStore) => state.businessSetting);
  const dispatch = useDispatch();
  const {
    getValues,
    resetField,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: {
      errors: {form},
    },
  } = useForm();

  useEffect(() => {
    setValue('timeTokenExpired', businessSettings.timeTokenExpired);
    setValue('tokenDeviceUrl', businessSettings.tokenDeviceUrl);
    setValue('countTouchIdAttempt', businessSettings.countTouchIdAttempt);
    setValue('countPincodeAttempt', businessSettings.countPincodeAttempt);
    setValue('countFaceIdAttempt', businessSettings.countFaceIdAttempt);
    setValue('loginUrl', businessSettings.loginUrl);
    setValue('passCodeVerificationUrl', businessSettings.passCodeVerificationUrl);
    setValue('isTouchId', businessSettings.isTouchId);
    setValue('isFaceId', businessSettings.isFaceId);
    setValue('mainScreenUrl', businessSettings.mainScreenUrl);
    setValue('invalidAccessTime', businessSettings.invalidAccessTime);
  }, []);

const loginUrl = watch('loginUrl');
const passCodeVerificationUrl = watch('passCodeVerificationUrl');
const isTouchId = watch('isTouchId');
const isFaceId = watch('isFaceId');
const timeTokenExpired = watch('timeTokenExpired');
const tokenDeviceUrl = watch('tokenDeviceUrl');
const countPincodeAttempt = watch('countPincodeAttempt');
const countFaceIdAttempt = watch('countFaceIdAttempt');
const countTouchIdAttempt = watch('countTouchIdAttempt');
const mainScreenUrl = watch('mainScreenUrl');
const invalidAccessTime = watch('invalidAccessTime');

  useEffect(() => {
    dispatch(setBusinessSetting(getValues()));
  }, [
    loginUrl,
    passCodeVerificationUrl,
    isTouchId,
    isFaceId,
    timeTokenExpired,
    tokenDeviceUrl,
    countPincodeAttempt,
    countFaceIdAttempt,
    countTouchIdAttempt,
    mainScreenUrl,
    invalidAccessTime
  ]);

  return (
    <BusinessContainer>
      <div className="businessForm">
      <form
        // ref={formRef}
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
