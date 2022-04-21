import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {DeviceKeys, mockByDeviceKey, statusBarByDevice, stylesByDeviceKey} from 'containers/MobileSelect/consts';
import {PanZoom} from 'react-easy-panzoom';
import {Zoom} from 'containers/ZoomSelect/types';
import {useRef} from 'react';
import {Store} from 'reducers/types';
import {ReactComponent as AlignCenterIcon} from 'assets/align-center.svg';
import actionTypes from 'constants/actionTypes';

const Wrapper = styled.div<any>`
  position: absolute;
  width: 428px;
  height: 836px;
  border-radius: 37px;
  border: 1px solid #000;
  overflow: hidden;
  padding: 56px 26px 0px;
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
  children?: React.ReactChildren;
}

const PhoneContainer = (props: IPhoneContainer) => {
  const topAppBar = useSelector((state: Store) => state.layout.topAppBar);
  const model: string = useSelector((state: Store) => state.editorMode.model);
  const zoom: Zoom = useSelector((state: Store) => state.editorMode.zoom);

  const dispatch = useDispatch();

  const zoomRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    zoomRef.current.zoomAbs(
      // @ts-ignore
      zoomRef.current.container.current.clientWidth / 2,
      // @ts-ignore
      zoomRef.current.container.current.clientHeight / 2,
      Number(zoom)
    );
  }, [zoom]);

  const handleCenter = () => {
    // @ts-ignore
    zoomRef.current.autoCenter();
    dispatch({
      type: actionTypes.SET_ZOOM,
      zoom: Zoom['100%'],
    });
  };

  return (
    <>
      <PanZoom ref={zoomRef} autoCenter disableDoubleClickZoom disableKeyInteraction disableScrollZoom>
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
