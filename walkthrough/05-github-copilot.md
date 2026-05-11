# Section 5 — GitHub Copilot & AI

⏱ **5 minutes** · 1:05 – 1:10

> **Conceptual overview only.** The customer is not starting with AI tooling yet.
> Keep this section brief and focus on awareness, not hands-on practice.

---

## Learning objectives

By the end of this section participants will:

- Know what GitHub Copilot is and where it fits in the development workflow.
- Understand the common AI-assisted tasks Copilot accelerates.

---

## Talking points

> "We're not rolling out Copilot today, but it's worth a quick look at how it fits
> into the GitHub workflow — because when you do adopt it, it slots right in to
> everything we've covered."

### What Copilot helps with

| Task | How Copilot helps |
|------|------------------|
| **Code generation** | Autocompletes functions, classes, API routes from a comment or signature |
| **Test creation** | Suggests Jest/unit tests for a function you've just written |
| **Refactoring** | Proposes cleaner implementations when you ask in a chat |
| **Understanding unfamiliar code** | Explains what a function does in plain English |
| **Writing PR descriptions** | Summarises your diff into a clear PR body |

### Where it lives

- **In your IDE** (VS Code, JetBrains, Neovim) — inline suggestions as you type.
- **In GitHub** — `@copilot` in PR comments to ask about the code, or to suggest a fix.
- **In the CLI** — `gh copilot suggest` for shell commands.

### How it fits GitHub Flow

```
Branch created
   ↓
Write code  ←── Copilot suggests implementations
   ↓
Write tests ←── Copilot generates test skeletons
   ↓
Open PR     ←── Copilot drafts PR description
   ↓
Review      ←── Copilot explains unfamiliar code to reviewers
   ↓
Merge
```

---

## Demo (optional — only if time permits)

Show a screenshot or short video of Copilot suggesting a completion inside VS Code.
Do **not** do a live demo — 5 minutes is not enough time for setup and a meaningful
demo; it risks running over into Section 6.

---

## Key message

> "Copilot doesn't replace the GitHub Flow you've just learned — it accelerates it.
> When your team is ready, we have a full Copilot deep-dive workshop available."

---

## Resources to share

- [GitHub Copilot documentation](https://docs.github.com/en/copilot)
- [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview)
- Internal: schedule the *Copilot Deep-Dive Workshop* (see wrap-up slides)
