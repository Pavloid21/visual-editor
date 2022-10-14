import {BASE_URL} from "services/ApiService";
import image from 'assets/image.svg';

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

  const variantFieldValue: string[] = ['files', 'icons', 'data', 'https:', 'http:'];
  const checkFieldValue = variantFieldValue.includes(fieldValue);

  if(checkFieldValue) {
    switch(fieldValue) {
      case 'files':
        return `${BASE_URL}projects/${projectId}/${url}`;
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
