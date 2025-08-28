import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

import app from '../src/app.js';
import * as healthService from '../src/services/healthService.js';

describe('GET /health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('handles service errors', async () => {
    const spy = vi
      .spyOn(healthService, 'check')
      .mockRejectedValue(new Error('boom'));
    const res = await request(app).get('/health');
    expect(res.status).toBe(500);
    spy.mockRestore();
  });
});
