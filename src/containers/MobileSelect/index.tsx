import {FlexContainer} from 'components/layouts';
import React from 'react';
import {buttons, optionsByDevice, Device} from './consts';
import {useAppDispatch, useAppSelector} from 'store';
import {setDevice, setModelDevice} from 'store/editor-mode.slice';
import {ButtonSelector, Select} from './styled';

const MobileSelect: React.FC<unknown> = () => {
  const dispatch = useAppDispatch();
  const {phoneType, device} = useAppSelector((state) => ({
    phoneType: state.editorMode.model,
    device: state.editorMode.device,
  }));

  const handleChangePlatform = (key: Device) => {
    dispatch(setDevice(key));
  };

  const handleChangeMobile = (value: string | undefined) => {
    value && dispatch(setModelDevice(value));
  };

  return (
    <FlexContainer>
      <ButtonSelector buttons={buttons} value={device} onChange={handleChangePlatform} />
      <Select options={optionsByDevice[device as Device]} onChange={handleChangeMobile} value={phoneType} />
    </FlexContainer>
  );
};

export default MobileSelect;
