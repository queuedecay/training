/* eslint-env browser */
/* OctoTasks — front-end logic */

const STATUS_ORDER = ['todo', 'in-progress', 'done'];
const STATUS_NEXT = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' };
const STATUS_LABEL = { todo: 'To Do', 'in-progress': 'In Progress', done: 'Done' };

let currentFilter = 'all';
let allTasks = [];

// ---- API helpers ------------------------------------------------

async function apiFetch(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  return res.json();
}

// ---- Render -------------------------------------------------------

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderStats(tasks) {
  document.getElementById('stat-total').textContent = tasks.length;
  document.getElementById('stat-todo').textContent = tasks.filter(t => t.status === 'todo').length;
  document.getElementById('stat-in-progress').textContent = tasks.filter(t => t.status === 'in-progress').length;
  document.getElementById('stat-done').textContent = tasks.filter(t => t.status === 'done').length;
}

function renderTask(task) {
  const li = document.createElement('li');
  li.className = 'task-card';
  li.dataset.id = task.id;
  li.dataset.status = task.status;

  const nextStatus = STATUS_NEXT[task.status];

  li.innerHTML = `
    <div class="task-body">
      <div class="task-title">${escapeHtml(task.title)}</div>
      ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
      <div class="task-meta">
        <span class="status-badge ${task.status}">${STATUS_LABEL[task.status]}</span>
        <span class="task-date">${formatDate(task.createdAt)}</span>
      </div>
    </div>
    <div class="task-actions">
      <button class="btn-status" data-action="advance" title="Move to ${STATUS_LABEL[nextStatus]}">
        → ${STATUS_LABEL[nextStatus]}
      </button>
      <button class="btn-delete" data-action="delete" title="Delete task" aria-label="Delete task">✕</button>
    </div>
  `;

  li.querySelector('[data-action="advance"]').addEventListener('click', () => advanceStatus(task.id));
  li.querySelector('[data-action="delete"]').addEventListener('click', () => deleteTask(task.id));

  return li;
}

function renderList() {
  const list = document.getElementById('task-list');
  const visible = currentFilter === 'all' ? allTasks : allTasks.filter(t => t.status === currentFilter);

  list.innerHTML = '';
  if (visible.length === 0) {
    const li = document.createElement('li');
    li.className = 'task-placeholder';
    li.textContent = currentFilter === 'all' ? 'No tasks yet. Add one above!' : `No "${STATUS_LABEL[currentFilter] || currentFilter}" tasks.`;
    list.appendChild(li);
    return;
  }

  visible
    .slice()
    .sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status))
    .forEach(task => list.appendChild(renderTask(task)));
}

// ---- Actions ------------------------------------------------------

async function loadTasks() {
  allTasks = await apiFetch('/api/tasks');
  renderStats(allTasks);
  renderList();
}

async function addTask(title, description) {
  const task = await apiFetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
  if (task && task.error) throw new Error(task.error);
  allTasks.push(task);
  renderStats(allTasks);
  renderList();
}

async function advanceStatus(id) {
  const task = allTasks.find(t => t.id === id);
  if (!task) return;
  const updated = await apiFetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: STATUS_NEXT[task.status] }),
  });
  Object.assign(task, updated);
  renderStats(allTasks);
  renderList();
}

async function deleteTask(id) {
  await apiFetch(`/api/tasks/${id}`, { method: 'DELETE' });
  allTasks = allTasks.filter(t => t.id !== id);
  renderStats(allTasks);
  renderList();
}

// ---- Helpers ------------------------------------------------------

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function clearError() {
  const el = document.getElementById('form-error');
  el.textContent = '';
  el.classList.add('hidden');
}

// ---- Event wiring -------------------------------------------------

document.getElementById('add-task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();
  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();
  try {
    await addTask(title, description);
    e.target.reset();
  } catch (err) {
    showError(err.message);
  }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.status;
    renderList();
  });
});

// ---- Bootstrap ----------------------------------------------------
loadTasks();
