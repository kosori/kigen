import { styleText } from 'node:util';

const label = () =>
	styleText(['bgRed', 'bold'], 'Error', { stream: process.stderr });

export const handleError = (error: unknown) => {
	if (typeof error === 'string') {
		console.error(label(), error);
		process.exit(1);
	}

	if (error instanceof Error) {
		console.error(label(), error.message);
		process.exit(1);
	}

	console.error(label(), 'Something went wrong. Please try again.');
	process.exit(1);
};
