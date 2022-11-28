import {Container, WrapperFileInput} from './Image.styled';
import React from 'react';
import {groupTabs} from '../utils';
import {IconSections} from 'components/Images/Icon/components/IconSections';
import {Accordion} from 'components/Accordion';
import {FileInput} from 'components/controls';
import {createImagesFolder, deleteImagesFolder, getImagesData} from 'services/ApiService';
import {useSelector} from 'react-redux';
import {RootStore} from 'store/types';
import {ImageSections} from './components/ImageSections';
import {IconTabObjectType} from '../types';

export const Image = () => {
  const projectID = useSelector((state: RootStore) => state.project.id);
  const data = getImagesData('portal');

  createImagesFolder('portal', 'test1');
  deleteImagesFolder('portal', 'test');

  const tabsData = [
    {tabsType: 'Nature', name: 'code', url: 'image-preview.png'},
    {tabsType: 'Nature', name: 'code', url: 'image-preview.png'},
    {tabsType: 'Nature', name: 'code', url: 'image-preview.png'},
    {tabsType: 'People', name: 'code', url: 'image-preview.png'},
    {tabsType: 'People', name: 'code', url: 'image-preview.png'},
    {tabsType: 'People', name: 'code', url: 'image-preview.png'},
    {tabsType: 'People', name: 'code', url: 'image-preview.png'},
    {tabsType: 'People', name: 'code', url: 'image-preview.png'},
  ];

  const groupedTabs = groupTabs(tabsData);

  const createContentTabs = (obj: IconTabObjectType) => {
    const result = [];
    for (const item in obj) {
      result.push({
        title: item,
        content: <div>
                    <WrapperFileInput>
                      <FileInput
                        label="Upload image"
                        placeholder="Drag and drop image"
                        onFileChange={() => console.log('onChange')}
                        accept="image/*"
                        value={[]}
                      />
                    </WrapperFileInput>
                  <ImageSections sections={obj[item]} />
                </div>
      });
    }
    return result;
  };

  const contentTabs = createContentTabs(groupedTabs);

  return (
    <Container>
      <img src='http://mobile-platform.apps.msa31.do.neoflex.ru/api/v2/projects/portal/admin/files/test/otpusk.svg' alt='' />
      <Accordion tabs={contentTabs} />
    </Container>
  );
};
