import { cancel, group, intro, outro, text } from '@clack/prompts';
import { Command } from 'commander';

import { emphasize } from '~/helpers/emphasize';
import { handleError } from '~/helpers/handle-error';
import { highlight } from '~/helpers/highlight';
import { initOptionsSchema } from './schema.js';

export const init = new Command()
	.name('init')
	.description('Initialize a new project')
	.option('-n, --name <name>', 'Name of the project')
	.action(async (opts) => {
		try {
			const options = initOptionsSchema.parse(opts);

			intro(highlight(' Kigen: init '));

			const shouldPrompt =
				!options.name && process.stdin.isTTY && process.stdout.isTTY;

			const prompts = shouldPrompt
				? {
						name: () =>
							text({
								defaultValue: 'my-project',
								message: 'What is the name of your project?',
								placeholder: 'my-project',
							}),
					}
				: undefined;

			const prompt: { name?: string } = prompts
				? await group(prompts, {
						onCancel: () => {
							cancel('Operation cancelled');
							process.exit(1);
						},
					})
				: { name: undefined };

			const name = options.name ?? prompt.name ?? 'my-project';

			outro(highlight(` Your project is named ${emphasize(name)} `));
		} catch (error) {
			handleError(error);
		}
	});
