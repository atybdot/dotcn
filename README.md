# dotcn

[![npm version](https://img.shields.io/npm/v/dotcn?style=flat-square)](https://www.npmjs.com/package/dotcn)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

Simple CLI tool to install shadcn compatible components from various UI libraries such as magic-ui, aceternity-ui, hexta-ui, and more.

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

- 📦 Install shadcn-compatible components from multiple UI libraries
- ⚡ Fast, zero-config CLI
- 🛠️ Supports libraries like magic-ui, aceternity-ui, hexta-ui, kib-ui, and more
- 🧩 Extensible registry system
- 📝 TypeScript support

---

## Usage

1. First initalize `dotcn` in your project.

```bash
pnpm dlx dotcn@latest init .
# optionally you can specify a directory using -c or --cwd, by default it uses current directory.
# NOTE make sure that you initialize dotcn in the same directory as shadcn,
```
2. Now you can add registries such as magic-ui aceternity-ui etc...
For that you need two things
1. name of registry
2. url of that registry where it's components are hosted.
```bash
pnpm dlx dotcn@latest registries add magic-ui https://magicui.design/r/
```
3. Now you can add any component from magic-ui by just mentioning it's name,
```bash
pnpm dlx dotcn@latest add magic-ui marquee # adds the marquee component from magic-ui
```
You no longer have to remember all that long urls, just add any registry and then install it like `dotcn add <registry> <component>`
### Available Commands

- `add` — Add a component from a registry
- `registries` — Manage registries (add, remove, list, mark-default, etc.)

### Options

- `--help` — Show help for a command
- `--version` — Show CLI version

---

## Examples

### Add a Component

```sh
dotcn add magic-ui
```

### Add a New Registry

```sh
dotcn registries add kibo-ui https://www.kibo-ui.com/registry/
```
---


## Local Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/atybdot/dotcn.git
   cd dotcn
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```
3. **Run in development mode:**
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
4. **Build for production:**
   ```sh
   pnpm build
   # or
   npm run build
   ```
5. **Lint & Format:**
   ```sh
   pnpm lint
   pnpm format
   ```

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
