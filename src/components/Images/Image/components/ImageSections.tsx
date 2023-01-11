import {ImageSection} from './ImageSection';
import styled from 'styled-components';
import {IconSectionsProps, IconTabType} from 'components/Images/types';
import {useAppSelector} from 'store';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ImageSections = ({sections, projectId, folderName}: IconSectionsProps) => {
  const imageNameFilter = useAppSelector((state) => state.leftBarMenu.imageNameFilter);
  const regex = new RegExp(imageNameFilter, 'gi');
  const filterSections = sections.filter((item: IconTabType) => item.name.match(regex));

  return(
    <Container>
      {filterSections.map((item: IconTabType, i: number) =>
        <ImageSection
          key={i}
          name={item.name}
          url={item.url}
          projectId={projectId}
          folderName={folderName}
          file={item.file}
        />)}
    </Container>
  );
};
