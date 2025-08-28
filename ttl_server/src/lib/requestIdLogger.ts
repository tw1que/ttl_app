import { randomUUID } from 'crypto';

import { Request, Response, NextFunction } from 'express';

export function requestIdLogger(req: Request, res: Response, next: NextFunction): void {
  const id = randomUUID();
  req.id = id;
  res.setHeader('X-Request-Id', id);
  // eslint-disable-next-line no-console
  console.log(`[${id}] ${req.method} ${req.originalUrl}`);
  next();
}
