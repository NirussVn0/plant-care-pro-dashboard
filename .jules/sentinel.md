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

## 2025-02-21 - Insecure Deserialization via LocalStorage
**Vulnerability:** Untrusted and unvalidated data deserialized via `JSON.parse` from `localStorage` in `TaskService.ts`, allowing arbitrarily large string notes.
**Learning:** `localStorage` is completely controlled by the client and must be treated as untrusted user input, even if the application originally set the value. Large payloads can cause Denial of Service (DoS) or UI hangs.
**Prevention:** Implement strict schema validation (using custom validators or Zod) to verify shape, types, and constraints (like maximum string lengths) immediately after `JSON.parse` and before utilizing the data in application logic.
