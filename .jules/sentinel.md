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

## 2025-02-19 - CSP Implementation Challenges
**Vulnerability:** Missing Content-Security-Policy allowed potential XSS vectors.
**Learning:** Implementing strict CSP (`upgrade-insecure-requests`) breaks local development (HTTP) if not conditional. `unsafe-eval` is required for Next.js dev mode.
**Prevention:** Use `process.env.NODE_ENV` to conditionally apply strict directives like `upgrade-insecure-requests` only in production.

## 2025-02-21 - Insecure LocalStorage Deserialization
**Vulnerability:** Services (e.g., `TaskService`) trust `localStorage` data implicitly, using `JSON.parse` without validation, allowing potential injection of malformed or malicious objects if storage is compromised.
**Learning:** Client-side persistence layers (like `localStorage` mocks) are untrusted input sources. `JSON.parse` destroys type safety.
**Prevention:** Implement strict validators (e.g., `TaskValidator`) for all data loaded from storage before merging into application state.
