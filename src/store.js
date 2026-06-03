/**
 * In-memory task store.
 * Using a class so tests can create isolated instances and the
 * live server can share a single instance via the exported singleton.
 */

const DEFAULT_TASKS = [
  {
    id: 1,
    title: 'Set up GitHub repository',
    description: 'Initialise repo with README, .gitignore, and branch-protection rules.',
    status: 'done',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 2,
    title: 'Configure branch protection',
    description: 'Require at least one PR review before merging to main.',
    status: 'done',
    createdAt: new Date('2024-01-16').toISOString(),
  },
  {
    id: 3,
    title: 'Add CI pipeline',
    description: 'Set up GitHub Actions to lint and test on every push and PR.',
    status: 'in-progress',
    createdAt: new Date('2024-01-17').toISOString(),
  },
  {
    id: 4,
    title: 'Write API documentation',
    description: 'Document all REST endpoints in docs/api.html.',
    status: 'todo',
    createdAt: new Date('2024-01-18').toISOString(),
  },
  {
    id: 5,
    title: 'Add user authentication',
    description: 'Implement session-based auth so each developer sees their own tasks.',
    status: 'todo',
    createdAt: new Date('2024-01-19').toISOString(),
  },
];

class TaskStore {
  constructor(initialTasks) {
    this._seed = initialTasks || DEFAULT_TASKS;
    this.reset();
  }

  reset() {
    this.tasks = this._seed.map(t => ({ ...t }));
    this.nextId = Math.max(...this.tasks.map(t => t.id)) + 1;
  }

  getAll(status) {
    if (status) return this.tasks.filter(t => t.status === status);
    return [...this.tasks];
  }

  getById(id) {
    return this.tasks.find(t => t.id === id) || null;
  }

  create(title, description) {
    const task = {
      id: this.nextId++,
      title,
      description: description || '',
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  update(id, updates) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;
    const { title, description, status } = updates;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    return task;
  }

  remove(id) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }
}

// Singleton used by the live server
const store = new TaskStore();

module.exports = { TaskStore, store };

// Priority support (work in progress — see open PR)
TaskStore.prototype.setPriority = function (id, priority) {
  const task = this.getById(id);
  if (!task) return null;
  task.priority = priority;
  return task;
};
