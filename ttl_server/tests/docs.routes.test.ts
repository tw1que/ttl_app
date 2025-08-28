import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../src/app.js';

describe('GET /docs', () => {
  it('serves redoc page', async () => {
    const res = await request(app).get('/docs');
    expect(res.status).toBe(200);
    expect(res.text).toContain('redoc');
  });
});

describe('GET /openapi.json', () => {
  it('returns openapi document', async () => {
    const res = await request(app).get('/openapi.json');
    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe('3.1.0');
  });
});
