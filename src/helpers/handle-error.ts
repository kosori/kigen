import color from 'picocolors';

export const handleError = (error: unknown) => {
	if (typeof error === 'string') {
		console.error(color.bgRed(color.bold('Error')), error);
		process.exit(1);
	}

	if (error instanceof Error) {
		console.error(color.bgRed(color.bold('Error')), error.message);
		process.exit(1);
	}

	console.error(
		color.bgRed(color.bold('Error')),
		'Something went wrong. Please try again.'
	);
	process.exit(1);
};
