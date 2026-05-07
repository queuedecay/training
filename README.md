# OctoTasks — GitHub Developer Training

[![CI](https://github.com/queuedecay/training/actions/workflows/ci.yml/badge.svg)](https://github.com/queuedecay/training/actions/workflows/ci.yml)
[![GitHub Pages](https://github.com/queuedecay/training/actions/workflows/pages.yml/badge.svg)](https://github.com/queuedecay/training/actions/workflows/pages.yml)

A **2-hour hands-on training course** for ~100 developers migrating from Gerrit and Jenkins to GitHub.

The course centres on **OctoTasks** — a simple Node.js task-manager web app that participants browse, modify, review, and ship during the session.

---

## Quick links

| Resource | Location |
|----------|----------|
| 📖 **Docs site** | `https://<org>.github.io/training/` |
| 🗂️ **Trainer walkthroughs** | [`walkthrough/`](walkthrough/README.md) |
| 📚 **Wiki** | [Repository wiki](../../wiki) |
| ⚙️ **Setup guide** | [`docs/setup.html`](docs/setup.html) |

---

## Repository structure

```
training/
├── src/                        # OctoTasks web app (Node.js / Express)
│   ├── app.js                  # Server entry point
│   ├── store.js                # In-memory task store
│   ├── routes/tasks.js         # REST API (/api/tasks)
│   └── public/                 # Frontend (HTML / CSS / JS)
├── tests/
│   └── tasks.test.js           # Jest test suite (16 tests)
├── docs/                       # GitHub Pages documentation site
│   ├── index.html              # Course overview & agenda
│   ├── api.html                # API reference
│   └── setup.html              # Instructor setup guide
├── walkthrough/                # Trainer step-by-step guides (one per section)
│   ├── README.md               # Index + pre-session checklist
│   ├── 01-welcome.md
│   ├── 02-navigating-github.md
│   ├── 03-repository-basics.md
│   ├── 04-github-flow.md       # ← core live demo section
│   ├── 05-github-copilot.md
│   ├── 06-github-actions.md
│   ├── 07-putting-it-together.md
│   └── 08-wrap-up.md
├── wiki/                       # Wiki page sources (push to .wiki repo)
│   ├── Home.md
│   ├── GitHub-Flow.md
│   ├── Setup-Guide.md
│   └── Gerrit-vs-GitHub.md
└── .github/
    ├── workflows/
    │   ├── ci.yml              # Lint + test on push/PR
    │   ├── pages.yml           # Deploy docs/ to GitHub Pages
    │   └── setup-training.yml  # One-click seed: issues, PRs, project
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.yml
    │   └── feature_request.yml
    ├── pull_request_template.md
    └── CODEOWNERS
```

---

## Running the app locally

```bash
git clone https://github.com/queuedecay/training.git
cd training
npm install
npm start          # → http://localhost:3000
```

```bash
npm test           # Run Jest tests (16 passing)
npm run lint       # Run ESLint
npm run dev        # Dev server with auto-restart
```

---

## Training agenda

| Time | Section |
|------|---------|
| 0:00 – 0:10 | Welcome & Objectives |
| 0:10 – 0:25 | Navigating GitHub |
| 0:25 – 0:45 | Repository Basics |
| 0:45 – 1:05 | **GitHub Flow** (core live demo) |
| 1:05 – 1:10 | GitHub Copilot & AI (conceptual overview) |
| 1:10 – 1:25 | GitHub Actions – Simple Demo |
| 1:25 – 1:40 | Putting It All Together |
| 1:40 – 1:45 | Wrap-Up & Next Steps + Q&A |

---

## Instructor setup (before the session)

1. Run **Actions → Setup Training Environment** (workflow_dispatch) to seed issues, PRs, and a project board.
2. Enable **GitHub Pages** (Settings → Pages → Source: GitHub Actions).
3. Enable **branch protection** on `main` (require the `Test` CI job).
4. Push wiki pages: `cp wiki/*.md /tmp/wiki && cd /tmp/wiki && git add . && git commit -m "init" && git push`.
5. Share the Pages URL with participants.

Full instructions: [`docs/setup.html`](docs/setup.html) or the [Setup Guide wiki page](../../wiki/Setup-Guide).

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
