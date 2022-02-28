function prepareModel(defaultData, endpoint) {
  Object.keys(defaultData).forEach((key) => {
    if (typeof defaultData[key] !== "object") {
      endpoint[key] = defaultData[key];
    } else {
      endpoint[key] = {};
      prepareModel(defaultData[key], endpoint[key]);
    }
  });
}

export function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getData(defaultData) {
  const result = {};
  prepareModel(defaultData, result);
  return result;
}
