# Gerrit vs GitHub

A side-by-side reference for developers migrating from Gerrit and Jenkins.

## Mental model mapping

If you remember one thing: in GitHub, the **pull request is the review object** and commits are just updates to that review.

| If you used to think in… | Think in GitHub as… |
|--------------------------|---------------------|
| Change + patch sets | Pull request + commits |
| Label votes (+2 / +1) | Review state (Approve / Request changes) |
| Verified vote | Required status checks |
| Submit queue | Merge button + branch protection |
| OWNERS + submit rule | CODEOWNERS + required reviewers + checks |

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

## Common migration pitfalls

- **Waiting for patch set semantics:** pushing a new commit updates the same PR; you don't open a new PR for each review round.
- **Assuming approval alone is enough:** required checks must pass before merge.
- **Overusing force-push:** usually unnecessary during normal PR updates; add a follow-up commit unless your team prefers rebasing.
- **Forgetting PR descriptions:** the PR body is often used for reviewer context, rollout notes, and issue auto-close (`Closes #123`).
- **Expecting Jenkins job naming conventions:** in GitHub Actions, workflow/job names in `.github/workflows/*.yml` are the source of truth.

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

## First-week checklist for former Gerrit users

1. Open one docs-only PR and one code PR.
2. Practice addressing comments via new commits on the same PR.
3. Watch the required CI checks and wait for green before merge.
4. Try both **Approve** and **Request changes** in a practice review.
5. Merge a PR and confirm linked issue auto-closes.

## FAQ

### Do I need a Change-Id footer?

No. GitHub does not use Gerrit Change-Id values.

### Is force-push required when I update a PR?

No. You can usually push another commit to the same branch.

### What is closest to Verified +1?

Passing required status checks on the PR.

### Where do submit rules live?

Typically in branch protection settings, CODEOWNERS, and workflow checks.
