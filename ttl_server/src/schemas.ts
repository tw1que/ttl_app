import { z } from 'zod';

export const Empty = z.object({});

export const Id = z.string().uuid().meta({
  description: 'Item identifier',
  example: '123e4567-e89b-12d3-a456-426614174000',
});

export const IdParam = z.object({ id: Id });

export const Item = z
  .object({
    id: Id,
  })
  .meta({ id: 'Item', description: 'An item' });

export const HealthResponse = z
  .object({ ok: z.boolean() })
  .meta({ id: 'HealthResponse', description: 'Health check status' });

export const ErrorResponse = z
  .object({ error: z.string() })
  .meta({ id: 'ErrorResponse', description: 'Error response' });
