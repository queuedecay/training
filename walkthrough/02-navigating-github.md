# Section 2 — Navigating GitHub

⏱ **15 minutes** · 0:10 – 0:25

---

## Learning objectives

By the end of this section participants will be able to:

- Navigate a repository's key tabs: Code, Issues, Pull Requests, Actions, Projects, Wiki.
- Browse file history and blame a specific line.
- Find and read an open issue and an open pull request.

---

## Talking points

### The repository homepage

> "The repository homepage is your starting point for everything. Think of it as the
> 'dashboard' for a project. The `README.md` you see here is rendered automatically —
> it's the first thing contributors and users read."

Point out:

- **About panel** (top-right) — one-liner, topics, links.
- **Code tab** — file browser, branch/tag selector, commit history shortcut.
- **Latest commit message per file** — quick signal of recent changes.
- **`main` branch indicator** — your protected default branch.

### Where developers spend most of their time

Show this rough breakdown:

| Tab | What you do there |
|-----|------------------|
| **Code** | Browse files, read history, search code |
| **Issues** | Report bugs, request features, track work |
| **Pull Requests** | Submit and review code changes |
| **Actions** | Watch CI/CD runs, re-run failed jobs |
| **Projects** | See the sprint board |
| **Wiki** | Read team documentation |

---

## Demo steps

### 2a — Browse files

1. Click through `src/app.js` — point out the Express entry point.
2. Click through `src/routes/tasks.js` — show the four CRUD endpoints.
3. Click the **History** button at the top-right of the file — show commit history.
4. Click a commit — show the diff view (green = added, red = removed).

### 2b — Issues tab

1. Click **Issues**.
2. Point out **open** vs **closed** issues (use the "Closed" filter).
3. Open an issue — show labels, assignees, comments, linked PRs.

### 2c — Pull Requests tab

1. Click **Pull Requests**.
2. Open the open PR (`feat: add task priority levels`).
3. Show: description, commits tab, files-changed tab, checks at the bottom.

### 2d — Code search

1. Press `.` on the keyboard (or `t`) in the Code tab to open the file finder.
2. Search for `store` — navigate to `src/store.js`.
3. Alternatively use **Search** (`/`) with `repo:` syntax.

---

## Exercise (5 min)

> "Find the commit that added the CSS file for the task-manager UI. What was the commit
> message, and which file was changed?"

**Answer:** Look in the commit history for a commit message containing "style" or "CSS",
touching `src/public/style.css`.

---

## Expected questions

**Q: How do I search across all files in the repo?**
> A: Use the `/` search at the top, or press `.` to open VS Code in the browser (github.dev).

**Q: Can I see who changed a specific line?**
> A: Yes — open any file and click **Blame** (top-right of the file view). Each line shows
> the commit that last changed it, with the author and date.
