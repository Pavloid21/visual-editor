import {Select} from 'components/controls';
import {FlexContainer as FlexContainerBase} from 'components/layouts';
import actionTypes from 'constants/actionTypes';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {Zoom} from './types';
import {options} from './consts';
import {ReactComponent as MinusIcon} from 'assets/zoom_minus.svg';
import {ReactComponent as PlusIcon} from 'assets/zoom_plus.svg';

const FlexContainer = styled(FlexContainerBase)`
  margin-left: auto;
  align-items: center;
  position: relative;
  .icon:first-child {
    margin-right: 15px;
  }
  .icon:last-child {
    margin-left: 15px;
  }
`;

const ZoomSelect = () => {
  const zoom = useSelector((state: any) => state.editorMode.zoom);
  const dispatch = useDispatch();

  const handleChangeZoom = (e: Zoom) => {
    dispatch({
      type: actionTypes.SET_ZOOM,
      zoom: e,
    });
  };

  const mappedZoomValue = options.map(o => o.value);

  const handleDecrementZoom = () => {
    const currentIndex = mappedZoomValue.findIndex(z => z === zoom);
    if(currentIndex > 0) {
      dispatch({
        type: actionTypes.SET_ZOOM,
        zoom: mappedZoomValue[currentIndex - 1]
      });
    }
  };

  const handleIncrementZoom = () => {
    const currentIndex = mappedZoomValue.findIndex(z => z === zoom);
    if(currentIndex < mappedZoomValue.length - 1) {
      console.log(currentIndex, mappedZoomValue);
      dispatch({
        type: actionTypes.SET_ZOOM,
        zoom: mappedZoomValue[currentIndex + 1]
      });
    }
  };

  return (
    <FlexContainer>
      <MinusIcon className='icon' onClick={handleDecrementZoom}/>
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
            lineHeight: '14px',
          }),
        }}
      />
      <PlusIcon className='icon' onClick={handleIncrementZoom}/>
    </FlexContainer>
  );
};

export default ZoomSelect;
