#!/usr/bin/env node
import { Command } from 'commander';

import { init } from '~/commands/init/init.js';
import { handleError } from '~/helpers/handle-error';
import packageJson from '../package.json';

const main = async () => {
	const program = new Command();

	program
		.name(packageJson.name)
		.description(packageJson.description)
		.version(
			packageJson.version,
			'-v, --version',
			'Display the version number'
		);

	program.addCommand(init);

	await program.parseAsync();
};

try {
	await main();
} catch (error) {
	handleError(error);
}
