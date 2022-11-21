export const parseRuturnStatement = (script: any) => {
  const string: string = script.data.indexOf(' ') === 0 ? `${script.data}`.replace(' ', '') : script.data;
  //@ts-ignore
  const func = eval(`(() => {return {${string.match(/(?<=^return.{).*$/gms)[0]}})`);
  return func();
};
