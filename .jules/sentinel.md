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

## 2025-02-18 - Missing Permissions-Policy Header
**Vulnerability:** The `Permissions-Policy` header was missing, allowing potentially unrestricted access to browser features like camera and microphone if XSS occurred.
**Learning:** Even when some security headers are present, newer standards like `Permissions-Policy` (replacing Feature-Policy) might be overlooked.
**Prevention:** Regularly audit `next.config.ts` against the latest OWASP Secure Headers recommendations.
