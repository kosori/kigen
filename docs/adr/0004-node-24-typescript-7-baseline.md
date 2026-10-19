# Node 24 and TypeScript 7 baseline

We decided Node.js 24 becomes the minimum supported runtime and TypeScript is pinned to exactly `7.0.2`, so the template targets the current LTS line and the native compiler instead of carrying a legacy Node/tsserver story.

Considered Options: keep Node 22 vs target Node 26 vs move to Node 24. Keep TypeScript 6.0.3 as a bridge vs stay on TS 5.9 vs pin TS 7.0.2. Node 22 is still supported upstream but is no longer the template baseline; Node 26 is newer than the target baseline; TS 6 bridges the JS API removal but keeps the old compiler model; TS 5.9 avoids migration but misses the native compiler.

Consequences: `engines.node` is `>=24.11.0` and `@types/node` tracks the 24 line; `es2024` and the tsdown `node24` target are the build baseline. TS 7 has no classic JS API and no `tsserver`, so editor support depends on native TS 7 integrations. tsdown declaration emit uses the experimental `tsgo` path, which may warn, so `typecheck` (`tsc --noEmit`) remains a separate gate. Node 22 remains supported by the runtime until 2027-04-30 but is no longer the template baseline.
