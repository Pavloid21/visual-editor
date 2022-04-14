import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {DeviceKeys, mockByDeviceKey, stylesByDeviceKey} from 'containers/MobileSelect/consts';
import {PanZoom} from 'react-easy-panzoom';
import {Zoom} from 'containers/ZoomSelect/types';
import {useRef} from 'react';

const Wrapper = styled.div``;

interface IPhoneContainer {
  children?: React.ReactChildren;
}

const PhoneContainer = (props: IPhoneContainer) => {
  const topAppBar = useSelector((state: any) => state.layout.topAppBar);
  const model = useSelector((state: any) => state.editorMode.model);
  const zoom: Zoom = useSelector((state: any) => state.editorMode.zoom);

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
      <Wrapper>
        <div
          style={{
            position: 'absolute',
            width: '428px',
            height: '836px',
            borderRadius: '37px',
            border: '1px solid #000',
            overflow: 'hidden',
            padding: '56px 26px 0px',
            backgroundColor: topAppBar ? topAppBar.blockId.backgroundColor : 'rgb(255, 255, 255)',
            // clipPath: 'url(#maskRect1)',
            ...stylesByDeviceKey[model as DeviceKeys],
          }}
        >
          {props.children}
        </div>
      </Wrapper>
      {mockByDeviceKey[model as DeviceKeys]}
    </PanZoom>
  );
};

export default PhoneContainer;
