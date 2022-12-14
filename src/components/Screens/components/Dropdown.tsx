import {Container} from './Dropdown.styled';
import {ReactComponent as ActionDots} from 'assets/left-sidebar-menu/actionDots.svg';
import {ReactComponent as Copy} from 'assets/copy-item.svg';
import React from 'react';
import {ReactComponent as Trash} from 'assets/trash-item.svg';

type ButtonsProps = {
  handleCloneScreen: Function,
  handleCloneBlock: Function,
  handleDeleteScreen: Function,
  handleDeleteBlock: Function,
  uuid: any,
  subtitle: any,
  node: any
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
  const handleCopy = (event: any) => {
    subtitle === 'screen'
      ? handleCloneScreen(event, uuid)
      : handleCloneBlock(subtitle);
  }

  const handleRemove = (event: any) => {
    subtitle === 'screen'
      ? handleDeleteScreen(event, node)
      : handleDeleteBlock(subtitle)
  }

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
  )
};
