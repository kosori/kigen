import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const builtBin = path.join(root, 'dist', 'index.js');
const srcEntry = path.join(root, 'src', 'index.ts');

/**
 * Run the built CLI and capture output without throwing on non-zero exit.
 */
function built(...args) {
	const last = args.at(-1);
	const stdin = typeof last === 'object' && last !== null && 'stdin' in last ? args.pop().stdin : undefined;
	try {
		const stdout = execFileSync('node', [builtBin, ...args], {
			cwd: root,
			encoding: 'utf8',
			input: stdin,
			stdio: ['pipe', 'pipe', 'pipe'],
		});
		return { stdout, stderr: '', status: 0 };
	} catch (error) {
		return {
			stdout: typeof error.stdout === 'string' ? error.stdout : String(error.stdout ?? ''),
			stderr: typeof error.stderr === 'string' ? error.stderr : String(error.stderr ?? ''),
			status: typeof error.status === 'number' ? error.status : 1,
		};
	}
}

/**
 * Run the TypeScript source directly via tsx without throwing on non-zero exit.
 */
function source(...args) {
	const last = args.at(-1);
	const stdin = typeof last === 'object' && last !== null && 'stdin' in last ? args.pop().stdin : undefined;
	const result = spawnSync('bunx', ['tsx', srcEntry, ...args], {
		cwd: root,
		encoding: 'utf8',
		input: stdin,
	});
	return {
		stdout: result.stdout ?? '',
		stderr: result.stderr ?? '',
		status: result.status ?? 1,
	};
}

const topHelp = `Usage: kigen [options] [command]

Template for a CLI using TypeScript

Options:
  -v, --version   Display the version number
  -h, --help      display help for command

Commands:
  init [options]  Initialize a new project
  help [command]  display help for command
`;

const initHelp = `Usage: kigen init [options]

Initialize a new project

Options:
  -n, --name <name>  Name of the project
  -h, --help         display help for command
`;

describe('help', () => {
	it('built --help exits 0 with exact baseline', () => {
		const result = built('--help');
		assert.equal(result.status, 0);
		assert.equal(result.stdout, topHelp);
	});

	it('built init --help exits 0 with exact baseline', () => {
		const result = built('init', '--help');
		assert.equal(result.status, 0);
		assert.equal(result.stdout, initHelp);
	});

	it('source --help stdout is byte-identical to built --help stdout', () => {
		const fromSource = source('--help');
		const fromBuilt = built('--help');
		assert.equal(fromSource.status, 0);
		assert.equal(fromSource.stdout, fromBuilt.stdout);
	});

	it('source init --help stdout is byte-identical to built init --help stdout', () => {
		const fromSource = source('init', '--help');
		const fromBuilt = built('init', '--help');
		assert.equal(fromSource.status, 0);
		assert.equal(fromSource.stdout, fromBuilt.stdout);
	});

	it('built --version exits 0 with 1.0.0', () => {
		const result = built('--version');
		assert.equal(result.status, 0);
		assert.equal(result.stdout, '1.0.0\n');
	});
});

describe('Init Command flag', () => {
	it('built init --name skips the prompt and names the Project Name', () => {
		const result = built('init', '--name', 'my-app', { stdin: '' });
		assert.equal(result.status, 0);
		assert.match(result.stdout, /Your project is named/);
		assert.match(result.stdout, /my-app/);
	});

	it('source init --name stdout is byte-identical to built init --name stdout', () => {
		const fromSource = source('init', '--name', 'my-app', { stdin: '' });
		const fromBuilt = built('init', '--name', 'my-app', { stdin: '' });
		assert.equal(fromSource.status, 0);
		assert.equal(fromSource.stdout, fromBuilt.stdout);
	});
});

describe('Init Command prompt default', () => {
	it('built init with piped newline applies the my-project default', () => {
		const result = built('init', { stdin: '\n' });
		assert.equal(result.status, 0);
		assert.match(result.stdout, /my-project/);
	});
});

describe('validation', () => {
	it('schema rejects a non-string Project Name', () => {
		const result = spawnSync(
			'bunx',
			[
				'tsx',
				'-e',
				"import { initOptionsSchema } from './src/commands/init/schema.ts'; try { initOptionsSchema.parse({ name: 42 }); process.exit(99); } catch { process.exit(0); }",
			],
			{ cwd: root, encoding: 'utf8' }
		);
		assert.equal(result.status, 0);
	});
});

// Cancel path (Ctrl+C → 'Operation cancelled', exit 1) needs a TTY and is verified manually; see plans/001-cli-seam-tests.md step 4.
