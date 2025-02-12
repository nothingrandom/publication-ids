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
      isbn13: '9780306406157',
    }]);
  });

  test('should parse valid ISBN-13', () => {
    const result = parse('978-1984880987');
    expect(result).toEqual([{
      source: '978-1984880987',
      isValid: true,
      isbn10: '1984880985',
      isbn13: '9781984880987',
    }]);
  });

  test('should handle multiple ISBNs in source', () => {
    const result = parse('978-1529441529 1338299166');
    expect(result).toEqual([
      {
        source: '978-1529441529 1338299166',
        isValid: true,
        isbn10: '1529441528',
        isbn13: '9781529441529',
      },
      {
        source: '978-1529441529 1338299166',
        isValid: true,
        isbn10: '1338299166',
        isbn13: '9781338299168',
      },
    ]);
  });
});