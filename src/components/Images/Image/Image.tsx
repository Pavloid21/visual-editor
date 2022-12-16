import {Container, WrapperFileInput} from './Image.styled';
import React from 'react';
import {groupTabs, trimExtension} from 'components/Images/utils';
import {Accordion} from 'components/Accordion';
import {FileInput} from 'components/controls';
import {ImageSections} from './components/ImageSections';
import {IconTabObjectType, IconTabType, ImageDataType} from 'components/Images/types';
import {useAppDispatch, useAppSelector} from 'store';
import {BASE_URL, createImagesFolder, getImagesData} from 'services/ApiService';
import {setImages} from 'store/images.slice';

export const Image = () => {
  const imagesList = useAppSelector((state) => state.imagesList.images);
  const projectId = useAppSelector((state) => state.project.id);
  const dispatch = useAppDispatch();
  const formData = new FormData();
  const groupedTabs = groupTabs(imagesList);

  const getImagesFolder = (projectId: string, folderName: string) => {
    const imagesArr = imagesList.filter((item: IconTabType) => item.dir !== folderName);
    getImagesData(projectId, folderName).then(data => {
      const dataFolder = data.data.map((item: ImageDataType) => ({
        url: `${BASE_URL}projects/${projectId}/admin/files/${folderName}/${item.name}`,
        name: trimExtension(item.name),
        dir: folderName,
        file: item.name
      }));
      const newImagesList = [...imagesArr, ...dataFolder];
      dispatch(setImages(newImagesList));
    });
  };

  const createContentTabs = (obj: IconTabObjectType) => {
    const result = [];
    for (const item in obj) {
      const isEmptyFolder = obj[item].length === 1 && !obj[item][0]?.url;
      const folderName = obj[item][0]?.dir;
      result.push({
        title: item,
        content: <div>
                    <WrapperFileInput>
                      <FileInput
                        label="Upload image"
                        placeholder="Drag and drop image"
                        onFileChange={(file) => {
                          formData.append('file', file[0]);
                          createImagesFolder(projectId, formData, folderName).then(() => getImagesFolder(projectId, folderName));
                        }}
                        accept="image/*"
                        value={[]}
                        fileUploaded={true}
                      />
                    </WrapperFileInput>
                  {!isEmptyFolder &&
                    <ImageSections
                      sections={obj[item]}
                      projectId={projectId}
                      folderName={folderName}
                    />}
                </div>
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
