import { describe, expect, it } from 'vitest';

import { createInMemoryItemRepository } from '../src/repositories/memory/itemRepository.js';
import { getById } from '../src/services/itemService.js';

const id = '123e4567-e89b-12d3-a456-426614174000';

describe('itemService.getById', () => {
  it('returns item when found', async () => {
    const repo = createInMemoryItemRepository();
    const item = await getById(repo, id);
    expect(item).toEqual({ id });
  });

  it('throws when item not found', async () => {
    const repo = createInMemoryItemRepository();
    await expect(getById(repo, 'missing')).rejects.toThrow('item not found');
  });
});
