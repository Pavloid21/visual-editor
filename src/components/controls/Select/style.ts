import {GroupBase, StylesConfig} from 'react-select';
import type {IOption} from 'components/controls/Select/types';

export const baseStyleSelect: StylesConfig<IOption, false, GroupBase<IOption>> = {
  indicatorSeparator: () => ({display: 'none'}),
  control: (props) => ({
    ...props,
    borderColor: '#8c8c8c',
    minHeight: 42,
  }),
  option: (props, state) => ({
    ...props,
    backgroundColor: (() => {
      if (state.isSelected) return 'var(--main-color)';
      if (state.isFocused) return 'var(--hover-color)';
      return '#FFFFFF';
    })(),
    color: (() => {
      if (state.isSelected || state.isFocused) return '#FFFFFF';
      return 'var(--neo-black)';
    })(),
  }),
};
