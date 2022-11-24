import React, {ChangeEvent, useEffect} from 'react';
import {ButtonSelector} from 'components';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from 'store/types';
import {setIconNameFilter, setLeftBarImageTab} from 'store/left-bar-menu.slice';
import {Input} from 'components/controls';
import {SearchImage} from 'components/SideBarHeader/SideBarHeader.styled';
import {Container, SearchImageContainer} from './SubheaderImages.styled';
import {ReactComponent as Folder} from 'assets/left-sidebar-images/folder.svg';
import {useModal} from 'utils';
import {Modal} from 'components/Images/Image/Modal/Modal';

const SubheaderImages: React.FC = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootStore) => state.leftBarMenu.activeImageTab);
  const iconNameFilter = useSelector((state: RootStore) => state.leftBarMenu.iconNameFilter);
  const setFilterValue = (e: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => {
    dispatch(setIconNameFilter(e.target.value));
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
    return;
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
              onChange={setFilterValue}
            /> :
            <SearchImageContainer>
              <Input
                $isWide
                placeholder='search image'
                className='inputImage'
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
