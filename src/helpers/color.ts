import Colors from "@/constants/colors";

export const getRandomColorHex = () => {
  const keys = Object.keys(Colors);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index] as keyof typeof Colors;
  return Colors[key];
};

export const decimalToTwoDigitHex = (number: number) => {
  let asHex = number.toString(16);
  if (asHex.length == 1) asHex = `0${asHex}`;
  return asHex;
};
