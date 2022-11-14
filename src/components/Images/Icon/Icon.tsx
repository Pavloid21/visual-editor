import React from 'react';
import {SearchImage} from 'components/SideBarHeader/SideBarHeader.styled';
import {Input} from 'components/controls';
import {Container} from 'components/Images/Icon/Icon.styled';
import {Accordion} from 'components/Accordion';
import {groupTabs} from 'components/Images/utils';
import {IconSections} from './components/IconSections';

export const Icon = () => {
  const tabsData = [
    {tabsType: 'Action', name: 'code', url: 'code.svg'},
    {tabsType: 'Alert', name: 'code1', url: 'code.svg'},
    {tabsType: 'Av', name: 'code2', url: 'code.svg'},
    {tabsType: 'Av', name: 'code', url: 'code.svg'},
    {tabsType: 'Av', name: 'code2', url: 'code.svg'},
    {tabsType: 'Action', name: 'code1', url: 'code.svg'},
    {tabsType: 'Action', name: 'code2', url: 'code.svg'},
    {tabsType: 'Action', name: 'code', url: 'code.svg'},
    {tabsType: 'Action', name: 'code2', url: 'code.svg'},
  ];

  const groupedTabs = groupTabs(tabsData);

  const createContentTabs = (obj: any) => {
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
    <>
      <Container>
        <Accordion tabs={contentTabs} />
      </Container>
    </>
  );
};
