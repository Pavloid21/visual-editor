import {Container} from './ImageSection.styled';
import React, {FC} from 'react';
import {deleteImagesFolder} from 'services/ApiService';
import {useAppDispatch} from 'store';
import {deleteImages} from 'store/images.slice';
import {ReactComponent as Trash} from 'assets/trash.svg';

type ImageSectionProps = {
  name: string,
  url: string | undefined,
  projectId: string | undefined,
  folderName: string | undefined,
  file: string
};

export const ImageSection: FC<ImageSectionProps> = ({name, url, folderName, projectId, file}) => {
  const dispatch = useAppDispatch();
  const handlerDeleteImage = () => {
    if (projectId && folderName) {
      deleteImagesFolder(projectId, folderName, file);
      dispatch(deleteImages({dir: folderName, file}));
    }
  };

  return (
    <Container>
      <img src={url} alt={url} />
      <Trash
        className="deleteImage"
        onClick={handlerDeleteImage}
      />
    </Container>
  );
};
