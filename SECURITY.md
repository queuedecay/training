# Security Policy

## Supported versions

OctoTasks is a training application. Only the latest version on `main` receives
security updates.

## Reporting a vulnerability

**Please do not open a public issue for security vulnerabilities.**

Report vulnerabilities privately via
[GitHub Private Vulnerability Reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability):

1. Go to the **Security** tab of this repository.
2. Click **Report a vulnerability**.
3. Fill in the form and submit.

You will receive acknowledgement within 48 hours and a resolution timeline within
7 days.

## Scope

| In scope | Out of scope |
|----------|-------------|
| SQL/NoSQL injection | Issues already disclosed publicly |
| Authentication/authorisation bypass | Denial-of-service via resource exhaustion |
| Stored/reflected XSS | Missing security headers on training deployments |
| Dependency vulnerabilities in production code | Dependency vulnerabilities in `devDependencies` |

## Note for training participants

This application is intentionally simplified for training purposes. It uses an
in-memory store (no database), has no authentication, and should **not** be deployed
to a production environment as-is.
