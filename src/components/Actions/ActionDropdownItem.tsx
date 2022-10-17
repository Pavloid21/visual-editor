import {ReactComponent as Copy} from 'assets/copy-item.svg';
import {ReactComponent as Trash} from 'assets/trash-item.svg';
import {FC} from 'react';

type ActionDropdownProps = {
  label: string
}

const ActionDropdownItem: FC<ActionDropdownProps> = ({label}) => {
  return (
    <>
      {label === 'Copy' && <div><Copy /><span>{label}</span></div>}
      {label === 'Delete' && <div><Trash /><span>{label}</span></div>}
    </>
  );
};

export default  ActionDropdownItem;
