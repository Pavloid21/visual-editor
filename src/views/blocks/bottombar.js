import React from 'react';
import styled from 'styled-components';
import bottombar from '../../assets/bottombar.svg';
import Wrapper from '../../utils/wrapper';
import {iconSelectedColor, iconUnselectedColor, showUnselectedText} from '../configs';

const BottomBar = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 16px 0 16px 0;
  bottom: 0;
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & div {
    position: relative;
    flex: 1 1 auto;
    justify-content: center;
    color: ${(props) => props.iconUnselectedColor};
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    & label {
      margin-bottom: 0;
    }
    & .item_icon {
      background-color: ${(props) => props.iconUnselectedColor};
    }
  }
  & .active {
    color: ${(props) => props.iconSelectedColor};
    & div {
      background-color: ${(props) => props.iconSelectedColor};
    }
  }
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  mask: url(${(props) => props.iconUrl}) no-repeat center;
`;

const Component = ({settingsUI, ...props}) => {
  const {navigationItems} = settingsUI;
  const buttons = [];
  for (let index in navigationItems) {
    buttons.push(navigationItems[index]);
  }
  return (
    <Wrapper
      id={props.id}
      style={{position: 'sticky', bottom: 0, marginTop: 'auto', zIndex: 200}}
      sizeModifier="FULLWIDTH"
    >
      <BottomBar {...settingsUI} {...props}>
        {buttons.map((item, index) => {
          return (
            <div key={`bottomBarItem_${index}`}>
              <Icon className="item_icon" iconUrl={item.iconUrl}></Icon>
              <label>{item.screenName}</label>
            </div>
          );
        })}
      </BottomBar>
    </Wrapper>
  );
};

const block = () => ({
  Component,
  name: 'BOTTOMBAR',
  title: 'Bottom navigation',
  description: 'Bottom navigation bars allow movement between primary destinations in an app.',
  previewImageUrl: bottombar,
  category: 'Container',
  defaultData: {
    backgroundColor: '#423649',
    iconSelectedColor: '#E9E8EA',
    iconUnselectedColor: '#A29CA6',
    textSelectedColor: '#E9E8EA',
    textUnselectedColor: '#A29CA6',
    navigationItems: [
      {
        screenName: 'Main',
        iconUrl: 'icons/material/action/ic_home_48px',
        action: {
          url: '',
        },
      },
      {
        screenName: 'Contacts',
        iconUrl: 'icons/material/social/ic_people_48px',
        action: {
          url: '',
        },
      },
      {
        screenName: 'Profile',
        iconUrl: 'icons/material/action/ic_account_circle_48px',
        action: {
          url: '',
          target: '',
        },
      },
    ],
  },
  config: {
    backgroundColor: {type: 'color', name: 'Background color'},
    iconSelectedColor,
    iconUnselectedColor,
    showUnselectedText,
    navigationItems: [
      {
        screenName: {type: 'string', name: 'Screen name'},
        iconUrl: {type: 'string', name: 'Image'},
        action: {
          url: {
            type: 'select',
            name: 'Action URL',
            action_types: 'data'
          },
          target: {type: 'string', name: 'Target'},
          method: {
            type: 'select',
            name: 'Method',
            options: [
              {label: 'Get', value: 'get'},
              {label: 'Post', value: 'post'},
            ],
          },
        },
      },
    ],
  },
  interactive: {
    action: {
      url: {
        type: 'string',
        name: 'Action URL',
      },
      fields: {type: 'array', name: 'Fields set'},
    },
  },
});

export default block;
