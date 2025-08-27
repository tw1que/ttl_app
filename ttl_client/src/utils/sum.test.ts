import { describe, expect, it } from 'vitest';

import { sum } from './sum';

describe('sum', () => {
  it('adds numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
