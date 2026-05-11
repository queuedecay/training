# GitHub Flow

GitHub Flow is a lightweight, branch-based workflow. Every piece of work — features,
bug fixes, documentation updates — goes through the same six steps.

## The six steps

```
1. Create a branch
2. Add commits
3. Open a pull request
4. Review & discuss
5. CI passes
6. Merge
```

## Step by step

### 1. Create a branch

```bash
git checkout main && git pull origin main
git checkout -b feature/my-feature
```

Branch names should be short and descriptive:

| Prefix | Use for |
|--------|---------|
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `docs/` | Documentation-only changes |
| `chore/` | Maintenance (deps, CI, tooling) |

### 2. Add commits

Make small, focused commits. Each commit message should complete the sentence
*"If applied, this commit will…"*

```bash
git add <files>
git commit -m "feat: add dueDate field to task model"
git push origin feature/my-feature
```

**Commit message prefixes** (Conventional Commits):

| Prefix | Meaning |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `test:` | Tests |
| `chore:` | Tooling / CI |
| `refactor:` | Code restructure, no behaviour change |

### 3. Open a pull request

After pushing, GitHub shows a **"Compare & pull request"** banner. Click it and:

1. Fill in the PR template (title, description, linked issue).
2. Add reviewers.
3. Apply relevant labels.

### 4. Review & discuss

Reviewers can:

- Leave **inline comments** on specific lines.
- **Suggest changes** (which the author can apply with one click).
- **Approve** the PR when satisfied.
- **Request changes** if something must be fixed first.

### 5. CI passes

The CI workflow (`.github/workflows/ci.yml`) runs automatically:

- **Lint** — ESLint checks code style.
- **Test** — Jest runs all unit tests with coverage.

Branch protection requires both checks to pass before a merge is allowed.

### 6. Merge

Once approved and CI is green, click **Merge pull request**.  
The feature branch is deleted automatically.  
If the PR description contains `Closes #N`, the linked issue closes automatically.

## Tips

- Keep PRs small — under 400 lines of change is a good target.
- Respond to review comments within 24 hours.
- Never force-push to `main`.
- Use **Draft PRs** for work-in-progress you want early feedback on.
