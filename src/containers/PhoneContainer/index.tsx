import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {DeviceKeys, mockByDeviceKey, stylesByDeviceKey} from 'containers/MobileSelect/consts';
import {PanZoom} from 'react-easy-panzoom';
import {Zoom} from 'containers/ZoomSelect/types';
import {useRef} from 'react';
import {Store} from 'reducers/types';

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

interface IPhoneContainer {
  children?: React.ReactChildren;
}

const PhoneContainer = (props: IPhoneContainer) => {
  const topAppBar = useSelector((state: Store) => state.layout.topAppBar);
  const model: string = useSelector((state: Store) => state.editorMode.model);
  const zoom: Zoom = useSelector((state: Store) => state.editorMode.zoom);

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

  return (
    <PanZoom ref={zoomRef} autoCenter disableDoubleClickZoom disableKeyInteraction disableScrollZoom>
      <Wrapper
        styled={{...stylesByDeviceKey[model as DeviceKeys]}}
        backgroundColor={topAppBar?.settingsUI.backgroundColor}
      >
        {props.children}
      </Wrapper>
      {mockByDeviceKey[model as DeviceKeys]}
    </PanZoom>
  );
};

export default PhoneContainer;
