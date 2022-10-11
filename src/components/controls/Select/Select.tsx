import React, {useCallback, useEffect, useMemo, useState} from 'react';
import SelectBase from 'react-select';
import {ISelect} from './types';
import {Input, Label} from 'components/controls';
import {WithLabel} from './WithLabel';
import {DropdownIndicator} from './Dropdown';
import {baseStyleSelect} from './style';
import {getActionsList, getDataActionsList, getScreenesList} from 'services/ApiService';
import {Indicator, Item, TabsContainer} from './Select.styled';
import {AnimateSharedLayout} from 'framer-motion';

export const Select = React.memo((props: ISelect) => {
  const {onChange, options, value, className, label, menuPlacement, styles, clearable} = props;
  const [optionsList, setOptions] = useState(options);
  const menus = ['Navigation', 'Custom action', 'Data usage', 'Other'];

  const getCurrentTab = useCallback(
    (value: string | undefined) => {
      if (value && props.async) {
        if (value.indexOf('screen') === 0) {
          return menus[0];
        }
        if (value.indexOf('action') === 0) {
          return menus[1];
        }
        if (value.indexOf('data') === 0) {
          return menus[2];
        }
      }
      return menus[3];
    },
    [value]
  );

  const [selected_value, setSelectedValue] = useState(getCurrentTab(value));
  const [optionsModel, setModel] = useState<any>({
    [menus[0]]: [],
    [menus[1]]: [],
    [menus[2]]: [],
    [menus[3]]: [],
  });

  const currentOption = (optionsList.length? optionsList : options).find((e) => value === e.value);
  const projectId = window.location.pathname.split('/').pop();

  const getActionsOptions = useCallback(
    async (actionTypes: string) => {
      let actions = {data: []};
      let data = {data: []};
      let screens = {data: []};
      const actionTypesList = actionTypes.split(',');
      if (actionTypesList?.includes('actions')) actions = await getActionsList(projectId!);
      if (actionTypesList?.includes('data')) data = await getDataActionsList(projectId!);
      if (actionTypesList?.includes('screens')) screens = await getScreenesList(projectId!);

      const optionsModel = {
        [menus[0]]: [
          ...screens.data.map((screen: string) => ({
            label: screen,
            value: `screens/${screen}`,
          })),
        ],
        [menus[1]]: [
          ...actions.data.map((action: string) => ({
            label: action,
            value: `actions/${action}`,
          })),
        ],
        [menus[2]]: [
          ...data.data.map((data: string) => ({
            label: data,
            value: `data/${data}`,
          })),
        ],
        [menus[3]]: [],
      };
      setModel(optionsModel);
    },
    [projectId]
  );

  const handleChangeAction = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const getPlaceholder = useCallback(() => {
    if (props.async) {
      switch (selected_value) {
        case menus[0]:
          return 'Select Screen';
        case menus[1]:
        case menus[2]:
          return 'Select Action';
        default:
          return 'Select...';
      }
    }
    return 'Select...';
  }, [selected_value]);

  const fetchData = useCallback(() => {
    if (props.async) {
      getActionsOptions(props.async);
    }
  }, [getActionsOptions, props.async]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (props.async) {
      setOptions(optionsModel[selected_value]);
    } else {
      setOptions(options);
    }
  }, [options, optionsModel, props.async, selected_value]);

  return (
    <>
      {props.async && (
        <TabsContainer>
          <AnimateSharedLayout>
            {menus.map((value) => (
              <Item key={value} isActive={selected_value === value} onClick={() => setSelectedValue(value)}>
                {value}
                {selected_value === value && <Indicator layoutId="idk" />}
              </Item>
            ))}
          </AnimateSharedLayout>
        </TabsContainer>
      )}
      {props.async && selected_value === menus[3] ? (
        <Input $isWide $clearable placeholder="Action" value={value} onChange={handleChangeAction} />
      ) : (
        <WithLabel label={!!label}>
          {label && !props.async && <Label>{label}</Label>}
          <SelectBase
            onChange={(e) => {
              onChange(e?.value);
            }}
            placeholder={getPlaceholder()}
            options={optionsList.length ? optionsList : optionsModel[selected_value]}
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
