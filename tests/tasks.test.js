const request = require('supertest');
const app = require('../src/app');
const { store } = require('../src/store');

// Reset the in-memory store before every test so tests are independent
beforeEach(() => store.reset());

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.app).toBe('OctoTasks');
  });
});

describe('GET /api/tasks', () => {
  it('returns all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('filters tasks by status=done', async () => {
    const res = await request(app).get('/api/tasks?status=done');
    expect(res.status).toBe(200);
    res.body.forEach(task => expect(task.status).toBe('done'));
  });

  it('returns 400 for an invalid status filter', async () => {
    const res = await request(app).get('/api/tasks?status=invalid');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid status/);
  });
});

describe('GET /api/tasks/:id', () => {
  it('returns a single task', async () => {
    const res = await request(app).get('/api/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('returns 404 for a missing task', async () => {
    const res = await request(app).get('/api/tasks/9999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });
});

describe('POST /api/tasks', () => {
  it('creates a new task with title only', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Write release notes' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Write release notes');
    expect(res.body.status).toBe('todo');
    expect(res.body.id).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
  });

  it('creates a task with title and description', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Deploy to staging', description: 'Run the deploy pipeline' });

    expect(res.status).toBe(201);
    expect(res.body.description).toBe('Run the deploy pipeline');
  });

  it('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'No title here' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });

  it('returns 400 when title is blank', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '   ' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });
});

describe('PATCH /api/tasks/:id', () => {
  it('advances task status', async () => {
    const res = await request(app)
      .patch('/api/tasks/3')
      .send({ status: 'done' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('done');
  });

  it('updates task title', async () => {
    const res = await request(app)
      .patch('/api/tasks/1')
      .send({ title: 'Updated title' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated title');
  });

  it('returns 400 for an invalid status', async () => {
    const res = await request(app)
      .patch('/api/tasks/1')
      .send({ status: 'archived' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid status/);
  });

  it('returns 404 for a missing task', async () => {
    const res = await request(app)
      .patch('/api/tasks/9999')
      .send({ status: 'done' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('deletes an existing task', async () => {
    // Create a disposable task first so we don't disturb other tests
    const create = await request(app)
      .post('/api/tasks')
      .send({ title: 'Temporary task' });

    const id = create.body.id;

    const del = await request(app).delete(`/api/tasks/${id}`);
    expect(del.status).toBe(204);

    // Confirm it is gone
    const get = await request(app).get(`/api/tasks/${id}`);
    expect(get.status).toBe(404);
  });

  it('returns 404 when task does not exist', async () => {
    const res = await request(app).delete('/api/tasks/9999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });
});
