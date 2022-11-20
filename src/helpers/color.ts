export const decimalToTwoDigitHex = (number: number) => {
  let asHex = number.toString(16);
  if (asHex.length == 1) asHex = `0${asHex}`;
  return asHex;
};
