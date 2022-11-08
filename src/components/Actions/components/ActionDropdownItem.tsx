import {ActionsDropdown} from 'components/Actions/types';
import {ReactElement} from 'react';

type ActionDropdownItemProps = {
  label: ActionsDropdown;
  icon: ReactElement
}

export const ActionDropdownItem = ({label, icon}: ActionDropdownItemProps) => {
  return (
    <div>
      {icon}<span>{label}</span>
    </div>
  );
};
