# Section 4 — GitHub Flow

⏱ **20 minutes** · 0:45 – 1:05

> **This is the core demo of the course.** Do this live, typing in the terminal and
> browser while participants follow along.

---

## Learning objectives

By the end of this section participants will be able to:

- Explain the six steps of GitHub Flow.
- Create a branch, make a commit, and open a pull request.
- Leave a review comment and approve a PR.
- Merge a PR and observe CI running automatically.

---

## GitHub Flow in 6 steps

```
1. Create a branch  →  2. Add commits  →  3. Open a PR
4. Review & discuss  →  5. CI passes  →  6. Merge
```

> "This is the entire model. Everything GitHub supports — Issues, Actions, Copilot —
> plugs into one of these six steps. Once this loop is natural, the rest is just tooling."

---

## Talking points

### Why branches instead of patch sets?

> "In Gerrit, you had a single 'change' that you updated with successive patch sets.
> In GitHub, you create a **branch** and make as many commits as you need. The PR shows
> the diff between your branch and `main`, not between two patch sets."

### PR descriptions matter

> "A good PR description explains *what* changed and *why*. Reviewers shouldn't have
> to read the code to understand the intent. The template in `.github/pull_request_template.md`
> helps your team write consistent descriptions."

### Review etiquette

| Comment type | When to use |
|-------------|-------------|
| **Comment** | Observation or question — doesn't block merge |
| **Request changes** | Something must be fixed before merge |
| **Approve** | Code is good to merge |

---

## Demo steps (live coding — ~12 min)

### Step 1 — Create a branch

```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create the feature branch
git checkout -b feature/add-due-dates
```

> "I'm following the convention: `feature/` prefix, then a short kebab-case description
> of what the branch does."

### Step 2 — Make a change

Open `src/store.js` and add a `dueDate` field to the `create` method:

```js
// Before:
create(title, description) {
  const task = {
    id: this.nextId++,
    title,
    description: description || '',
    status: 'todo',
    createdAt: new Date().toISOString(),
  };

// After:
create(title, description, dueDate) {
  const task = {
    id: this.nextId++,
    title,
    description: description || '',
    status: 'todo',
    dueDate: dueDate || null,
    createdAt: new Date().toISOString(),
  };
```

Also update the `POST /api/tasks` route in `src/routes/tasks.js` to accept `dueDate`:

```js
// In the POST handler, change:
const { title, description } = req.body;
const task = store.create(title.trim(), description ? description.trim() : '');

// To:
const { title, description, dueDate } = req.body;
const task = store.create(title.trim(), description ? description.trim() : '', dueDate || null);
```

### Step 3 — Commit

```bash
git add src/store.js src/routes/tasks.js
git status   # ← always check before committing
git commit -m "feat: add optional dueDate field to tasks"
git push origin feature/add-due-dates
```

### Step 4 — Open a pull request

1. GitHub will show a yellow banner: **"Compare & pull request"** — click it.
2. The PR template pre-fills. Fill in:
   - **Title:** `feat: add dueDate field to task model`
   - **Description:** Explain what changed and reference issue #7.
3. Click **Create pull request**.

> "Notice the CI check starts immediately — we can see it at the bottom of the PR."

### Step 5 — Review the PR (ask a participant to review)

1. Have a participant navigate to the PR on their machine.
2. Click **Files changed**.
3. Click the `+` icon next to a line to leave an inline comment.
4. Leave a comment: *"Should we validate that dueDate is a valid ISO 8601 string?"*
5. Click **Start review** → **Submit review → Comment**.

### Step 6 — Address the review and merge

1. Respond to the review comment: *"Good point — added validation in the next commit."*
2. Add a simple check in the route:

```js
if (dueDate && isNaN(Date.parse(dueDate))) {
  return res.status(400).json({ error: 'dueDate must be a valid ISO 8601 date string' });
}
```

3. Commit and push:

```bash
git add src/routes/tasks.js
git commit -m "fix: validate dueDate is a parseable date string"
git push origin feature/add-due-dates
```

4. Back in the PR — reviewer clicks **Approve**.
5. Click **Merge pull request → Confirm merge**.
6. Watch the Pages deployment trigger in the Actions tab.

---

## Exercise (5 min)

> "Now it's your turn. On your `explore/<username>` branch, make a small change to
> `src/public/index.html` — change the `<title>` to include your team name.
> Commit, push, and open a PR. Don't merge yet — we'll use it in Section 7."

---

## Expected questions

**Q: Should we squash commits before merging?**
> A: It depends on team preference. Squash gives a cleaner history; merge commit
> preserves the full story. Your team's branch-protection settings can enforce
> a policy.

**Q: What's the difference between merge, squash, and rebase?**
> A: All three land the code in `main`. Merge = a merge commit; Squash = all commits
> collapsed into one; Rebase = commits replayed linearly. We'll cover strategies in
> the Advanced Actions follow-up.

**Q: Can I reopen a closed PR?**
> A: Yes, as long as the branch still exists. Go to the closed PR and click Reopen.
