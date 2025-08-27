import { Request, Response, NextFunction } from 'express';

import * as itemService from '../services/itemService.js';
import { createInMemoryItemRepository } from '../repositories/memory/itemRepository.js';

const itemRepository = createInMemoryItemRepository();

export async function getItem(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const item = await itemService.getById(itemRepository, id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}
