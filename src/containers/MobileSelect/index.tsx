import {FlexContainer} from 'components/layouts';
import React from 'react';
import {buttons, optionsByDevice, Device} from './consts';
import {useDispatch, useSelector} from 'react-redux';
import {setDevice, setModelDevice} from 'store/editor-mode.slice';
import {RootStore} from 'store/types';
import {ButtonSelector, Select} from './styled';

const MobileSelect: React.FC<unknown> = () => {
  const dispatch = useDispatch();
  const phoneType = useSelector((state: RootStore) => state.editorMode.model);
  const device = useSelector((state: RootStore) => state.editorMode.device);

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
