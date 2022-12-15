import {Container} from './IconSection.styled';
import {FC} from 'react';

type ImageSectionProps = {
  name: string,
  url: string
};

export const IconSection: FC<ImageSectionProps> = ({name, url}) => {
  return (
    <Container>
      <img src={url} alt={url} />
      <div className='nameIconItem'>{name}</div>
    </Container>
  );
};
