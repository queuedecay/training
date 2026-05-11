# Section 7 — Putting It All Together

⏱ **15 minutes** · 1:25 – 1:40

---

## Learning objectives

By the end of this section participants will be able to:

- Describe the complete GitHub Flow loop from idea to deployed code.
- Map every step of that loop to a specific GitHub feature.
- Identify where AI (Copilot) fits across the lifecycle.

---

## Talking points

### The end-to-end developer loop

Draw (or project) this diagram:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────────┐
│   Issue     │────▶│    Branch    │────▶│  Commits  (PR open) │
│  (backlog)  │     │  (checkout)  │     │                     │
└─────────────┘     └──────────────┘     └──────────┬──────────┘
                                                     │
                                          CI runs automatically
                                                     │
                                         ┌───────────▼───────────┐
                                         │   Review & approve    │
                                         │ (inline comments, ✅) │
                                         └───────────┬───────────┘
                                                     │
                                          ┌──────────▼──────────┐
                                          │    Merge to main    │
                                          └──────────┬──────────┘
                                                     │
                                         ┌───────────▼──────────┐
                                         │  Deploy (Pages / CD) │
                                         └──────────────────────┘
```

### Where AI fits

| Loop stage | Copilot accelerates |
|-----------|-------------------|
| Writing code | Inline suggestions, tab-completion |
| Writing tests | Test scaffolding from function signature |
| Opening a PR | Auto-generated PR description |
| Code review | Explain what changed, spot issues |
| Understanding legacy code | Explain any function in plain English |

---

## Demo steps (live — ~8 min)

Use the PR the participant opened at the end of Section 4.

### Step 1 — Link the PR to an Issue

1. Open the PR.
2. Edit the description to add `Closes #<issue-number>`.
3. Show how the issue now shows "Development → <PR>" in the sidebar.

### Step 2 — Watch CI run on the PR

1. Scroll to the Checks section at the bottom of the PR.
2. Click **Details** on the `Test` job — watch logs scroll.
3. Once green: point out the "All checks have passed" banner.

### Step 3 — Approve and merge

1. Have a participant approve the PR.
2. Click **Merge pull request → Confirm merge**.
3. The linked issue closes automatically (because of `Closes #N`).

### Step 4 — Watch the project board update

1. Go to **Projects → OctoTasks Sprint 1**.
2. The issue card should have moved from *In Progress* to *Done* automatically.

### Step 5 — Watch Pages deploy (if time permits)

1. Go to **Actions** — the `pages.yml` workflow should be running.
2. Wait for it to complete.
3. Click the deployment URL — the live docs site has updated.

---

## Exercise (4 min)

> "Trace the life of issue #5 (the open 'add-due-dates' issue):
> 1. When was it opened?
> 2. Which PR references it?
> 3. Is the PR merged?
> 4. Did the issue close automatically?"

---

## Key summary points

Remind participants:

1. **Issues** → capture intent and create a shared understanding.
2. **Branch** → isolates work; you can't break `main`.
3. **PR** → the review surface; also where CI runs.
4. **Actions** → automated quality gate; CI must be green to merge.
5. **Merge** → fast, reversible (you can revert a PR), auditable.
6. **Pages** → documentation auto-updates; no manual deploy.
