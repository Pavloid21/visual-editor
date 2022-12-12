import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import {Icon} from './Icon/Icon';
import {Image} from './Image/Image';
import {Container} from './Images.styled';
import {fetchIcons, fetchImages, setIcons, setImages} from 'store/images.slice';

export const Images = () => {
  const activeImageTab = useAppSelector((state) => state.leftBarMenu.activeImageTab);
  const dispatch = useAppDispatch();

  const projectId = useAppSelector((state) => state.project.id);

  useEffect(() => {
    dispatch(fetchImages(projectId));
    dispatch(fetchIcons());
  }, []);

  return (
    <Container>
      {activeImageTab === 'Icon' ?
      <Icon /> :
      <Image />}
    </Container>
  );
};
