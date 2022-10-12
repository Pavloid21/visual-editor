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
