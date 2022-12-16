import React from 'react';
import {Container} from 'components/Images/Icon/Icon.styled';
import {Accordion} from 'components/Accordion';
import {groupTabs} from 'components/Images/utils';
import {IconSections} from './components/IconSections';
import {IconTabObjectType} from 'components/Images/types';
import {useAppSelector} from 'store';

export const Icon = () => {
  const iconsData = useAppSelector((state) => state.imagesList.icons);

  const groupedTabs = groupTabs(iconsData);

  const createContentTabs = (obj: IconTabObjectType) => {
    const result = [];
    for (const item in obj) {
      result.push({
        title: item,
        content: <IconSections sections={obj[item]} />
      });
    }
    return result;
  };

  const contentTabs = createContentTabs(groupedTabs);

  return (
    <Container>
      <Accordion tabs={contentTabs} />
    </Container>
  );
};
