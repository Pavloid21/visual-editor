import {BASE_URL} from "services/ApiService";
import image from 'assets/image.svg';

export const setCorrectImageUrl = (url: string, projectId: string): string => {
  if(url === undefined) {
      return '';
  }

  const [getFieldValue, ...rest] = url.split('/');
  const variantFieldValue: string[] = ['files', 'icons', 'data'];
  const checkFieldValue = variantFieldValue.includes(getFieldValue);

  if(checkFieldValue) {
    switch(getFieldValue) {
      case 'files':
        return `${BASE_URL}projects/${projectId}/${url}`;
      case 'icons':
        return `${BASE_URL}${url}.svg`;
      case 'data':
        return image;
      default:
        return image;
    }
  }
  return image;
};