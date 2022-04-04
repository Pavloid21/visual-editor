import {Container, FlexContainer} from 'components/layouts';
import React, {useState} from 'react';
import styled from 'styled-components';
import {ButtonSelector as ButtonSelectorBase} from 'components';
import {buttons, options} from './consts';
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
`;

const MobileSelect = () => {
  const [phoneType, setPhoneType] = useState<string>('1');
  const dispatch = useDispatch();
  const device = useSelector((state: any) => state.editorMode.device);
  // TODO типизировать стейт

  const handleChangePlatform = (key: Device) => {
    dispatch({
      type: actionTypes.SET_DEVICE,
      device: key,
    });
  };

  const handleChangeMobile = (e: string) => setPhoneType(e);

  return (
    <FlexContainer>
      <ButtonSelector buttons={buttons} value={device} onChange={handleChangePlatform} />
      <Select options={options} onChange={handleChangeMobile} value={phoneType} />
    </FlexContainer>
  );
};

export default MobileSelect;
