import {Container} from './ImageSection.styled';
import {FC} from 'react';

type ImageSectionProps = {
  name: string,
  url: string
};

export const ImageSection: FC<ImageSectionProps> = ({name, url}) => {
  return (
    <Container>
      <img src={url} alt={url} />
    </Container>
  );
};
