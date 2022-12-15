import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TImageListOption, TImagesType} from './types';
import {BASE_URL, getIconsData, getImagesData} from 'services/ApiService';
import {AxiosResponse} from 'axios';
import {IconDataObjectType, IconTabType, ImageDataType} from 'components/Images/types';
import {haveExtension, trimExtension} from 'components/Images/utils';
import {capitalize} from 'lodash';

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (projectId: string, {dispatch}) => {
    getImagesData(projectId).then((images) => {
      if (images.data) {
        const foldersList = images.data.filter(({type}: TImageListOption) => type === 'dir').map(({name}: TImageListOption) => name);
        const promises: Promise<AxiosResponse>[] = foldersList.map((folder: string) => getImagesData(projectId, folder));

        Promise.allSettled(promises).then((promiseData: PromiseSettledResult<AxiosResponse<ImageDataType>>[]) => {
          const imagesArr: IconTabType[] = [];
          promiseData.map((item: any, i: number) => {

            const {data} = item.value;
            data.filter((item: ImageDataType) => item.type === 'file')
              .forEach((item: ImageDataType) => {
                imagesArr.push({
                  url: `${BASE_URL}projects/${projectId}/admin/files/${foldersList[i]}/${item.name}`,
                  name: trimExtension(item.name),
                  dir: foldersList[i],
                  file: item.name
                });
              });
          });
          dispatch(setImages(imagesArr));
        });
      }
    }).catch(console.log);
  }
);

export const fetchIcons = createAsyncThunk(
  'icons/fetchIcons',
  async (_, {dispatch}) => {
    getIconsData().then(({data}) => {
      const tabsData: IconTabType[] = [];
      data.forEach((item: IconDataObjectType) => {
        const dirName = Object.keys(item)[0];
        const dirArray = item[dirName];
        dirArray.forEach((image: string) => {
          if (haveExtension(image, 'svg')) {
            tabsData.push({
              dir: capitalize(dirName),
              name: trimExtension(image),
              url: `${BASE_URL}icons/material/${dirName}/${image}`,
              file: image
            });
          }
        });
      });
      dispatch(setIcons(tabsData));
    }).catch(console.log);
  }
);

const initialState: TImagesType = {
  images: [],
  newFolder: '',
  icons: []
};

const imagesListSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<any[]>) => {
      state.images = action.payload;
    },
    setNewFolder: (state, action: PayloadAction<string>) => {
      state.newFolder = action.payload;
    },
    setIcons: (state, action: PayloadAction<any[]>) => {
      state.icons = action.payload;
    },
    deleteImages: (state, action: PayloadAction<{ dir: string, file: string }>) => {
      state.images = state.images.filter(image => !(image.file === action.payload.file && image.dir === action.payload.dir));
    }
  },
});

export const {setImages, setNewFolder, setIcons, deleteImages} = imagesListSlice.actions;
export default imagesListSlice.reducer;
