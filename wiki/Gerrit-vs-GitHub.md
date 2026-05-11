# Gerrit vs GitHub

A side-by-side reference for developers migrating from Gerrit and Jenkins.

## Core concepts

| Concept | Gerrit | GitHub |
|---------|--------|--------|
| Unit of work | **Change** (with patch sets) | **Pull Request** (with commits) |
| Code landed by | Submit | Merge PR |
| Work abandoned | Abandon change | Close PR |
| Review approval | Code-Review +2 | PR Approval |
| CI gate | Verified +1 | Required status check |
| Author updates | New patch set | New commit pushed to the PR branch |
| Identity | Gerrit account | GitHub account |
| Anonymous read | Optional | Public repos: yes |

## Workflow comparison

### Making a change

| Step | Gerrit | GitHub |
|------|--------|--------|
| Start work | `git push origin HEAD:refs/for/main` | `git checkout -b feature/my-feature` |
| Update after review | `git commit --amend && git push` | `git commit && git push` |
| Multiple logical changes | Multiple changes in a stack | Multiple PRs (or one PR with multiple commits) |
| Land the change | Reviewer submits | Author (or reviewer) clicks Merge |

### Code review

| Feature | Gerrit | GitHub |
|---------|--------|--------|
| Inline comments | ✅ | ✅ |
| Suggested edits | ❌ | ✅ (one-click apply) |
| Review threads | ✅ | ✅ (with resolution) |
| Voting | +2 / +1 / 0 / -1 / -2 | Approve / Comment / Request changes |
| Multiple reviewers | ✅ | ✅ |
| Required reviewers | Via `OWNERS` file | Via CODEOWNERS + branch protection |

### CI/CD

| Feature | Jenkins | GitHub Actions |
|---------|---------|---------------|
| Pipeline config | Jenkinsfile | `.github/workflows/*.yml` |
| Trigger on PR | Multibranch pipeline | `on: pull_request` |
| Trigger on merge | Post-build action | `on: push: branches: [main]` |
| Secrets | Jenkins credentials store | Repository/org secrets |
| Shared libraries | Shared Library | Reusable workflows / Actions Marketplace |
| Agent/runner | Jenkins agent | `runs-on: ubuntu-latest` (or self-hosted) |

## Things that work differently

### No more Change-ID in commit messages

GitHub doesn't use Gerrit's `Change-Id: I…` footer. You can remove the
commit-msg hook. PR numbers (`#42`) are how you reference work.

### Commit history is mutable on feature branches (immutable on main)

In Gerrit, each patch set replaces the previous. In GitHub, you add new commits to a
branch — the previous commits remain. You *can* amend and force-push on feature
branches, but most teams prefer to just add a new commit.

### "Submit" creates a merge commit (or squash, or rebase)

In Gerrit, Submit rewrites history to land cleanly. In GitHub, you choose:

- **Merge commit** — preserves full branch history.
- **Squash and merge** — collapses all PR commits into one.
- **Rebase and merge** — replays commits linearly, no merge commit.

Your team's branch-protection settings can enforce a specific strategy.

### Stacked changes

Gerrit supports stacked changes natively. In GitHub, the typical approach is:

1. Open PR A (base: `main`).
2. Create branch B off branch A, open PR B (base: branch A).
3. Merge A → main, then retarget B to `main`.

Tools like [Graphite](https://graphite.dev) or the `gh` CLI can help automate this.
