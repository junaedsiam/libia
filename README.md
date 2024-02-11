<p align="center">
  <img src="./static/logo.svg" alt="Libia" style="height: auto; width:200px;" />
</p>

<h3 align="center">A CLI tool to scaffold your next frontend library</h3>

### Libia

Libia is a CLI based tool to scaffold frontend library templates. Its built on top of "vite".
It currently supports -

- Vanilla JS / TS
- React (JS / TS)
- Vue (JS / TS)
- Svelte (JS / TS)

### Getting started

To initialize the CLI -

**pnpm**

```bash
# pnpm
pnpm dlx libia init .
# or
pnpm dlx libia init lib-name

```

You can also use other package managers as well

```bash
# npm
npx libia init lib-name
# yarn
yarn dlx libia init lib-name
```

#### Example

```bash
pnpm dlx libia init test
---
? Enter your package name: test
? Choose Project framework:  React
? Want to use Typescript? yes
? Entry file : src / index.ts
? Want to seperate CSS file from JS?  yes
? Choose a package manager:  pnpm (recommended)
✔ Preparing template
✔ Initializing git
✔ installing dependencies
┌───────────────┐
│               │
│   All done!   │
│               │
└───────────────┘
Head into your package, and build something amazing
```

For bugs and feature requests, create an issue. If you find this tool useful feel free to give it a star on github! Happy coding!
