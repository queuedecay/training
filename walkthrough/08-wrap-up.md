# Section 8 — Wrap-Up & Next Steps

⏱ **5 minutes** · 1:40 – 1:45 (remaining time → Q&A)

---

## Key takeaways

Read (or project) these aloud:

1. **GitHub Flow is six steps.** Branch → commit → PR → review → CI → merge.
   Everything else is tooling that supports those six steps.

2. **Pull requests are conversations.** They capture *why* a change was made, not
   just *what* changed. Write good descriptions.

3. **CI is your safety net.** Branch protection + required checks mean broken code
   can't land on `main` without human review *and* passing tests.

4. **Issues close automatically.** Put `Closes #N` in your PR description and the
   issue closes when the PR merges. Less manual housekeeping.

5. **Everything is searchable.** GitHub Search (`/`), blame, file history, and PR
   discussions are all indexed — you can always answer "who changed this and why?"

---

## Suggested follow-up workshops

| Workshop | Best for |
|----------|---------|
| **Advanced GitHub Actions** | Teams ready to build full CI/CD pipelines, matrix builds, reusable workflows |
| **Secure Coding with GitHub** | Teams wanting Dependabot, secret scanning, code scanning (CodeQL) |
| **GitHub Copilot Deep-Dive** | Teams ready to adopt AI-assisted development |
| **GitHub Administration** | Repository admins, org owners, platform engineers |

---

## Resources

| Resource | URL |
|----------|-----|
| GitHub Docs | https://docs.github.com |
| GitHub Flow guide | https://docs.github.com/en/get-started/using-github/github-flow |
| GitHub Actions docs | https://docs.github.com/en/actions |
| GitHub Skills (interactive) | https://skills.github.com |
| GitHub CLI | https://cli.github.com |
| This repo's docs site | `https://<org>.github.io/training/` |
| This repo's wiki | `https://github.com/<org>/training/wiki` |

---

## Q&A prompts

If the room is quiet, seed discussion with:

- *"What's the first thing you'll change about your current workflow when you move to GitHub?"*
- *"What's the Gerrit workflow you're most worried about losing?"*
- *"Who on your team will be the first to open a PR?"*

---

## Trainer checklist — post-session

- [ ] Share the GitHub Pages URL with participants.
- [ ] Share links to the follow-up workshops.
- [ ] Collect feedback (NPS / survey link).
- [ ] Archive the training issues and project board (or leave open for self-study).
- [ ] Send calendar invite for the Advanced Actions workshop to interested participants.
