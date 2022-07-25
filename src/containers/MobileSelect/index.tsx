import {Container, FlexContainer} from 'components/layouts';
import React from 'react';
import styled from 'styled-components';
import {ButtonSelector as ButtonSelectorBase} from 'components';
import {buttons, optionsByDevice, Device} from './consts';
import {useDispatch, useSelector} from 'react-redux';
import {Select as SelectBase} from 'components/controls';
import {setDevice, setModelDevice} from 'store/editor-mode.slice';

const ButtonSelector = styled(ButtonSelectorBase)`
  ${Container.className} {
    margin-bottom: 0px;
  }
`;

const Select = styled(SelectBase)`
  margin-left: 16px;
  min-width: 200px;
`;

const MobileSelect = () => {
  const dispatch = useDispatch();
  const phoneType = useSelector((state: any) => state.editorMode.model);
  const device = useSelector((state: any) => state.editorMode.device);
  // TODO типизировать стейт

  const handleChangePlatform = (key: Device) => {
    dispatch(setDevice(key));
  };

  const handleChangeMobile = (e: any) => {
    dispatch(setModelDevice(e));
  };

  return (
    <FlexContainer>
      <ButtonSelector buttons={buttons} value={device} onChange={handleChangePlatform} />
      <Select options={optionsByDevice[device as Device]} onChange={handleChangeMobile} value={phoneType} />
    </FlexContainer>
  );
};

export default MobileSelect;
