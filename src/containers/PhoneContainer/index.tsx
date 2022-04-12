import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {DeviceKeys, mockByDeviceKey, stylesByDeviceKey} from 'containers/MobileSelect/consts';

const Wrapper = styled.div``;

interface IPhoneContainer {
  children?: React.ReactChildren;
}

const PhoneContainer = (props: IPhoneContainer) => {
  const topAppBar = useSelector((state: any) => state.layout.topAppBar);
  const model = useSelector((state: any) => state.editorMode.model);
  
  return (
    <>
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
            ...stylesByDeviceKey[model as DeviceKeys]
          }}
        >
          {props.children}
        </div>
      </Wrapper>
      {mockByDeviceKey[model as DeviceKeys]}
    </>
  );
};

export default PhoneContainer;
