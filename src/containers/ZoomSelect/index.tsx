import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import styled from 'styled-components';
import {ReactComponent as MinusIcon} from 'assets/zoom_minus.svg';
import {ReactComponent as PlusIcon} from 'assets/zoom_plus.svg';
import {setZoom} from 'store/editor-mode.slice';
import {SelectCreatable} from 'components/controls';
import {FlexContainer as FlexContainerBase} from 'components/layouts';
import {createOption, formatCreateLabel, isValidNewOption, onInputChange, transformValue} from './utils';
import type {Zoom} from './types';
import {options as defaultOptions} from './consts';

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
  const [options, setOptions] = useState(defaultOptions);
  const {zoom} = useAppSelector((state) => state.editorMode);
  const dispatch = useAppDispatch();

  const handleChangeZoom = (e: Zoom) => {
    dispatch(setZoom(e));
  };

  const mappedZoomValue = options.map((o) => o.value);

  const onCreateOption = (value: string) => {
    const zoomValue = transformValue(value);
    const option = createOption(value);

    setOptions([...defaultOptions, option]);
    dispatch(setZoom(zoomValue as Zoom));
  };

  const handleDecrementZoom = () => {
    const currentIndex = mappedZoomValue.findIndex((z) => z === zoom);
    if (currentIndex > 0) {
      dispatch(setZoom(mappedZoomValue[currentIndex - 1] as Zoom));
    }
  };

  const handleIncrementZoom = () => {
    const currentIndex = mappedZoomValue.findIndex((z) => z === zoom);
    if (currentIndex < mappedZoomValue.length - 1) {
      dispatch(setZoom(mappedZoomValue[currentIndex + 1] as Zoom));
    }
  };

  return (
    <FlexContainer>
      <MinusIcon className="icon" onClick={handleDecrementZoom} />
      <SelectCreatable
        options={options}
        onChange={handleChangeZoom}
        value={zoom}
        clearable={false}
        onCreateOption={onCreateOption}
        formatCreateLabel={formatCreateLabel}
        isValidNewOption={isValidNewOption}
        onInputChange={onInputChange}
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
          container: (props) => ({
            ...props,
            minWidth: '90px',
          }),
        }}
      />
      <PlusIcon className="icon" onClick={handleIncrementZoom} />
    </FlexContainer>
  );
};

export default React.memo(ZoomSelect);
