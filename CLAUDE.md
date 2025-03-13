# Cayce CLI Development Guide

## Commands
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Test (all): `npm run test`
- Test (single): `npx mocha --forbid-only "test/**/*name*.test.ts"`
- Run CLI: `./bin/dev.js scan -d ./path -g "**/*.cls"`

## Code Style
- TypeScript with strict type checking
- ES modules (type: "module" in package.json)
- Import style: Use `.js` extension for local imports
- Naming: camelCase for variables/functions, PascalCase for classes/interfaces
- Error handling: Prefer explicit error messages with proper types
- Use async/await for asynchronous code
- Follow oclif CLI conventions for command structure
- Unused variables should be prefixed with underscore (_)

## Project Structure
- Commands in src/commands/
- Tests in test/commands/
- Follow ESLint and Prettier configurations