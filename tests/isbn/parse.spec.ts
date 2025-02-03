import { test, expect, describe } from 'bun:test';
import parse from '../../src/isbn/parse';

describe('isbn - parse', () => {
  test('should return valid ISBN-13 and ISBN-10', () => {
    const result = parse('9780747532699');
    expect(result).toEqual([{
      source: '9780747532699',
      isValid: true,
      isbn10: '0747532699',
      isbn13: '9780747532699',
    }]);
  });

  test('should return valid ISBN-10 and ISBN-13', () => {
    const result = parse('0747532699');
    expect(result).toEqual([{
      source: '0747532699',
      isValid: true,
      isbn10: '0747532699',
      isbn13: '9780747532699',
    }]);
  });

  test('should return invalid ISBN', () => {
    const result = parse('invalid-isbn');
    expect(result).toEqual([{
      source: 'invalid-isbn',
      isValid: false,
      isbn10: undefined,
      isbn13: undefined,
    }]);
  });

  test('should return valid ISBN-13 with hyphens', () => {
    const result = parse('978-0-747-53269-9');
    expect(result).toEqual([{
      source: '978-0-747-53269-9',
      isValid: true,
      isbn10: '0747532699',
      isbn13: '9780747532699',
    }]);
  });

  test('should return valid ISBN-10 with hyphens', () => {
    const result = parse('0-747-53269-9');
    expect(result).toEqual([{
      source: '0-747-53269-9',
      isValid: true,
      isbn10: '0747532699',
      isbn13: '9780747532699',
    }]);
  });
});
