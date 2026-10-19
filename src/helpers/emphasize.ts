import { styleText } from 'node:util';

export const emphasize = (str: string) => styleText(['bold', 'italic'], str);
