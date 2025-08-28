import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

import { HttpError } from './errors.js';

export function validate(
  schema: ZodSchema,
  location: 'body' | 'query' | 'params' = 'body',
) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const reqRecord = req as unknown as Record<string, unknown>;
    const data = reqRecord[location];
    const result = schema.safeParse(data);
    if (!result.success) {
      next(new HttpError(400, result.error.message));
      return;
    }
    reqRecord[location] = result.data as unknown;
    next();
  };
}
