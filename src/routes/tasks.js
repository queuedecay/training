const express = require('express');
const router = express.Router();
const { store } = require('../store');

const VALID_STATUSES = ['todo', 'in-progress', 'done'];

// GET /api/tasks[?status=<status>]
router.get('/', (req, res) => {
  const { status } = req.query;
  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
  }
  res.json(store.getAll(status));
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const task = store.getById(parseInt(req.params.id, 10));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /api/tasks
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = store.create(title.trim(), description ? description.trim() : '');
  res.status(201).json(task);
});

// PATCH /api/tasks/:id
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, status } = req.body;

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  const task = store.update(id, { title, description, status });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const removed = store.remove(parseInt(req.params.id, 10));
  if (!removed) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

module.exports = router;
