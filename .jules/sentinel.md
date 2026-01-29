# Sentinel Journal

This journal documents critical security learnings, vulnerability patterns, and architectural insights specific to this codebase.

## Format
`## YYYY-MM-DD - [Title]`
`**Vulnerability:** [What you found]`
`**Learning:** [Why it existed]`
`**Prevention:** [How to avoid next time]`

## 2025-02-18 - Missing Security Headers
**Vulnerability:** Missing HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options) exposing the app to clickjacking and MIME sniffing.
**Learning:** Next.js requires explicit configuration in `next.config.ts` to set these headers; they are not on by default.
**Prevention:** Always verify `next.config.ts` includes a `headers()` function returning standard security headers.

## 2025-02-18 - Content Security Policy Implementation
**Vulnerability:** Absence of Content Security Policy (CSP) allowed potential XSS and data injection attacks.
**Learning:** Next.js requires explicit CSP configuration in `next.config.ts`. Essential domains (Unsplash, Google, Dicebear) and inline styles/scripts for hydration must be explicitly allowed.
**Prevention:** Enforce CSP in `next.config.ts` for all new Next.js projects.
