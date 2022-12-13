export const isValidHEX = (colorHEX: string): boolean => {
  const regExpValid = new RegExp('^#([a-f0-9]{3}|[a-f0-9]{6})$', 'i');
  return Boolean(colorHEX.match(regExpValid));
};

export const normalizeHEX = (colorHEX: string) => {
  if (colorHEX && (colorHEX.length === 4)) {
    return colorHEX
      .split('')
      .map((char, index) => index !== 0 ? char.repeat(2) : char)
      .join('');
  }
  return colorHEX;
};

export const transformHexAndroid = (str: string | null | undefined): string => {
  if (!str) {
    return '';
  }
  if (str.length === 9) {
    const lastChar = str.substring(7, 9);
    const body = str.substring(1, 7);
    return `#${lastChar}${body}`;
  }
  return str;
};

export const transformHexWeb = (str: string | null | undefined): string => {
  if (!str) {
    return '';
  }
  if (str.length === 9) {
    const firstChar = str.substring(1, 3);
    const body = str.substring(3, 9);
    return `#${body}${firstChar}`;
  }
  return str;
};
