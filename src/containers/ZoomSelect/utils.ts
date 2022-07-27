export const transformValue = (valueInput: string): string => {
  const numberValue = Number(valueInput);
  const zoomValue = Number(numberValue * 0.01).toFixed(2);
  return String(zoomValue);
};

export const createOption = (valueInput: string) => {
  const value = transformValue(valueInput);
  return {
    label: `${valueInput}%`,
    value
  };
};

export const onInputChange = (value: string) => value.replace(/[^\d]/g, '');
export const formatCreateLabel = (value: string) => `${value}%`;
export const isValidNewOption = (inputValue: string, value: any, options: any[]) => {
  if (inputValue) {
    return !options.some(item => formatCreateLabel(inputValue) === item.label);
  }
  return false;
};
