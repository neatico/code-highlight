# @neatico/code-highlight

Bounded code highlighting for Neatico's editable design and presentation pipeline.

`highlightCodeHTML(code, language)` returns an escaped HTML fragment with inline colors suitable for a dark code panel. Original whitespace and characters are preserved. Register only the twelve supported grammars; unsupported languages and inputs over 20,000 characters are escaped without highlighting. Consumers must preserve preformatted whitespace and sanitize allowed spans. PPTX consumers convert the same fragment into native colored text runs.

Uses Highlight.js (BSD-3-Clause). Does not execute input code, access the network, or require a DOM. Run `npm test` before packaging. Publication is deferred; the app consumes the local tarball.
