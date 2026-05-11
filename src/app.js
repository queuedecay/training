const express = require('express');
const path = require('path');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/tasks', tasksRouter);

// Health check used by CI and load-balancers
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', app: 'OctoTasks', timestamp: new Date().toISOString() });
});

// Start server only when run directly (not when required by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`OctoTasks running on http://localhost:${PORT}`);
  });
}

module.exports = app;
