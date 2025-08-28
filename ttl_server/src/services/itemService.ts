import { HttpError } from '../lib/errors.js';
import { ItemRepository } from '../repositories/itemRepository.js';

export async function getById(repository: ItemRepository, id: string) {
  const item = await repository.findById(id);
  if (!item) {
    throw new HttpError(404, 'item not found');
  }
  return item;
}
