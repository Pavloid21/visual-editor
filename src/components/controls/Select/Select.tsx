import React, {useCallback, useEffect, useState} from 'react';
import SelectBase from 'react-select';
import {ISelect} from './types';
import {Input, Label} from 'components/controls';
import {WithLabel} from './WithLabel';
import {DropdownIndicator} from './Dropdown';
import {baseStyleSelect} from './style';
import {getActionsList, getDataActionsList, getScreensList} from 'services/ApiService';
import {Indicator, Item, TabsContainer} from './Select.styled';
import {AnimateSharedLayout} from 'framer-motion';
import {ActionTypes} from 'store/types';

export const Select = React.memo((props: ISelect) => {
  const {onChange, options, value, className, label, menuPlacement, styles, clearable} = props;
  const [optionsList, setOptions] = useState(options || []);
  const menus = [
    {actionType: 'screens', title: 'Navigation'},
    {actionType: 'actions', title: 'Custom action'},
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
        if (value.indexOf('screen') === 0) {
          return filteredMenu.find((option) => option.actionType === 'screen')?.actionType;
        }
        if (value.indexOf(ActionTypes.action) === 0) {
          return filteredMenu.find((option) => option.actionType === 'actions')?.actionType;
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
    [menus[3].actionType]: [],
  });

  const currentOption = (optionsList?.length ? optionsList : options).find((e) => value === e.value);
  const projectId = window.location.pathname.split('/').pop();

  const getActionsOptions = useCallback(async () => {
    let actions = {data: []};
    let data = {data: []};
    let screens = {data: []};
    let optionsModel = {};

    if (actionTypesList?.includes('actions')) {
      actions = await getActionsList(projectId!);
      optionsModel = {
        ...optionsModel,
        actions: actions.data.map((action: string) => ({
          label: action,
          value: `actions/${action}`,
        })),
      };
    }
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
    if (actionTypesList?.includes('screens')) {
      screens = await getScreensList(projectId!);
      optionsModel = {
        ...optionsModel,
        screens: screens.data.map((screen: string) => ({
          label: screen,
          value: `screens/${screen}`,
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
    if (props.async) {
      switch (selected_value) {
        case 'screens':
          return 'Select Screen';
        case 'actions':
        case 'data':
          return 'Select Action';
        default:
          return 'Select...';
      }
    }
    return 'Select...';
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
            {filteredMenu.map((value) => (
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
      {props.async && selected_value === 'other' ? (
        <Input $isWide $clearable placeholder="Action" value={value} onChange={handleChangeAction} />
      ) : (
        <WithLabel label={!!label}>
          {label && <Label>{label}</Label>}
          <SelectBase
            onChange={(e) => {
              onChange(e?.value);
            }}
            placeholder={getPlaceholder()}
            options={optionsList?.length ? optionsList : optionsModel[selected_value || 'other']}
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
