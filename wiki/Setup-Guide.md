# Setup Guide

How to get OctoTasks running on your machine.

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Git | 2.x+ | `git --version` |
| Node.js | 20+ | `node --version` |
| npm | 10+ | `npm --version` |

## Clone and install

```bash
git clone https://github.com/<org>/training.git
cd training
npm install
```

## Run the app

```bash
npm start
# OctoTasks running on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000). You should see a task list with five seed tasks.

## Run the test suite

```bash
npm test
```

Expected output: `16 tests passed`.

A `coverage/` directory is generated — open `coverage/lcov-report/index.html` to see
line-by-line coverage.

## Lint

```bash
npm run lint
```

No output means no errors.

## Run in development mode (auto-restart)

```bash
npm run dev
```

The server restarts automatically whenever you save a file.

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | HTTP port to listen on |

Example:

```bash
PORT=8080 npm start
```

## Project structure

```
training/
├── src/
│   ├── app.js           # Express entry point
│   ├── store.js         # In-memory task store
│   ├── routes/
│   │   └── tasks.js     # /api/tasks REST routes
│   └── public/
│       ├── index.html   # Frontend
│       ├── style.css    # Styles
│       └── app.js       # Frontend JavaScript
├── tests/
│   └── tasks.test.js    # Jest test suite
├── docs/                # GitHub Pages documentation
└── walkthrough/         # Trainer guides
```

## Troubleshooting

**Port already in use**

```bash
PORT=3001 npm start
```

**`npm install` fails**

Ensure you're on Node.js 20+: `node --version`. If you have nvm:

```bash
nvm install 20 && nvm use 20
```

**Tests fail with `EADDRINUSE`**

The test suite imports the app module without starting the server (it uses
`supertest`), so port conflicts should not occur. If you see this error,
kill any running `npm start` process first.
