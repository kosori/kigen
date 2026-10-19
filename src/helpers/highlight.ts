import { styleText } from 'node:util';

export const highlight = (str: string) => styleText(['bgCyan', 'black'], str);
