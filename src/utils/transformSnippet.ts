type TAnyObject = {
  [key: string]: unknown;
}

export const deleteEmptyKey = (obj: TAnyObject) => {
    Object.entries(obj).forEach(([key, value]) => {
      if(value === undefined || value === null || value === '') {
        delete obj[key];
      } else {
        if(typeof obj[key] === 'object') {
          const typeKey = obj[key] as TAnyObject;
          deleteEmptyKey(typeKey);
        }
      }
    });

  return obj;
};

export const transformSnippet = (snippet: string) => {
  const deleteReturn = snippet.replace(/return/g, '');
  const getJson = JSON.parse(deleteReturn);
  const transformJson = deleteEmptyKey(getJson);
  
  return `return ${JSON.stringify(transformJson)}`;
};

export const parseReturnStatement = (script: any) => {
  const regExpReturn = /^\s*return\s*{/gms;
  const data = script.data.trim();

  const matchLength = data.match(regExpReturn).length;
  for (let i = 0; i < matchLength; i++) {
    regExpReturn.test(data);
  }

  const func = eval(`(() => {return {${data.substring(regExpReturn.lastIndex)}})`);
  return func();
};
