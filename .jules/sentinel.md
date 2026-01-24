# Sentinel Journal

This journal documents critical security learnings, vulnerability patterns, and architectural insights specific to this codebase.

## Format
`## YYYY-MM-DD - [Title]`
`**Vulnerability:** [What you found]`
`**Learning:** [Why it existed]`
`**Prevention:** [How to avoid next time]`

## 2025-02-18 - Missing Security Headers
**Vulnerability:** The application was missing critical HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
**Learning:** Next.js default configuration does not include these headers; they must be explicitly configured in `next.config.ts`.
**Prevention:** Always verify `next.config.ts` includes a `headers()` function with appropriate security headers for every new Next.js project.
