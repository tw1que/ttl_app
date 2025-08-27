import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../src/app.js';

describe('health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

describe('items/:id', () => {
  it('400 on invalid id', async () => {
    const res = await request(app).get('/items/not-a-uuid');
    expect(res.status).toBe(400);
  });

  it('200 on valid id', async () => {
    const id = '00000000-0000-0000-0000-000000000000';
    const res = await request(app).get(`/items/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id });
  });
});
