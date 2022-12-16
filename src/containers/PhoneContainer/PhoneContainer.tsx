import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
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

interface IPhoneContainer {
  children?: JSX.Element;
}

export const PhoneContainer = (props: IPhoneContainer) => {
  const [countHeightTopBlock, setCountHeightTopBlock] = useState<string>('30%');

  const topAppBar = useAppSelector((state) => state.layout.topAppBar);
  const model: string = useAppSelector((state) => state.editorMode.model);
  const zoom: Zoom = useAppSelector((state) => state.editorMode.zoom);
  const {settingsUI} = useAppSelector((state) => state.output);
  const dispatch = useAppDispatch();
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
              {statusBarByDevice(settingsUI.bottomSheetSettings?.scrimColor, model)}
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
