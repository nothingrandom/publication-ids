import { test, expect, describe } from 'bun:test';
import parse from '../../src/isbn/parse';
describe('isbn - parse', () => {
  test('should return invalid for empty source', () => {
    const result = parse('');
    expect(result).toEqual([{ source: '', isValid: false }]);
  });


  test('should return invalid for non-ISBN source', () => {
    const result = parse('invalid isbn');
    expect(result).toEqual([{ source: 'invalid isbn', isValid: false }]);
  });

  test('should parse valid ISBN-10', () => {
    const result = parse('0-306-40615-2');
    expect(result).toEqual([{
      source: '0-306-40615-2',
      isValid: true,
      isbn10: '0306406152',
      isbn13: '9780306406152',
    }]);
  });

  test('should parse valid ISBN-13', () => {
    const result = parse('978-3-16-148410-0');
    expect(result).toEqual([{
      source: '978-3-16-148410-0',
      isValid: true,
      isbn10: '3161484100',
      isbn13: '9783161484100',
    }]);
  });

  test('should handle multiple ISBNs in source', () => {
    const result = parse('0-306-40615-2 978-3-16-148410-0');
    expect(result).toEqual([
      {
        source: '0-306-40615-2 978-3-16-148410-0',
        isValid: true,
        isbn10: '0306406152',
        isbn13: '9780306406152',
      },
      {
        source: '0-306-40615-2 978-3-16-148410-0',
        isValid: true,
        isbn10: '3161484100',
        isbn13: '9783161484100',
      },
    ]);
  });
});