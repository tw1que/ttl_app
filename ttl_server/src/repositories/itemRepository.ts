export interface Item {
  id: string;
}

const items = new Map<string, Item>();
items.set('123e4567-e89b-12d3-a456-426614174000', {
  id: '123e4567-e89b-12d3-a456-426614174000',
});

export async function findById(id: string): Promise<Item | null> {
  return items.get(id) ?? null;
}
