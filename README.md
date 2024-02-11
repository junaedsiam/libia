<p align="center">
  <img src="./static/logo.svg" alt="Libia" style="height: auto; width:200px;" />
</p>

<h3 align="center">A CLI tool to scaffold your next frontend library</h3>

### Getting started

Libia currently supports-

- Vanilla JS / TS
- React (JS / TS)
- Vue (JS / TS)
- Svelte (JS / TS)

To initialize the CLI -

```bash
# inside current directory
libia init .
# inside a new directory
libia init test-lib
```

Example -

```bash
libia init test
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

### Features

- Specifically configured for frontend library development
- Built on top of "Vite" build tool
- Storybook

For bugs and feature requests, create an issue. If you find this tool useful feel free to give it a star on github! Happy coding!
