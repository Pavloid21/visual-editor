import React from 'react';
import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import checkbox_ic from 'assets/checkbox.svg';
import {
  checkedIcon,
  uncheckedIcon,
  iconSelectedColor,
  iconUnselectedColor,
  padding,
  isActive,
  filter,
  interactive,
  isGetValueFromBD,
} from 'views/configs';
import {setCorrectImageUrl, getFieldValue, checkExtension} from 'utils';
import {CustomSvg} from 'components/CustomSvg';
import {useAppSelector} from 'store';
import {
  CircleIcon,
  SquareIcon,
  CheckCircleIcon,
  CheckSquareIcon
} from 'components/Images/Icon/components/Icons';

const multiplicationFactor = 1.25;
const defaultSizeIcon = 24;

const Checkbox = styled.span`
  width: ${defaultSizeIcon * multiplicationFactor}px;
  height: ${defaultSizeIcon * multiplicationFactor}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  padding: 9px;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.6);

  & input {
    cursor: inherit;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    margin: 0px;
    padding: 0px;
    z-index: 1;
  }
`;

const RenderImage = ({getExtension, getCorrectImageUrl, url, color, id}) => (
  <>
    {getExtension === 'icons' || checkExtension(getCorrectImageUrl) === 'svg' ? (
        <CustomSvg
          fill={color || '#d9dadc'}
          src={setCorrectImageUrl(url, id)}
          sizeSvg={`${defaultSizeIcon * multiplicationFactor}px`}
        />
    ) : (
      <img
        src={setCorrectImageUrl(url, id)}
        width={`${defaultSizeIcon * multiplicationFactor}px`}
        height={`${defaultSizeIcon * multiplicationFactor}px`}
      />
    )}
  </>
);

const Component = ({settingsUI, ...props}) => {
  const {id} = useAppSelector(state => state.project);
  const {device} = useAppSelector((state) => state.editorMode);

  const defaultIcon = {
    IOS: settingsUI.isActive ? (
      <CheckCircleIcon color={settingsUI.iconSelectedColor} size={`${defaultSizeIcon * multiplicationFactor}px`} />
    ) : (
      <CircleIcon color={settingsUI.iconUnselectedColor } size={`${defaultSizeIcon * multiplicationFactor}px`} />
    ),
    ANDROID: settingsUI.isActive ? (
      <CheckSquareIcon color={settingsUI.iconSelectedColor} size={`${defaultSizeIcon * multiplicationFactor}px`} />
    ) : (
      <SquareIcon color={settingsUI.iconUnselectedColor } size={`${defaultSizeIcon * multiplicationFactor}px`} />
    )
  };

  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Checkbox>
        <input />

        <span>
          {settingsUI.isActive ? (
            <>
              {!settingsUI.checkedIcon ? (
                <>
                  {defaultIcon[device]}
                </>
              ) : (
                <RenderImage
                  getExtension={getFieldValue(settingsUI.checkedIcon)}
                  getCorrectImageUrl={setCorrectImageUrl(settingsUI.checkedIcon, id)}
                  url={settingsUI.checkedIcon}
                  color={settingsUI.iconSelectedColor}
                  id={id}
                />
              )}
            </>
          ) : (
            <>
              {!settingsUI.uncheckedIcon ? (
                <>
                  {defaultIcon[device]}
                </>
              ) : (
                  <RenderImage
                    getExtension={getFieldValue(settingsUI.uncheckedIcon)}
                    getCorrectImageUrl={setCorrectImageUrl(settingsUI.uncheckedIcon, id)}
                    url={settingsUI.uncheckedIcon}
                    color={settingsUI.iconUnselectedColor}
                    id={id}
                  />
              )}
            </>
          )}
        </span>
      </Checkbox>
    </Wrapper>
  );
};

const block = () => ({
    Component,
    name: 'CHECKBOX',
    title: 'Checkbox',
    description: 'A control that checkboxes between on and off states.',
    previewImageUrl: checkbox_ic,
    category: 'Controls',
    defaultData: {
    },
    defaultInteractiveOptions: {
      action: {url: '', fields: {}},
      filter: {
        id: '',
        query: [{}],
      },
    },
    interactive: {
      field: {type: 'string', name: 'Field name'},
      action: {
        url: {
          type: 'select',
          name: 'Action URL',
          action_types: 'actions,other',
        },
        method: interactive.action.method,
        fields: interactive.action.fields,
        confirmationDialog: {
          title: interactive.action.confirmationDialog.title,
          message: interactive.action.confirmationDialog.message,
          confirmText: interactive.action.confirmationDialog.confirmText,
          cancelledText: interactive.action.confirmationDialog.cancelledText,
        },
        id: interactive.action.id,
        delegateActionId: interactive.action.delegateActionId,
      },
      filter: {
        id: filter.id,
        applyHere: filter.applyHere,
        query: filter.query,
      },
      isGetValueFromBD,
    },
    config: {
      uncheckedIcon,
      checkedIcon,
      iconSelectedColor,
      iconUnselectedColor,
      isActive,
      padding,
    },
  });

export default block;
