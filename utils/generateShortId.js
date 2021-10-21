import { customAlphabet } from 'nanoid';

const customAlphabets =
  '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const generateShortId = () => {
  const nanoid = customAlphabet(customAlphabets, 6);
  return nanoid();
};