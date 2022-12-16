import React, {FC, useRef} from 'react';
import {HexAlphaColorPicker, HexColorInput} from 'react-colorful';
import {ColorItem, WrapperPopoverColor} from 'components/controls/ColorPicker/ColorPicker.styled';
import {useOutsideAlerter} from 'utils';

type TPopoverColorProps = {
  onChange: (value: string) => void | undefined;
  themeColors?: string[];
  value: string;
  onClickThemColors?: (value: string) => void | undefined;
  onClose: () => void;
  position?: string;
}

export const PopoverColor: FC<TPopoverColorProps> = ({onChange, themeColors, onClickThemColors, value, onClose, position}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideAlerter(ref, onClose);

  return (
    <WrapperPopoverColor ref={ref} position={position}>
      <HexAlphaColorPicker
        color={value}
        onChange={onChange}
      />
        <div className="wrapper-palette">
          <HexColorInput
            color={value || ''}
            onChange={onChange}
            alpha={true}
            prefixed={true}
            className="input-popover"
          />
          {themeColors && (
            <>
              <div className="title">Theme palette</div>
              <div className="palette">
                {themeColors.map((text) =>
                  <ColorItem key={text} color={text} onClick={() => onClickThemColors && onClickThemColors(text)}/>
                )}
              </div>
            </>
          )}
        </div>
    </WrapperPopoverColor>
  );
};
