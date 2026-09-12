# CLI Template

Template for a CLI using TypeScript.
This CLI has only one command: `init`. It prompts the user for a project name and then prints a message with the name.

## Stack

- [Bun](https://bun.sh/) - Package Manager
- [Clack](https://github.com/bombshell-dev/clack) - CLI Prompts
- [Commander](https://github.com/tj/commander.js) - CLI Framework
- [picocolors](https://github.com/alexeyraspopov/picocolors) - Colors for the Terminal
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with Syntax
- [Biome](https://biomejs.dev/) with [Ultracite](https://www.ultracite.ai/) core preset - Linting and Formatting
- [Zod](https://github.com/colinhacks/zod) - Validation
- [tsdown](https://tsdown.dev/) - Bundler
- [tsx](https://github.com/privatenumber/tsx) - TypeScript runner

## Getting Started

1. Run `bun install` to install dependencies.
2. Run `bun run dev` to execute the CLI (using `tsx`).

## Package Scripts

- `build` - Builds the CLI using `tsdown`.
- `build:silent` - Builds the CLI using `tsdown` without showing the output.
- `start` - Starts the CLI using `bun`.
- `dev` - Runs the CLI using `tsx`.
- `dev:node` - Runs the CLI using `bun`. Builds the CLI using `build:silent` and executes it using `start`.
- `format` - Formats the code using `biome`.
- `format:fix` - Formats the code using `biome`.
- `lint` - Checks the code using `biome`.
- `pub:beta` - Builds the CLI using `build` and publishes it to the `beta` tag.
- `pub:next` - Builds the CLI using `build` and publishes it to the `next` tag.
- `pub:release` - Builds the CLI using `build` and publishes it to the `latest` tag.
- `typecheck` - Checks the code using `tsc`.
