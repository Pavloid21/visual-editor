import React, {useEffect, useState} from 'react';
import SelectBase from 'react-select';
import {ISelect} from './types';
import {Label} from 'components/controls';
import {WithLabel} from './WithLabel';
import {DropdownIndicator} from './Dropdown';
import {baseStyleSelect} from './style';
import {BASE_URL, getActionsList, getDataActionsList} from 'services/ApiService';

export const Select = React.memo((props: ISelect) => {
  const {onChange, options, value, className, label, menuPlacement, styles, clearable} = props;
  const [optionsList, setOptions] = useState(options);

  const currentOption = options.find((e) => value === e.value);
  const projectId = window.location.pathname.split('/').pop();

  const getActionsOptions = async (actionTypes: string) => {
    let options =[];
    let actions = {data: []};
    let data = {data: []};
    if (actionTypes.split(',')?.includes('actions')) actions = await getActionsList(projectId!);
    if (actionTypes.split(',')?.includes('data')) data = await getDataActionsList(projectId!);
    options = [
      ...actions.data.map((action: string) => ({
        label: action,
      //  value: `${BASE_URL}projects/${projectId}/admin/actions/${action}`,
      value: `actions/${action}`,
      })),
      ...data.data.map((action: string) => ({
        label: action,
        value: `data/${action}`,
      })),
    ];
    return options;
  };

  useEffect(() => {
    if (props.async) {
      getActionsOptions(props.async).then((list) => {
        setOptions(list);
      });
    }
  }, []);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  return (
    <WithLabel label={!!label}>
      {label && <Label>{label}</Label>}
      <SelectBase
        onChange={(e) => {
          onChange(e?.value);
        }}
        options={optionsList}
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
  );
});
