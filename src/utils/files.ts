const fileToBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const encoded = reader.result?.toString().replace(/^data:(.*,)?/, '');
    resolve(encoded as string);
  };
  reader.onerror = error => reject(error);
});

const filesToBase64 = (files: File[]): Promise<string[]> => Promise.all(files.map(file => fileToBase64(file)));

const mapperFileToDTO = (name: string, mimetype: string, data: string) => ({
  name,
  data,
  mimetype
});

export const filesToDTO = async (files: File[]) => {
  try {
    const filesTransformedToBase64 = await filesToBase64(files);
    return files.map((file, index) => mapperFileToDTO(file.name, file.type, filesTransformedToBase64[index]));
  } catch (e: unknown) {
    console.error('Возникла ошибка при переводе файлов в base64', e);
  }
};
