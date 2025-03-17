import { pluck, range } from './utils';

describe('utils', () => {
  describe('range', () => {
    it('range test', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    });

    it('is Array', () => {
      expect(Array.isArray(range(1, 5))).toBe(true);
    });
  });

  describe('pluuck', () => {
    const data = [
      { id: '1', name: 'foo' },
      { id: '2', name: 'jebac' },
      { id: '3', name: 'pedala' },
      { id: '4', name: 'jebanego kurwa' },
    ];

    it('must return sth', () => {
      expect(pluck(data, 'name').length).toBeGreaterThan(0);
    });

    it('must return array of strings', () => {
      expect(
        pluck(data, 'name').every((item) => typeof item === 'string')
      ).toBe(true);
    });
  });
});
