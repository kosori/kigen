# Kigen

Template for a CLI using TypeScript.
This CLI has only one command: `init`. In an interactive terminal it prompts for a project name and then prints a message with the name. When stdin or stdout is not a TTY it skips the prompt and uses `my-project`; use `--name` for scripted runs.

## Stack

- [Node.js](https://nodejs.org/) 24.11+ - Runtime, `util.styleText` for colors
- [Bun](https://bun.sh/) - Package Manager
- [Clack](https://github.com/bombshell-dev/clack) - CLI Prompts
- [Commander](https://github.com/tj/commander.js) - CLI Framework
- [TypeScript](https://www.typescriptlang.org/) 7 - JavaScript with Syntax, via the native compiler
- [Biome](https://biomejs.dev/) with [Ultracite](https://www.ultracite.ai/) core preset - Linting and Formatting
- [Zod](https://github.com/colinhacks/zod) - Validation
- [tsdown](https://tsdown.dev/) - Bundler
- [tsx](https://github.com/privatenumber/tsx) - TypeScript runner

## Requirements

- Node.js `>=24.11.0`
- Bun `1.4.3`

### TypeScript 7

TypeScript 7 is the native compiler. `tsc --noEmit` is the typecheck gate, and `tsdown` emits declarations through TypeScript 7's native compiler, which is currently experimental in `tsdown`, so declaration emit may print an experimental warning. TS 7 does not ship the legacy `tsserver`, so editors need native TypeScript 7 support (or a side-by-side TS 6 install for legacy editor tooling).

## Getting Started

1. Run `bun install` to install dependencies.
2. Run `bun run dev` to execute the CLI (using `tsx`).

## Package Scripts

- `build` - Builds the CLI using `tsdown`.
- `build:silent` - Builds the CLI using `tsdown` without showing the output.
- `check` - Checks lint and formatting using `ultracite`.
- `dev` - Runs the CLI using `tsx`.
- `dev:node` - Builds the CLI using `build:silent` and executes it using `start`.
- `doctor` - Diagnoses the `ultracite` setup.
- `fix` - Applies safe lint and formatting fixes using `ultracite`.
- `fix:unsafe` - Applies unsafe lint and formatting fixes using `ultracite`.
- `pub:beta` - Builds the CLI using `build` and publishes it to the `beta` tag.
- `pub:next` - Builds the CLI using `build` and publishes it to the `next` tag.
- `pub:release` - Builds the CLI using `build` and publishes it to the `latest` tag.
- `start` - Starts the CLI using `node`.
- `test` - Builds the CLI using `build:silent` and runs the tests using `node --test`.
- `typecheck` - Checks the code using `tsc`.
