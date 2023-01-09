export const separateScreenUrl = (str: string) => {
  if(str === undefined) {
    return '';
  }

  const indexScreen = 1;
  return str.split('/')[indexScreen];
};
