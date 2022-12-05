import React from 'react';
import {useAppSelector} from 'store';
import {Icon} from './Icon/Icon';
import {Image} from './Image/Image';
import {Container} from './Images.styled';

export const Images = () => {
  const activeImageTab = useAppSelector((state) => state.leftBarMenu.activeImageTab);

  return (
    <Container>
      {activeImageTab === 'Icon' ?
      <Icon /> :
      <Image />}
    </Container>
  );
};
