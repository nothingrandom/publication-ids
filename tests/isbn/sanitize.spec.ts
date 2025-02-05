import { test, expect, describe } from 'bun:test';
import sanitize from '../../src/isbn/sanitize';

describe('isbn - sanitize', () => {
  test('should just return a valid ISBN', () => {
    const isbn = '978-3-16-148410-0';
    expect(sanitize(isbn)).toEqual(['9783161484100']);
  });

  test('should return multiple valid ISBNs', () => {
    const isbns = ['978-3-16-148410-0', '978-1-4028-9462-6'];
    const result = sanitize(isbns);
    expect(result).toEqual(['9783161484100', '9781402894626']);
    expect(result).toHaveLength(2);
  });

  test('should remove duplicate valid ISBNs', () => {
    const isbns = ['978-3-16-148410-0', '978-3-16-148410-0', '978-1-4028-9462-6'];
    expect(sanitize(isbns)).toEqual(['9783161484100', '9781402894626']);
  });

  test('should return valid ISBN, trimming whitespace', () => {
    const isbn = '978-3-16-148410-0';
    expect(sanitize(' 978-3-16-148410-0 ')).toEqual(['9783161484100']);
    expect(sanitize('978-3-16-148410-0  ')).toEqual(['9783161484100']);
    expect(sanitize('  978-3-16-148410-0')).toEqual(['9783161484100']);
  });

  test('should return valid ISBN, removing "ISBN" prefix', () => {
    const isbn = '978-3-16-148410-0';
    expect(sanitize('ISBN 978-3-16-148410-0')).toEqual(['9783161484100']);
    expect(sanitize('ISBN-13: 978-3-16-148410-0')).toEqual(['9783161484100']);
  });

  test('should return falsy, not an ISBN', () => {
    expect(sanitize('some other string')).toEqual([]);
  });

  test('should return falsy, invalid ISBN', () => {
    const invalidIsbn = '978-3-16-148410-X';
    expect(sanitize(invalidIsbn)).toEqual([]);
  });

  test('should return falsy, no ISBN provided', () => {
    expect(sanitize(null)).toEqual([]);
    expect(sanitize(undefined)).toEqual([]);
    expect(sanitize('')).toEqual([]);
    expect(sanitize([])).toEqual([]);
  });
});
