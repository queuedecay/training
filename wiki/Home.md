# OctoTasks Wiki

Welcome to the **OctoTasks** project wiki. These pages support the *GitHub for Developers* training course.

## Contents

| Page | Description |
|------|-------------|
| [GitHub Flow](GitHub-Flow) | The six-step model used for all work in this repo |
| [Setup Guide](Setup-Guide) | How to run OctoTasks locally and prepare for training |
| [Gerrit vs GitHub](Gerrit-vs-GitHub) | Side-by-side comparison of concepts and workflows |

## Start here if you're coming from Gerrit

If you're familiar with Gerrit patch sets, labels, and submit queues, read pages in this order:

1. [Gerrit vs GitHub](Gerrit-vs-GitHub) — map old terms to new concepts.
2. [GitHub Flow](GitHub-Flow) — see the end-to-end GitHub workflow.
3. [Setup Guide](Setup-Guide) — get your local environment ready.

Quick orientation:

- **Gerrit Change** → **GitHub Pull Request**
- **Patch set update** → **New commit pushed to PR branch**
- **Code-Review +2 / Verified +1** → **PR approval + required status checks**
- **Submit** → **Merge pull request**

## About OctoTasks

OctoTasks is a lightweight task-manager web app built with Node.js and Express.  
It is used as the **live demo application** throughout the *GitHub for Developers* training course.

Source code: [`src/`](../tree/main/src)  
Docs site: see the project's GitHub Pages  
Training walkthroughs: [`walkthrough/`](../tree/main/walkthrough)

> These wiki pages are sourced from the repository's `wiki/` directory and are automatically synced to the GitHub Wiki.

---

*Last updated by the Setup Training workflow. For changes, edit `wiki/*.md` in the main repo and re-run the setup workflow.*
