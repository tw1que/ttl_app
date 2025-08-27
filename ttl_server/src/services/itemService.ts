import { HttpError } from '../lib/errors.js';
import * as repository from '../repositories/itemRepository.js';

export async function getById(id: string) {
  const item = await repository.findById(id);
  if (!item) {
    throw new HttpError(404, 'item not found');
  }
  return item;
}
