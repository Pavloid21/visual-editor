import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import bottombar from '../../assets/bottombar.svg';
import Wrapper from '../../utils/wrapper';
import {
  iconSelectedColor,
  iconUnselectedColor,
  textSelectedColor,
  textUnselectedColor,
  showUnselectedText
} from '../configs';
import {CustomSvg} from 'components/CustomSvg';
import {setCorrectImageUrl, separateScreenUrl} from 'utils';
import {useAppSelector} from 'store';
import {transformHexWeb} from '../../utils/color';

const BottomBar = styled.div`
  background-color: ${(props) => transformHexWeb(props.backgroundColor || 'transparent')};
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
    color: ${(props) => transformHexWeb(props.iconUnselectedColor)};
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    & .item_icon {
      background-color: ${(props) => transformHexWeb(props.iconUnselectedColor)};
    }
  }
  & .active {
    color: ${(props) => transformHexWeb(props.iconSelectedColor)};
    & div {
      background-color: ${(props) => transformHexWeb(props.iconSelectedColor)};
    }
  }
`;

const Label = styled.label`
  margin-bottom: 0;
  color: ${(props) => props.activeLink ? props.textSelectedColor : props.textUnselectedColor}
`;

const Component = ({settingsUI, ...props}) => {
  const [activeLink, setActiveLink] = useState('');

  const {screen} = useAppSelector((state) => state.output);
  const {id} = useAppSelector(state => state.project);

  const {navigationItems} = settingsUI;

  useEffect(() => {
    if(navigationItems) {
      navigationItems.map((element) => {
        const getCorrectUrl = separateScreenUrl(element.action.url);
        if(getCorrectUrl === screen) {
          setActiveLink(getCorrectUrl);
        }
      });
    }
  }, [navigationItems, screen]);

  const bottomBarItems = navigationItems?.map((item) => {
    const getCorrectUrl = setCorrectImageUrl(item.iconUrl, id);

    return {
      ...item,
      iconUrl: getCorrectUrl,
    };
  });

  return (
    <Wrapper
      id={props.id}
      style={{position: 'sticky', bottom: 0, marginTop: 'auto', zIndex: 200}}
      sizeModifier="FULLWIDTH"
    >
      <BottomBar {...settingsUI} {...props}>
        {bottomBarItems && bottomBarItems.map((item, index) => {
          const getCorrectUrl = separateScreenUrl(item.action.url);
          return (
            <div key={`bottomBarItem_${index}`}>
              <CustomSvg
                fill={getCorrectUrl === activeLink ? settingsUI.iconSelectedColor : settingsUI.iconUnselectedColor}
                src={item.iconUrl}
                sizeSvg={`${19.2 * 1.25}px`}
               />
               {settingsUI.showUnselectedText ? (
                <Label
                  activeLink={getCorrectUrl === activeLink}
                  {...settingsUI}
                >
                  {getCorrectUrl === activeLink ? item.screenName : ''}
                </Label>
               ) : (
                <Label
                  activeLink={getCorrectUrl === activeLink}
                  {...settingsUI}
                >
                  {item.screenName}
                </Label>
               )}
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
        },
      },
    ],
  },
  config: {
    backgroundColor: {type: 'color', name: 'Background color'},
    iconSelectedColor,
    iconUnselectedColor,
    textSelectedColor,
    textUnselectedColor,
    showUnselectedText,
    navigationItems: [
      {
        screenName: {type: 'string', name: 'Screen name'},
        iconUrl: {type: 'string', name: 'Image'},
        action: {
          url: {
            type: 'select',
            name: 'Action URL',
            action_types: 'screens,other'
          },
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
