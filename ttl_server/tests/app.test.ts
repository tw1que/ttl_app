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
  it('returns item on valid id', async () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const res = await request(app).get(`/items/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id });
  });

  it('400 on invalid id', async () => {
    const res = await request(app).get('/items/not-a-uuid');
    expect(res.status).toBe(400);
  });
});
