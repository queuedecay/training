# Section 1 — Welcome & Objectives

⏱ **10 minutes** · 0:00 – 0:10

---

## Learning objectives

By the end of this section participants will:

- Understand the key differences between Gerrit/Jenkins and GitHub.
- Know the shape of today's session and what they'll leave with.

---

## Talking points

### Why GitHub?

> "You're moving from a system where code reviews happen as 'patch sets' on a single
> change to one where they happen on **pull requests** against branches. The mental model
> is slightly different, but most of the day-to-day work looks very familiar."

Key differences to highlight:

| Gerrit / Jenkins | GitHub |
|-----------------|--------|
| Change sets (patch sets) | Pull requests (commits on a branch) |
| Code-Review +2 vote | PR approval + merge |
| Jenkins pipelines (Jenkinsfile) | GitHub Actions (YAML workflows) |
| Gerrit web UI | GitHub web UI + CLI (`gh`) |
| Change IDs in commit messages | PR numbers + branch names |
| Submit → Code lands | Merge button → Code lands |

### What we'll build today

Introduce the **OctoTasks** app:

> "This is the app we'll use throughout today. It's a simple task manager — nothing
> fancy — but it has a real API, real tests, and a real CI/CD pipeline. We'll treat
> it exactly as we would a production repository."

Show the running app at `http://localhost:3000` (or the deployed URL).

### Session goals

By the end of the 2 hours, participants will be able to:

1. Navigate a GitHub repository confidently.
2. Create a branch, commit changes, and open a pull request.
3. Review and approve a colleague's PR.
4. Understand how GitHub Actions runs CI/CD on every PR.

---

## Demo steps

1. Open the **OctoTasks** repository on GitHub (project the screen).
2. Point out: Code tab, Issues tab, Pull Requests tab, Actions tab, Projects tab, Wiki tab.
3. Say: "Everything we'll do today lives in one of these tabs."

---

## Exercise

None — this section is presenter-led. Encourage participants to open the repo URL on
their own machines so they can follow along from Section 2 onwards.

---

## Expected questions

**Q: Will my team's workflow look exactly like this?**
> A: The core GitHub Flow model is the same everywhere. Your team may have specific
> branch naming conventions or required reviewers — but the fundamentals you'll learn
> today apply everywhere.

**Q: Do we keep our Jenkins pipelines?**
> A: Jenkins jobs can be replaced by GitHub Actions workflows — we'll cover that in
> Section 6. Migration is gradual; you don't need to switch everything on day one.
