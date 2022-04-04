import {Container, FlexContainer} from 'components/layouts';
import React from 'react';
import styled from 'styled-components';
import {ButtonSelector as ButtonSelectorBase} from 'components';
import {buttons, optionsByDevice} from './consts';
import {useDispatch, useSelector} from 'react-redux';
import {Device} from 'constants/device';
import actionTypes from 'constants/actionTypes';
import {Select as SelectBase} from 'components/controls';

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
  const phoneType = useSelector((state: any) => state.editorMode.model)
  const device = useSelector((state: any) => state.editorMode.device);
  // TODO типизировать стейт

  const handleChangePlatform = (key: Device) => {
    dispatch({
      type: actionTypes.SET_DEVICE,
      device: key,
    });
  };

  const handleChangeMobile = (e: string) => {
    dispatch({
      type: actionTypes.SET_MODEL_DEVICE,
      model: e
    })
  }

  return (
    <FlexContainer>
      <ButtonSelector buttons={buttons} value={device} onChange={handleChangePlatform} />
      <Select options={optionsByDevice[device as Device]} onChange={handleChangeMobile} value={phoneType.value} />
    </FlexContainer>
  );
};

export default MobileSelect;
