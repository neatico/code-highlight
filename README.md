<div align="center">
  <a href="https://www.neatico.com/?utm_source=npm&utm_medium=readme&utm_campaign=code-highlight">
    <img src="https://www.neatico.com/brand/neatico-logo.svg" width="220" alt="Neatico" />
  </a>
  <h1>@neatico/code-highlight</h1>
  <p>Deterministic, self-contained syntax highlighting for code blocks rendered on dark design surfaces.</p>
  <p>
    <a href="https://www.npmjs.com/package/@neatico/code-highlight"><img src="https://img.shields.io/npm/v/@neatico/code-highlight.svg?style=flat-square&label=npm" alt="npm version" /></a>
    <a href="https://github.com/neatico/code-highlight"><img src="https://img.shields.io/badge/source-github-111827?style=flat-square" alt="source" /></a>
    <img src="https://img.shields.io/badge/license-MIT-10b981?style=flat-square" alt="license: MIT" />
    <img src="https://img.shields.io/badge/grammar%20set-12-6366f1?style=flat-square" alt="12 grammars" />
  </p>
</div>

---

`@neatico/code-highlight` turns a string of source code into a bounded, escaped HTML fragment with inline colors. It is built for design and presentation pipelines that paint code onto editable cards and native PPTX text runs — not for documentation sites that can ship a full stylesheet.

- **No stylesheet, no DOM.** Colors are emitted as inline `style` attributes, so the same fragment works in a browser, a canvas renderer, or a headless export.
- **Source is never altered.** Whitespace, characters, and identifiers are preserved exactly.
- **Fail-safe by design.** Unrecognized languages and oversized input degrade to plain, escaped text rather than throwing.
- **Hard execution ceiling.** Grammar processing is skipped past 20,000 characters to avoid pathological input.

## Installation

```sh
npm install @neatico/code-highlight
```

CommonJS only. No environment configuration is required.

## Usage

```js
const { highlightCodeHTML } = require("@neatico/code-highlight");

const html = highlightCodeHTML(
  'const greet = (name) => `Hello, ${name}`;',
  "javascript",
);

// <span style="color:#C4B5FD">const</span> greet = ...
```

Render the result inside a `<pre>` block so whitespace is preserved, and place it on a dark surface — the palette is tuned for that context.

Unknown languages and large payloads are escaped instead of highlighted:

```js
highlightCodeHTML('<img src=x>', "unknown");
// &lt;img src=x&gt;

highlightCodeHTML("x".repeat(20001), "javascript");
// plain text, grammar execution skipped
```

## API

### `highlightCodeHTML(code, language?)`

| Parameter | Type | Description |
|---|---|---|
| `code` | `string` | Source code to highlight. Any other type throws `TypeError`. |
| `language` | `string` | Language identifier, case-insensitive. Defaults to `""` (plain text). |
| _returns_ | `string` | An HTML fragment with inline colors, or escaped plain text. |

The output never contains `class` attributes — every token carries an inline `color`. Only the following syntaxes are registered, which keeps the grammar bundle small and predictable.

| Language | Identifiers (aliases work) |
|---|---|
| JavaScript | `javascript`, `js` |
| TypeScript | `typescript`, `ts` |
| JSON | `json` |
| Bash | `bash`, `sh`, `zsh` |
| Python | `python`, `py` |
| CSS | `css` |
| HTML / XML | `xml`, `html`, `xhtml`, `svg` |
| SQL | `sql` |
| Java | `java` |
| Go | `go` |
| Rust | `rust`, `rs` |
| YAML | `yaml`, `yml` |

The fragment escapes `& < > " '`, so registered grammars cannot inject executable markup. If you re-render the result in a non-HTML context, treat it as trusted display text only.

## Security model

The library **does not execute input code**, access the network, or touch the file system. Highlighting is a pure string transformation. Always render the returned fragment with whitespace preserved and never concatenate it into an unescaped template.

## Development

```sh
npm install
npm test        # node:test — escaping, palettes, size ceiling
```

## Meet Neatico

This package is one of the engines inside **[Neatico](https://www.neatico.com/?utm_source=npm&utm_medium=readme&utm_campaign=code-highlight)** — the AI workspace that turns a single idea into pixel-perfect, fully editable visuals. Describe what you want and Neatico designs social posts, presentations, and marketing graphics with real layouts, measured typography, your brand kit, and one-click PPTX/PNG export.

The `@neatico/*` packages are the framework-independent pieces extracted from that product so you can build your own editor or pipeline. Want the finished experience instead of the primitives? **[Start creating free on neatico.com →](https://www.neatico.com/?utm_source=npm&utm_medium=readme&utm_campaign=code-highlight)**

## License

MIT — built on [highlight.js](https://highlightjs.org/) (BSD-3-Clause). See [LICENSE](./LICENSE).
