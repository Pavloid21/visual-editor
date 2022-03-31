import {Container} from 'components/layouts';
import React from 'react';
import styled from 'styled-components';
import {ButtonSelector as ButtonSelectorBase} from 'components';
import {buttons} from './consts';
import {useDispatch, useSelector} from 'react-redux';
import {Device} from 'constants/device';
import actionTypes from 'constants/actionTypes';

const ButtonSelector = styled(ButtonSelectorBase)`
  ${Container.className} {
    margin-bottom: 0px;
  }
`;

const MobileSelect = () => {
  const dispatch = useDispatch();
  const device = useSelector((state: any) => state.editorMode.device);
  // TODO типизировать стейт

  const handleChange = (key: Device) => {
    dispatch({
      type: actionTypes.SET_DEVICE,
      device: key,
    });
  };

  return <ButtonSelector buttons={buttons} value={device} onChange={handleChange} />;
};

export default MobileSelect;
