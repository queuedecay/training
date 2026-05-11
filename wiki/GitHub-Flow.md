# GitHub Flow

GitHub Flow is a lightweight, branch-based workflow. Every piece of work — features,
bug fixes, documentation updates — goes through the same six steps.

## Gerrit-to-GitHub cheat sheet

| Gerrit habit | GitHub equivalent |
|--------------|-------------------|
| Create a change for review | Open a pull request |
| Upload new patch set | Push a new commit to the PR branch |
| Code-Review +2 | PR approval |
| Verified +1 | Required status checks pass |
| Submit change | Merge pull request |

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

Review etiquette tips for former Gerrit users:

- Reply in-thread so discussions stay connected to code.
- Mark threads resolved after the underlying code change is pushed.
- Keep reviews actionable: what to change, why, and (if helpful) an example.

### 5. CI passes

The CI workflow (`.github/workflows/ci.yml`) runs automatically:

- **Lint** — ESLint checks code style.
- **Test** — Jest runs all unit tests with coverage.

Branch protection requires both checks to pass before a merge is allowed.

For Gerrit users: think of this as the merge gate that replaces "Verified +1".

### 6. Merge

Once approved and CI is green, click **Merge pull request**.  
The feature branch is deleted automatically.  
If the PR description contains `Closes #N`, the linked issue closes automatically.

## Tips

- Keep PRs small — under 400 lines of change is a good target.
- Respond to review comments within 24 hours.
- Never force-push to `main`.
- Use **Draft PRs** for work-in-progress you want early feedback on.

## Common pitfalls during migration

- Opening very large PRs that are hard to review.
- Treating PR comments like one-shot feedback instead of ongoing conversation.
- Forgetting to link issues (for example `Closes #12`).
- Assuming approvals bypass failed CI checks.

## FAQ

### Should I amend and force-push after every comment?

Usually no — adding a follow-up commit is clearer for reviewers and history.

### Can multiple people push to the same PR branch?

Yes, if they have branch access. Coordinate to avoid stepping on each other.

### When should I use a Draft PR?

When you want early design/code feedback before the change is merge-ready.
