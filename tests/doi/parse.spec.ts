import { test, expect, describe } from 'bun:test';
import parse from '../../src/doi/parse';

describe('doi - parse', () => {
  test('should return valid DOI with valid ISBN and chapter', () => {
    const result = parse('10.4324/9780203765449-11');
    expect(result).toEqual([{
      source: '10.4324/9780203765449-11',
      doi: '10.4324/9780203765449',
      isValid: true,
      resolve: 'https://doi.org/10.4324/9780203765449',
      isbn: {
        isValid: true,
        source: '9780203765449',
        isbn10: '0203765449',
        isbn13: '9780203765449',
        chapter: '11',
      },
    }]);
  });

  test('should return valid DOI without ISBN and chapter', () => {
    const result = parse('10.1000/xyz123');
    expect(result).toEqual([{
      source: '10.1000/xyz123',
      doi: '10.1000/xyz123',
      isValid: true,
      resolve: 'https://doi.org/10.1000/xyz123',
      isbn: {
        isValid: false,
      },
    }]);
  });

  test('should return invalid DOI', () => {
    const result = parse('invalid-doi');
    expect(result).toEqual([{
      source: 'invalid-doi',
      doi: undefined,
      isValid: false,
    }]);

    expect(result[0].resolve).toBeUndefined();
  });

  test('should return valid DOI with invalid ISBN', () => {
    const result = parse('10.4324/1234567890123-11');
    expect(result).toEqual([{
      source: '10.4324/1234567890123-11',
      doi: '10.4324/1234567890123',
      isValid: true,
      resolve: 'https://doi.org/10.4324/1234567890123',
      isbn: {
        isValid: false,
      },
    }]);
  });
});
