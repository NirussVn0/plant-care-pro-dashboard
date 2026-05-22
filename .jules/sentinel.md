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

## 2025-02-18 - Missing Permissions-Policy
**Vulnerability:** Missing `Permissions-Policy` header allowing potential access to sensitive browser features (camera, microphone) if an XSS vulnerability were to occur.
**Learning:** Even with other security headers present, `Permissions-Policy` needs to be explicitly defined to adhere to the principle of least privilege.
**Prevention:** Include `Permissions-Policy` in the `headers` configuration of `next.config.ts` to disable unused features.
## 2025-02-19 - CSP Implementation Challenges
**Vulnerability:** Missing Content-Security-Policy allowed potential XSS vectors.
**Learning:** Implementing strict CSP (`upgrade-insecure-requests`) breaks local development (HTTP) if not conditional. `unsafe-eval` is required for Next.js dev mode.
**Prevention:** Use `process.env.NODE_ENV` to conditionally apply strict directives like `upgrade-insecure-requests` only in production.

## 2025-02-21 - Insecure Deserialization via LocalStorage
**Vulnerability:** Untrusted and unvalidated data deserialized via `JSON.parse` from `localStorage` in `TaskService.ts`, allowing arbitrarily large string notes.
**Learning:** `localStorage` is completely controlled by the client and must be treated as untrusted user input, even if the application originally set the value. Large payloads can cause Denial of Service (DoS) or UI hangs.
**Prevention:** Implement strict schema validation (using custom validators or Zod) to verify shape, types, and constraints (like maximum string lengths) immediately after `JSON.parse` and before utilizing the data in application logic.

## 2025-03-13 - Insecure Deserialization of User Data in AuthContext
**Vulnerability:** Unvalidated user data was loaded from `localStorage` in `AuthContext.tsx`, exposing the application to potential injection or DoS attacks via maliciously crafted or oversized data.
**Learning:** Similar to the task data issue, user authentication and session data stored in `localStorage` requires rigorous validation (type, length, and format, such as verifying URLs for avatars) before being set in application state.
**Prevention:** Apply type guards and strict length/format checks to all objects retrieved from `localStorage` before hydrating the client-side state.

## 2025-05-22 - Insecure Theme Data Deserialization
**Vulnerability:** The application was extracting the "theme" value directly from `localStorage` without validating if the content adhered to expected enum values ("light", "dark", "system").
**Learning:** `localStorage` is untrusted data and can be altered by users. If a malicious or large payload is stored, it could lead to improper UI states or potential DoS if expected values are not validated.
**Prevention:** Always strictly validate `localStorage` contents for proper typing and values immediately after extraction and before use in application context, applying default fallback strategies when invalid data is detected.
