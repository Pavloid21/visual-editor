import React, {useCallback, useEffect, useState} from 'react';
import SelectBase from 'react-select';
import {ISelect} from './types';
import {Input, Label} from 'components/controls';
import {WithLabel} from './WithLabel';
import {DropdownIndicator} from './Dropdown';
import {baseStyleSelect} from './style';
import {getDataActionsList} from 'services/ApiService';
import {Indicator, Item, TabsContainer} from './Select.styled';
import {AnimateSharedLayout} from 'framer-motion';
import {ActionTypes} from 'store/types';
import {ReactComponent as ImageIcon} from 'assets/image_icon.svg';
import {useDispatch} from 'react-redux';
import {setLeftBarMenu} from 'store/left-bar-menu.slice';

export const ImageSelect = React.memo((props: ISelect) => {
  const {onChange, options, value, className, label, menuPlacement, styles, clearable} = props;
  const [optionsList, setOptions] = useState(options || []);
  const dispatch = useDispatch();
  const menus = [
    {actionType: 'icons', title: 'Image'},
    {actionType: 'data', title: 'Data usage'},
    {actionType: 'other', title: 'Other'},
  ];

  const actionTypesList = props.async?.split(',');

  const filteredMenu = menus.filter((option) => {
    return actionTypesList?.includes(option.actionType);
  });

  const getCurrentTab = useCallback(
    (value: string | undefined) => {
      if (value && props.async) {
        if (value.indexOf('icons') === 0 || value.indexOf('files') === 0) {
          return filteredMenu.find((option) => option.actionType === 'icons')?.actionType;
        }
        if (value.indexOf(ActionTypes.data) === 0) {
          return filteredMenu.find((option) => option.actionType === ActionTypes.data)?.actionType;
        }
      }
      return 'other';
    },
    [filteredMenu, props.async]
  );

  const [selected_value, setSelectedValue] = useState(getCurrentTab(value));
  const [optionsModel, setModel] = useState<any>({
    [menus[0].actionType]: [],
    [menus[1].actionType]: [],
    [menus[2].actionType]: [],
  });

  const isImageSelected = (): boolean => {
    return selected_value === 'icons';
  };

  const getInputValue = () => {
    if (isImageSelected()) {
      return value?.indexOf('icons') === 0 || value?.indexOf('files') === 0 ? value : undefined;
    }
    return value;
  };

  const currentOption = (optionsList?.length ? optionsList : options).find((e) => value === e.value);
  const projectId = window.location.pathname.split('/').pop();

  const getActionsOptions = useCallback(async () => {
    let data = {data: []};
    let optionsModel = {};

    if (actionTypesList?.includes('data')) {
      data = await getDataActionsList(projectId!);
      optionsModel = {
        ...optionsModel,
        data: data.data.map((data: string) => ({
          label: data,
          value: `data/${data}`,
        })),
      };
    }
    setModel(optionsModel);
  }, [actionTypesList, projectId]);

  const handleChangeAction = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const getPlaceholder = useCallback(() => {
    return props.async && selected_value === 'data' ? 'Select Action' : 'Select...';
  }, [props.async, selected_value]);

  useEffect(() => {
    if (props.async) {
      getActionsOptions();
    }
  }, [props.async]);

  useEffect(() => {
    if (props.async) {
      setOptions(optionsModel[selected_value || 'other']);
    } else {
      setOptions(options);
    }
  }, [options, optionsModel, selected_value]);
  return (
    <>
      {props.async && (
        <TabsContainer>
          <AnimateSharedLayout>
            {menus.map((value) => (
              <Item
                key={value.title}
                isActive={selected_value === value.actionType}
                onClick={() => setSelectedValue(value.actionType)}
              >
                {value.title}
                {selected_value === value.actionType && <Indicator layoutId="idk" />}
              </Item>
            ))}
          </AnimateSharedLayout>
        </TabsContainer>
      )}
      {(props.async && selected_value === 'other') || isImageSelected() ? (
        <Input
          $isWide
          $clearable={!isImageSelected()}
          disabled={isImageSelected()}
          placeholder={isImageSelected() ? 'Image' : 'http://example.com'}
          label={label}
          value={getInputValue()}
          onChange={handleChangeAction}
          icon={
            isImageSelected() ? (
              <ImageIcon
                className="icon"
                onClick={() => {
                  dispatch(setLeftBarMenu('image'));
                }}
              />
            ) : undefined
          }
        />
      ) : (
        <WithLabel label={!!label}>
          {label && <Label>{label}</Label>}
          <SelectBase
            onChange={(e) => {
              onChange(e?.value);
            }}
            placeholder={getPlaceholder()}
            options={optionsList?.length ? optionsList : optionsModel[selected_value || 'Other']}
            value={currentOption}
            isMulti={false}
            isClearable={clearable}
            className={className}
            menuPlacement={menuPlacement}
            styles={{
              ...baseStyleSelect,
              ...styles,
            }}
            components={{DropdownIndicator}}
          />
        </WithLabel>
      )}
    </>
  );
});
