import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {DeviceKeys, mockByDeviceKey, statusBarByDevice, stylesByDeviceKey} from 'containers/MobileSelect/consts';
import {PanZoom} from 'react-easy-panzoom';
import {Zoom} from 'containers/ZoomSelect/types';
import {ReactComponent as AlignCenterIcon} from 'assets/align-center.svg';
import {setZoom} from 'store/editor-mode.slice';
import type {RootStore} from 'store/types';

const Wrapper = styled.div<any>`
  position: absolute;
  width: 428px;
  height: 836px;
  border-radius: 37px;
  border: 1px solid #000;
  overflow: hidden;
  padding: 56px 26px 0;
  background-color: ${(props) => props.backgroundColor};
  ${(props) => {
    return props.styled;
  }}
`;

const AlignCenterButton = styled.div`
  position: absolute;
  right: 16px;
  bottom: 25px;
  background-color: #fff;
  padding: 20px;
  border-radius: 50px;
  border: 1px solid var(--neo-gray);
  cursor: pointer;
`;

interface IPhoneContainer {
  children?: JSX.Element;
}

const PhoneContainer = (props: IPhoneContainer) => {
  const topAppBar = useSelector((state: RootStore) => state.layout.topAppBar);
  const model: string = useSelector((state: RootStore) => state.editorMode.model);
  const zoom: Zoom = useSelector((state: RootStore) => state.editorMode.zoom);

  const dispatch = useDispatch();

  const zoomRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    zoomRef.current.autoCenter(Number(zoom));
  }, [zoom]);

  const handleCenter = () => {
    // @ts-ignore
    zoomRef.current.autoCenter();
    dispatch(setZoom(Zoom['100%']));
  };

  return (
    <>
      <PanZoom
        ref={zoomRef}
        autoCenter
        disableDoubleClickZoom
        disableKeyInteraction
        disableScrollZoom
        preventPan={(e: any) => !e.altKey}
      >
        <Wrapper
          styled={{...stylesByDeviceKey[model as DeviceKeys]}}
          backgroundColor={topAppBar?.settingsUI.backgroundColor}
        >
          {statusBarByDevice(topAppBar?.settingsUI.backgroundColor, model)}
          {props.children}
        </Wrapper>
        {mockByDeviceKey[model as DeviceKeys]}
      </PanZoom>

      <AlignCenterButton onClick={handleCenter}>
        <AlignCenterIcon />
      </AlignCenterButton>
    </>
  );
};

export default PhoneContainer;
