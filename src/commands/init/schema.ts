import { z } from 'zod';

export const initOptionsSchema = z.object({
	name: z.string().optional(),
});
