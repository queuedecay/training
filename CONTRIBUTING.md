# Contributing to OctoTasks

Thank you for taking part in the GitHub Developer Training!

## Workflow

We use **GitHub Flow** — all work goes through a pull request:

1. Create a branch from `main`.
2. Make your changes with focused commits.
3. Open a pull request.
4. Address review comments.
5. Once CI is green and you have an approval, merge.

See the [GitHub Flow wiki page](../../wiki/GitHub-Flow) for the full guide.

## Branch naming

| Prefix | Use for |
|--------|---------|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `chore/` | Tooling, CI, dependencies |
| `explore/<username>` | Sandbox branches during training |

## Commit messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) convention:

```
feat: add dueDate field to task model
fix: validate dueDate is a parseable date string
docs: update API reference for dueDate
test: add tests for dueDate validation
chore: bump eslint to 8.57
```

## Local development

```bash
# Install dependencies
npm install

# Start the dev server (auto-restart on save)
npm run dev

# Run tests
npm test

# Lint
npm run lint
```

## Pull request checklist

Before opening a PR, confirm:

- [ ] `npm test` passes
- [ ] `npm run lint` passes
- [ ] New behaviour has tests
- [ ] The PR description explains the *why*, not just the *what*
- [ ] The PR is linked to an issue (use `Closes #N`)

## Code style

- Use `const` and `let`; never `var`.
- Use `async/await`; avoid raw Promise chains.
- Keep functions small and single-purpose.
- Prefer explicit error messages (e.g. `'Title is required'` not `'Bad request'`).

## Getting help

Open an issue using the **Bug Report** or **Feature Request** template, or ask in the
training session chat.
