import { Item, ItemRepository } from '../itemRepository.js';

export function createInMemoryItemRepository(): ItemRepository {
  const items = new Map<string, Item>();
  items.set('123e4567-e89b-12d3-a456-426614174000', {
    id: '123e4567-e89b-12d3-a456-426614174000',
  });

  return {
    async findById(id: string): Promise<Item | null> {
      return items.get(id) ?? null;
    },
  };
}
