# Section 6 — GitHub Actions: Simple Demo

⏱ **15 minutes** · 1:10 – 1:25

---

## Learning objectives

By the end of this section participants will be able to:

- Explain what GitHub Actions is and how it differs from Jenkins.
- Read a simple workflow YAML file.
- Find the CI run for a pull request and understand its status.
- Know what developers need to understand vs what platform admins own.

---

## Talking points

### What GitHub Actions is

> "GitHub Actions is GitHub's built-in CI/CD engine. Instead of a separate Jenkins
> server with a Jenkinsfile, you put a YAML workflow file in `.github/workflows/`.
> GitHub runs it for you — no infrastructure to manage."

### Jenkins → GitHub Actions mapping

| Jenkins concept | GitHub Actions equivalent |
|----------------|--------------------------|
| Jenkinsfile | `.github/workflows/*.yml` |
| Pipeline | Workflow |
| Stage | Job |
| Step | Step |
| Agent | `runs-on: ubuntu-latest` |
| Plugin | Action (e.g. `actions/checkout@v4`) |
| Build triggers | `on: push`, `on: pull_request`, `on: schedule` |
| Credentials / secrets | Repository secrets (`Settings → Secrets`) |

### What developers need to know

As a **developer** (not a platform admin) you mainly need to:

1. **Understand the status** — green ✅ = all checks passed; red ❌ = something failed.
2. **Read failure logs** — click the failing job, expand the failing step.
3. **Re-run a flaky job** — click **Re-run failed jobs**.
4. **Know not to merge if CI is red** — branch protection will block you anyway.

Admins own: writing new workflows, managing secrets, configuring environments.

---

## Demo steps

### 6a — Walk through the CI workflow

Open `.github/workflows/ci.yml`:

```yaml
on:
  push:
    branches: [main, "feature/**"]
  pull_request:
    branches: [main]
```

> "This workflow runs every time someone pushes to a feature branch **or** opens/updates
> a pull request targeting `main`. That's the trigger."

Point out:

- `jobs.lint` runs ESLint first.
- `jobs.test` runs Jest — it **needs: lint**, so it only runs if lint passes.
- `actions/upload-artifact` saves the coverage report so you can download it later.

### 6b — Watch a live CI run

1. Go to the **Actions** tab.
2. Click the most recent **CI** run.
3. Expand the **Lint** job — show the individual steps.
4. Expand the **Test** job — show test output and coverage upload.

### 6c — See CI checks on a PR

1. Navigate to an open PR.
2. Scroll to the bottom — show the **Checks** section.
3. Click **Details** next to the `Test` job.
4. Show how a failing check blocks the **Merge** button (if branch protection is on).

### 6d — Walk through the Pages workflow

Open `.github/workflows/pages.yml`:

> "This second workflow fires whenever a file inside `docs/` changes on `main`. It
> picks up the entire `docs/` folder and deploys it to GitHub Pages. No build step
> needed — it just serves static HTML. The deployment URL appears in the PR 'environment'
> section."

---

## Exercise (4 min)

> "Go to the Actions tab and find the last time the CI workflow ran. Answer:
> 1. Which job ran first?
> 2. How long did it take?
> 3. What artifact was uploaded?"

**Answers:** Lint → Test; time varies; `coverage-report`.

---

## What to mention but not deep-dive

- **Environments** (staging / production gates) — covered in Advanced Actions workshop.
- **Secrets** — set in Settings → Secrets; never appear in logs.
- **Reusable workflows** — call one workflow from another.
- **Matrix builds** — test on multiple Node versions in parallel.

---

## Expected questions

**Q: Can we reuse our existing Jenkins pipeline logic?**
> A: Some plugins have Actions equivalents. Complex pipelines will need to be rewritten
> in YAML, but the concepts map closely. The Advanced Actions workshop covers this.

**Q: Where do I store passwords and API keys?**
> A: In **Settings → Secrets and variables → Actions**. They're encrypted at rest,
> never logged, and injected as environment variables in the workflow.

**Q: How do I trigger a workflow manually?**
> A: Add `on: workflow_dispatch` to the workflow (see `setup-training.yml`). Then use
> the Actions tab → select the workflow → **Run workflow**.
