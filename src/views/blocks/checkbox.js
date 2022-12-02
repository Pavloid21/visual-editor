import React from 'react';
import styled from 'styled-components';
import {hexToRgb} from 'constants/utils';
import Wrapper from 'utils/wrapper';
import checkbox_ic from 'assets/checkbox.svg';
import {
  checkedIcon,
  uncheckedIcon,
  iconSelectedColor,
  iconUnselectedColor,
  padding,
  isActive,
  interactive,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store, {useAppSelector} from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';
import {setCorrectImageUrl, getFieldValue, checkExtension} from 'utils';
import {CustomSvg} from 'components/CustomSvg';

const Image = styled.img`
  width: 24px;
  height: 24px;
  display: flex;
  align-self: center;
  z-index: 90;
`;

const Component = ({settingsUI, ...props}) => {
  const {id} = useAppSelector(state => state.project);
  const getCorrectImageUrl = setCorrectImageUrl(settingsUI.uncheckedIcon, id);
  const getExtension = getFieldValue(settingsUI.uncheckedIcon);

  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      {getExtension === 'icons' || checkExtension(getCorrectImageUrl) === 'svg' ? (
        <CustomSvg fill={settingsUI.iconUnselectedColor} src={getCorrectImageUrl} />
      ) : (
        <Image
          {...settingsUI}
          {...props}
          className="draggable"
          src={getCorrectImageUrl}
        />
      )}
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
    },
    interactive: {
      field: {type: 'string', name: 'Field name'},
      action: {
        url: {
          type: 'select',
          name: 'Action URL',
          action_types: 'actions,other',
        },
        method: {
          type: 'select',
          name: 'Method',
          options: [
            {label: 'Get', value: 'get'},
            {label: 'Post', value: 'post'},
          ],
        },
        fields: {
          type: 'object',
          properties: {
            key: {type: 'string', name: 'Key'},
            value: {type: 'string', name: 'Value'},
          },
        },
      },
      confirmationDialog: {
        title: {
          type: 'string',
          name: 'Title',
        },
        message: {
          type: 'string',
          name: 'Message',
        },
        confirmText: {
          type: 'string',
          name: 'Confirm text',
        },
        cancelledText: {
          type: 'string',
          name: 'Cancelled text',
        },
      },
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
