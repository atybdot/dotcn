# dotcn
[![npm version](https://img.shields.io/npm/v/dotcn?style=flat-square)](https://www.npmjs.com/package/dotcn)[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE) 

Simple CLI tool to install shadcn compatible components and manage shadcn compatible UI libraries such as magic-ui, aceternity-ui, hexta-ui, and more.

---

  

## Table of Contents

  

- [Features](#features)

- [Usage](#usage)

- [Examples](#examples)

- [Local Development](#local-development)

- [Roadmap](#roadmap)

- [Contributing](#contributing)

- [License](#license)

  

---

  

## Features

  

- 📦 Install shadcn-compatible components from multiple UI libraries with just one single command, no more dealing with long  URLS.
- 🛠️ Supports libraries like magic-ui, aceternity-ui, hexta-ui, kib-ui, and more
- 🧩 Extensible registry system
- 📝 TypeScript support

  

---

  

## Usage

  

1. First initalize `dotcn` in your project.

  

> [!IMPORTANT] 
>  Make sure that you initialize `dotcn` in the same directory as `components.json`,

```bash
pnpm dlx dotcn@latest init
# optionally you can specify a directory using -c or --cwd, by default it uses current directory.
```

2. Now add registries such as [magic-ui](https://magicui.design/) [aceternity-ui](https://ui.aceternity.com/components) etc...  
	For that you need two things :
	1. **name** will be used as unique identifier.
	2. **URL** of that registry where it's components are hosted.

```bash
pnpm dlx dotcn@latest registries add magic-ui https://magicui.design/r/
```

3. You can now add any component from magic-ui by just mentioning it's name,
```bash
pnpm dlx dotcn@latest add magic-ui marquee # adds the marquee component from magic-ui
```

4. Optionally you can mark `magic-ui` as default, so that you don't have to repeatedly specify it.
```bash
pnpm dlx dotcn@latest mark-default magic-ui
```
Then you can just:
```bash
pnpm dlx dotcn@latest add marquee
```
It will copy the `marquee` component into your project.

You no longer have to remember all those long URLs, just add any registry and then install it like `dotcn add <registry> <component>`

### Available Commands
- `init` — Initalize a `registries.json` in your project. 
- `add` — Add a component from registry
- `registries` — Manage registries (`add`, `remove`, ~~`list`~~, `mark-default`, etc.)
### Options
- `--help` — Show help for a command
- `--version` — Show CLI version
---
## Examples
### Add a Component

```bash
dotcn add magic-ui marquee
```

### Add a New Registry

```bash
dotcn registries add kibo-ui https://www.kibo-ui.com/registry/
```
### Remove a Registry
```bash
dotcn registries remove magic-ui
```
---
## Local Development
1. **Fork this Repo**
2. **Clone the repository:**
```bash
git clone https://github.com/atybdot/dotcn.git
cd dotcn
```
2. **Install dependencies:**
```bash
pnpm install
# or
npm install
```
3. change branch to your feature-title
```bash
git checkout -b <feature>
```
3. **Run in development mode:**
```bash
pnpm dev
# or
npm run dev
```
4. **Build for production:**
```bash
pnpm build
# or
npm run build
```
5. **Lint & Format:**
```bash
pnpm lint
pnpm format
pnpm check
```
6. **Push Code to Github**
```bash
git push origin <feature>
```
7. **[Open Pull Request](https://github.com/atybdot/dotcn/compare)**
---
## Roadmap
- [ ] **Add search command** — Allow users to search famous registries (magic-ui, kib-ui, hexta-ui, etc.) directly from the CLI
- [ ] **Add command to list installed registries**
- [ ] **Add import/export finctionality**
- [ ] **Refactor codebase** — Improve developer experience and clean up code
---
## Contributing
Contributions are welcome! Please open issues and pull requests to help improve dotcn.

---
## License
MIT © [@atybdot](https://x.com/atybdot)