import {ReactComponent as Copy} from 'assets/copy-item.svg';
import {ReactComponent as Trash} from 'assets/trash-item.svg';
import {FC} from 'react';
import {ActionsDropdown} from '../types';

type ActionDropdownItemProps = {
  label: ActionsDropdown;
}

export const ActionDropdownItem: FC<ActionDropdownItemProps> = ({label}) => {
  const renderButtonImg = (label: ActionsDropdown) => {
    switch (label) {
      case ActionsDropdown.Copy:
        return <Copy />;
      case ActionsDropdown.Delete:
        return <Trash />;
      default:
        return <Copy />;
    }
  };

  return (
    <>
      <div>{renderButtonImg(label)}<span>{label}</span></div>
    </>
  );
};
