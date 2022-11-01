import {BASE_URL} from "services/ApiService";
import image from 'assets/image.svg';

const arrayExtension: string[] = ['svg', 'png', 'jpg'];
const variantFieldValue: string[] = ['files', 'icons', 'data', 'https:', 'http:'];

export const checkExtension = (src: string) => src ? src.split('.').pop() : '';

export const getExtensionImage = (src: string) => {
  const getExtension = checkExtension(src);
  return arrayExtension.includes(getExtension || '');
};

export const getFieldValue = (url: string) => {
  if(url === undefined) {
    return '';
  }

  const [field] = url.split('/');
  return field;
};

export const setCorrectImageUrl = (url: string, projectId: string): string => {
  const fieldValue = getFieldValue(url);

  if(fieldValue === undefined) {
    return '';
  }

  const checkFieldValue = variantFieldValue.includes(fieldValue);

  if(checkFieldValue) {
    switch(fieldValue) {
      case 'files':
        if(!getExtensionImage(url)) {
          return `${BASE_URL}projects/${projectId}/${url}.svg`;
        } else {
          return `${BASE_URL}projects/${projectId}/${url}`;
        }
        case 'icons':
        return `${BASE_URL}${url}.svg`;
      case 'data':
        return image;
      case 'https:':
        return url;
      case 'http:':
        return url;
      default:
        return image;
    }
  }
  return image;
};
