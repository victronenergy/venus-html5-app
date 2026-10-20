# Project: venus-html5-app

React + TypeScript single page app built with Vite, using npm for dependency management.

## Build, Test & Lint

- `npm run build` — vite build into `dist/`, then `postbuild` runs `es-check es2015` on the output and gzips large assets
- `npm test` — vitest unit tests (`npm run test:watch` for watch mode)
- `npm run lint` — eslint with autofix
- `npm run type-check` — typecheck without emitting (src, cypress and node config projects)
- `npm run test:legacy` — boots the built `dist/` in old Chrome / WebKit engines via docker, see `tests/legacy/`

## Constraints

- Target browsers are marine MFD devices (Chrome 49/51, AppleWebKit 537/601). The build emits a single legacy
  (SystemJS, ES2015, core-js polyfilled) bundle via `@vitejs/plugin-legacy`, never `<script type="module">`.
  Keep `browserslist` in package.json and the `es-check` postbuild gate intact.
- Files containing JSX must use the `.jsx`/`.tsx` extension, Vite does not transform JSX in `.js` files.
- The `build` script forces `NODE_ENV=production`; do not rely on the shell environment.

## Dependency Update Workflow

When asked to update dependencies (e.g. "update deps", "bump dependencies"):

1. Run `npx npm-check-updates` to list available updates.
2. Unless told otherwise, skip any updates that are **major version bumps**.
3. Process each dependency one at a time:
   - `npx npm-check-updates -u <dep> && npm i`
   - If `npm i` fails: `git checkout -- package.json package-lock.json && npm i` to revert, then continue with the next dependency.
   - If `npm i` succeeds, **verify the update before committing**:
     a. **Changelog review:** Fetch the changelog/release notes for the version range and summarize what changed.
     b. **Source diff verification:** Download the old version with `npm pack <dep>@<old_version>`, extract it, and diff the distributed JS files against the installed version. Confirm every change in the diff is accounted for by the changelog — flag any undocumented changes.
     c. **ES2015 compatibility check:** Run `npx es-check es2015` against the dependency's distributed bundles (`node_modules/<dep>/dist/`). Check CJS and UMD files in script mode, and ESM files with `--module`. If any file fails, revert and skip.
     d. **Build check:** Run `npm run build` (which includes the postbuild `es-check` on our own code).
   - If all checks pass: `git add package.json package-lock.json` and commit with message `chore: bump <dep>  <old_version>  →  <new_version>` (single-line, no body).
   - If any check fails: `git checkout -- package.json package-lock.json && npm i` to revert, report the failure, and continue with the next dependency.
4. At the end, report which updates succeeded and which failed, including a summary of what changed per dependency.
5. For major bumps attempted explicitly by the user, also run `npm run lint` and `npm run build` to verify nothing broke.

## Commit Style

- Single-line commit messages only. No Co-Authored-By, no multi-line body.
