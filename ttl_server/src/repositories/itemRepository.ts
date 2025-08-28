export interface Item {
  id: string;
}

export interface ItemRepository {
  findById(id: string): Promise<Item | null>;
}
