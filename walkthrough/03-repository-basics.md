# Section 3 — Repository Basics

⏱ **20 minutes** · 0:25 – 0:45

---

## Learning objectives

By the end of this section participants will be able to:

- Explain the purpose of key repository files (`README`, `CONTRIBUTING`, issue/PR templates).
- Read a commit graph and understand how branches diverge and merge.
- Describe how GitHub's pull-request model maps to the Gerrit change-set model.

---

## Talking points

### Key files every repo should have

| File | Purpose |
|------|---------|
| `README.md` | Project overview, how to run, how to contribute |
| `CONTRIBUTING.md` | Workflow rules, code style, PR checklist |
| `SECURITY.md` | How to report vulnerabilities privately |
| `.github/pull_request_template.md` | Pre-fills PR description for contributors |
| `.github/ISSUE_TEMPLATE/*.yml` | Structured forms for bugs and features |
| `package.json` (or equivalent) | Dependencies and scripts (`npm test`, `npm start`) |

### Commits are snapshots, not diffs

> "In Gerrit you think about **patch sets** — successive versions of the same change.
> In GitHub you think about **commits** — each one is a complete snapshot of the repo
> at that moment. A PR is just a series of commits on a branch."

Draw this on the whiteboard / show in GitHub's network graph:

```
main:      A ── B ──────────────── E (merge commit)
                 \                /
feature:          C ── D (your PR)
```

Key vocab:

- **Branch** — a named pointer to a commit.
- **PR** — a request to merge one branch into another, with a review attached.
- **Merge commit** — a commit with two parents (main + feature).

### Gerrit change set → GitHub pull request

| Gerrit concept | GitHub equivalent |
|----------------|------------------|
| Change (CL) | Pull Request |
| Patch set | New commit pushed to the PR branch |
| Code-Review +2 | Approval from a required reviewer |
| Verified +1 | CI check passes (green checkmark) |
| Submit | Merge PR |
| Abandon | Close PR |

---

## Demo steps

### 3a — Walk through key files

1. Open `README.md` — read the structure section aloud.
2. Open `CONTRIBUTING.md` — highlight the commit message convention.
3. Open `.github/pull_request_template.md` — show how it pre-fills a new PR.
4. Open `.github/ISSUE_TEMPLATE/bug_report.yml` — show the structured form.

### 3b — Commit history and graph

1. Go to **Insights → Network** — show the branch graph.
2. Go to **Code → Commits** (clock icon) — show linear history on `main`.
3. Click a commit — show the diff, the commit message, and the CI status icon.

### 3c — Branch comparison

1. Click the branch selector → show all branches including `feature/add-task-priority`.
2. Click **Compare** next to the feature branch — show the diff vs `main`.

---

## Exercise (8 min)

> "Clone the repository, create a branch called `explore/<your-username>`,
> add your name to a new file called `participants.md`, commit with the message
> `docs: add <your-name> to participants`, and push the branch."

```bash
git clone https://github.com/<org>/training.git
cd training
git checkout -b explore/<your-username>
echo "- Your Name" >> participants.md
git add participants.md
git commit -m "docs: add <your-name> to participants"
git push origin explore/<your-username>
```

**Debrief:** Have 2–3 participants share what they see in the **Code → Branches** list.

---

## Expected questions

**Q: What's the difference between `git fetch` and `git pull`?**
> A: `fetch` downloads remote changes without modifying your working tree.
> `pull` = `fetch` + `merge` (or rebase) into your current branch.

**Q: Can I rewrite commit history on GitHub?**
> A: On a feature branch, yes — force-push is allowed. On `main`, branch protection
> prevents it. This is intentional: `main` history is immutable.
