import {Container} from './Dropdown.styled';
import {ReactComponent as ActionDots} from 'assets/left-sidebar-menu/actionDots.svg';
import {ReactComponent as Copy} from 'assets/copy-item.svg';
import React, {MouseEventHandler} from 'react';
import {ReactComponent as Trash} from 'assets/trash-item.svg';

type ButtonsProps = {
  handleCloneScreen: (event: React.MouseEvent<HTMLDivElement>, uuid: string) => void,
  handleCloneBlock: (subtitle: string) => void,
  handleDeleteScreen: (event: React.MouseEvent, node: {uuid: string, endpoint: string, screen: string}) => void,
  handleDeleteBlock: (subtitle: string) => void,
  uuid: string,
  subtitle: string,
  node: {uuid: string, endpoint: string, screen: string}
}

export const Dropdown = ({
  handleCloneScreen,
  handleCloneBlock,
  handleDeleteScreen,
  handleDeleteBlock,
  uuid,
  subtitle,
  node
}: ButtonsProps) => {
  const handleCopy: React.MouseEventHandler<HTMLDivElement> = (event) => {
    subtitle === 'screen'
      ? handleCloneScreen(event, uuid)
      : handleCloneBlock(subtitle);
  };

  const handleRemove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    subtitle === 'screen'
      ? handleDeleteScreen(event, node)
      : handleDeleteBlock(subtitle);
  };

  return (
    <Container>
      <div className='menu'>
        <div className='dots'>
          <ActionDots />
        </div>
        <div className='dropdown'>
          <div onClick={handleCopy}>
            <Copy /><p>Copy</p>
          </div>
          <div onClick={handleRemove}>
            <Trash /><p>Delete</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
