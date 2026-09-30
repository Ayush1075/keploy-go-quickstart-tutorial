# Record, Replay, Relax: API Testing a Go App with Keploy

A beginner-friendly tutorial for [Keploy](https://keploy.io), written from my own run of the **Gin + MongoDB** Go quickstart and published as a single-page documentation site built with **Next.js** and **MDX**.

**Live site:** _TODO: Vercel URL_

<!-- TODO: add light/dark screenshots of the finished page -->

## What's in the tutorial

- What Keploy is, and why generating tests from real traffic is useful for Go developers
- Running the sample URL-shortener API (Gin + MongoDB) locally on Linux/WSL
- Recording test cases and MongoDB mocks with `keploy record`
- Replaying them with `keploy test`, without the real database
- Breaking a response on purpose to watch Keploy catch the regression
- Troubleshooting for the issues I hit

## Features

- **MDX content:** the whole tutorial lives in [`app/page.mdx`](app/page.mdx) and mixes Markdown with React components
- **Custom MDX components:** `Callout`, `Steps`/`Step`, an interactive `KeployFlow` diagram, `Screenshot`
- **Build-time syntax highlighting** with Shiki (via `rehype-pretty-code`), in separate light and dark themes
- **Copy buttons** on every code block
- **"On this page" navigation** that highlights the section you're reading, with a collapsible version on small screens
- **Dark/light mode** that follows your system setting, with no flash of the wrong theme
- **Fully static:** prerendered at build time, no server or database

## Tech stack

| | |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) + TypeScript |
| Content | [MDX](https://mdxjs.com) via `@next/mdx`, `remark-gfm`, `rehype-slug`, `rehype-pretty-code` |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Components | [shadcn/ui](https://ui.shadcn.com) (Radix): Tabs, Accordion, Badge, Button |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Icons | [lucide](https://lucide.dev) |
| Hosting | [Vercel](https://vercel.com) |

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build (static)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project structure

```text
app/
  page.mdx            the tutorial
  layout.tsx          HTML shell: fonts, theme provider, header, TOC rail, footer
  globals.css         Tailwind, color tokens, docs typography, code-block styles
components/
  mdx/                Callout, Steps, CodeBlock + CopyButton, KeployFlow, Screenshot, Heading
  ui/                 shadcn/ui primitives
  site-header.tsx, site-footer.tsx, theme-toggle.tsx, toc.tsx
lib/                  site config and helpers
mdx-components.tsx    maps MDX tags (and Markdown elements like <pre>) to React components
next.config.ts        enables MDX and its remark/rehype plugins
```

## How the MDX pipeline works

At build time `@next/mdx` compiles `app/page.mdx` into a React component. `remark-gfm` adds tables, `rehype-slug` gives headings their anchor ids, and `rehype-pretty-code` highlights code with Shiki, so the browser gets colored code as plain HTML. `mdx-components.tsx` tells MDX which React component to render for `<Callout>`, `<Steps>` and the other custom tags, and replaces Markdown's `<pre>` with a code block that has a copy button. Everything renders as Server Components except the few interactive pieces (theme toggle, copy button, table of contents, tabs, accordion).

## Credits

The tutorial is based on Keploy's official [Gin + MongoDB quickstart](https://keploy.io/docs/quickstart/samples-gin/) and the [samples-go](https://github.com/keploy/samples-go/tree/main/gin-mongo) repository. The explanations, structure and troubleshooting notes are my own.
