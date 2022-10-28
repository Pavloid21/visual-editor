import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeviceKeys,
  mockByDeviceKey,
  statusBarByDevice,
  stylesByDeviceKey
} from 'containers/MobileSelect/consts';
import {PanZoom} from 'react-easy-panzoom';

import {Zoom} from 'containers/ZoomSelect/types';
import {ReactComponent as AlignCenterIcon} from 'assets/align-center.svg';
import {setZoom} from 'store/editor-mode.slice';

import {BottomSheetContainer, Wrapper, AlignCenterButton} from './PhoneContainer.styled';

import type {RootStore} from 'store/types';

interface IPhoneContainer {
  children?: JSX.Element;
}

export const PhoneContainer = (props: IPhoneContainer) => {
  const [countHeightTopBlock, setCountHeightTopBlock] = useState<string>('30%');

  const topAppBar = useSelector((state: RootStore) => state.layout.topAppBar);
  const model: string = useSelector((state: RootStore) => state.editorMode.model);
  const zoom: Zoom = useSelector((state: RootStore) => state.editorMode.zoom);
  const {settingsUI} = useSelector((state: RootStore) => state.output);
  const dispatch = useDispatch();
  const zoomRef = useRef(null);

  const maxHeight = 100;

  useEffect(() => {
    // @ts-ignore
    zoomRef.current.autoCenter(Number(zoom));
  }, [zoom]);

  const handleCenter = () => {
    // @ts-ignore
    zoomRef.current.autoCenter();
    dispatch(setZoom(Zoom['100%']));
  };

  useEffect(() => {
    if(settingsUI) {
      const result = maxHeight - settingsUI.bottomSheetSettings?.heightInPercent;
      setCountHeightTopBlock(`${result}%`);
    }
  }, [settingsUI]);

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
          {settingsUI && settingsUI.isBottomSheet ? (
            <>
              {statusBarByDevice(topAppBar?.settingsUI.backgroundColor, model)}
              <BottomSheetContainer
                backgroundColor={settingsUI.bottomSheetSettings?.scrimColor}
                heightTop={countHeightTopBlock}
                heightInPercent={`${settingsUI.bottomSheetSettings?.heightInPercent}%`}
              >
                <div className="top-block" />
                <div className="bottom-sheet">
                  {props.children}
                </div>
              </BottomSheetContainer>
            </>
          ) : (
            <>
              {statusBarByDevice(topAppBar?.settingsUI.backgroundColor, model)}
              {props.children}
            </>
          )}
        </Wrapper>

        {mockByDeviceKey[model as DeviceKeys]}
      </PanZoom>

      <AlignCenterButton onClick={handleCenter}>
        <AlignCenterIcon />
      </AlignCenterButton>
    </>
  );
};
