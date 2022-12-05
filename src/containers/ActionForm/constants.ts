import {IOption} from 'components/controls/Select/types';
import {ActionTypes} from 'store/types';

export const snippetTypeOptions: IOption[] = [
  {label: 'Data Usage', value: ActionTypes.data},
  {label: 'Сustom action', value: ActionTypes.actions},
  {label: 'External action', value: ActionTypes.externals},
];
