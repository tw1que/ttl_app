import { Request, Response, NextFunction } from 'express';

import * as healthService from '../services/healthService.js';

export async function getHealth(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await healthService.check();
    res.json(result);
  } catch (err) {
    next(err);
  }
}
