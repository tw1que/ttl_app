import express, { Request, Response } from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

// health
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

// voorbeeld route met validatie
const IdParam = z.object({ id: z.string().uuid() });
app.get('/items/:id', (req: Request, res: Response) => {
  const parsed = IdParam.safeParse(req.params);
  if (!parsed.success) return res.status(400).json({ error: 'invalid id' });
  // later: service call
  return res.json({ id: parsed.data.id });
});

export default app;
