import {Select} from 'components/controls';
import {FlexContainer as FlexContainerBase} from 'components/layouts';
import actionTypes from 'constants/actionTypes';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { Zoom } from './types';
import { options } from './consts';

const FlexContainer = styled(FlexContainerBase)`
    margin-left: auto;
`

const ZoomSelect = () => {
  const zoom = useSelector((state: any) => state.editorMode.zoom);
  const dispatch = useDispatch();

  const handleChangeZoom = (e: Zoom) => {
    dispatch({
        type: actionTypes.SET_ZOOM,
        zoom: e
    })
  };

  return (
    <FlexContainer>
      <Select
        options={options}
        onChange={handleChangeZoom}
        value={zoom}
        menuPlacement="top"
        styles={{
          control: (props) => ({
            ...props,
            fontSize: 14,
          }),
          valueContainer: (props) => ({
            ...props,
            margin: 0,
          }),
          singleValue: (props) => ({
            ...props,
            fontSize: 14,
          }),
          option: (props) => ({
            ...props,
            fontSize: 14,
            height: 30,
            lineHeight: '14px'
          }),
        }}
      />
    </FlexContainer>
  );
};

export default ZoomSelect;
