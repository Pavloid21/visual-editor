import React, {ChangeEvent, useEffect} from 'react';
import {ButtonSelector} from 'components';
import {Controller, useForm} from 'react-hook-form';
import {setIconNameFilter, setImageNameFilter, setLeftBarImageTab} from 'store/left-bar-menu.slice';
import {Input} from 'components/controls';
import {SearchImage} from 'components/SideBarHeader/SideBarHeader.styled';
import {Container, SearchImageContainer} from './SubheaderImages.styled';
import {ReactComponent as Folder} from 'assets/left-sidebar-images/folder.svg';
import {useModal} from 'utils';
import {Modal} from 'components/Images/Image/Modal/Modal';
import {useAppDispatch, useAppSelector} from 'store';
import {setImages, setNewFolder} from 'store/images.slice';

const SubheaderImages: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.leftBarMenu.activeImageTab);
  const iconNameFilter = useAppSelector((state) => state.leftBarMenu.iconNameFilter);
  const imageNameFilter = useAppSelector((state) => state.leftBarMenu.imageNameFilter);
  const imagesList = useAppSelector((state) => state.imagesList.images);
  const newFolder = useAppSelector((state) => state.imagesList.newFolder);
  const setIconFilterValue = (e: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => {
    dispatch(setIconNameFilter(e.target.value));
  };
  const setImageFilterValue = (e: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => {
    dispatch(setImageNameFilter(e.target.value));
  };
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const {
    handleSubmit,
    setValue,
    control
  } = useForm();

  useEffect(() => {
    setValue('typeImage', activeTab);
  }, []);

  const handleActiveImageTab = (value: string) => {
    dispatch(setLeftBarImageTab(value));
  };

  const handleAddFolderImage = () => {
    toggleModal();
  };

  const handleSave = async () => {
    dispatch(setImages([...imagesList, {url: '', name: '', dir: newFolder}]));
    setItemModalOpen(false);
    dispatch(setNewFolder(''));
  };

  return (
    <>
      <Container>
        <Controller
          name="typeImage"
          control={control}
          render={({field}) => {
            return (
              <ButtonSelector
                {...field}
                label="Image"
                buttons={[
                  {title: 'Icon', key: 'Icon', uuid: 'Icon'},
                  {title: 'Image', key: 'Image', uuid: 'Image'},
                ]}
                onChange={handleActiveImageTab}
                value={activeTab}
              />
            );
          }}
        />
      </Container>
      <div>
        <SearchImage>
          {activeTab === 'Icon' ?
            <Input
              $isWide
              placeholder='search icon'
              value={iconNameFilter}
              onChange={setIconFilterValue}
            /> :
            <SearchImageContainer>
              <Input
                $isWide
                placeholder='search image'
                className='inputImage'
                value={imageNameFilter}
                onChange={setImageFilterValue}
              />
              <div>
                <Folder onClick={handleAddFolderImage} className='folderImage' />
              </div>
            </SearchImageContainer>}
        </SearchImage>
      </div>
      <Modal
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        itemModalOpen={itemModalOpen}
        setItemModalOpen={setItemModalOpen}
      />
    </>
  );
};

export default SubheaderImages;
