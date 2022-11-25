import React from 'react';
import {Icon} from './Icon/Icon';
import {useSelector} from 'react-redux';
import {RootStore} from 'store/types';
import {Image} from './Image/Image';
import {Container} from './Images.styled';

export const Images = () => {
  const activeImageTab = useSelector((state: RootStore) => state.leftBarMenu.activeImageTab);

  return (
    <Container>
      {activeImageTab === 'Icon' ?
      <Icon /> :
      <Image />}
    </Container>
  );
};
