import { test, expect, describe } from 'bun:test';
import sanitize from '../../src/issn/sanitize';

describe('issn - sanitize', () => {
  test('should return an empty array when input is null or undefined', () => {
    expect(sanitize(null)).toEqual([]);
    expect(sanitize(undefined)).toEqual([]);
    expect(sanitize('')).toEqual([]);
    expect(sanitize([])).toEqual([]);
  });

  test('should sanitize a single ISSN string', () => {
    expect(sanitize('ISSN 1234-5678')).toEqual(['12345678']);
  });

  test('should sanitize multiple ISSN strings in a single input string', () => {
    expect(sanitize('ISSN 1234-5678 ISSN 8765-4321')).toEqual(['12345678', '87654321']);
  });

  test('should sanitize an array of ISSN strings', () => {
    expect(sanitize(['ISSN 1234-5678', 'ISSN 8765-4321'])).toEqual(['12345678', '87654321']);
  });

  test('should remove duplicates from the sanitized ISSN strings', () => {
    expect(sanitize(['ISSN 1234-5678', 'ISSN 1234-5678'])).toEqual(['12345678']);
  });

  test('should handle mixed input of valid and invalid ISSN strings', () => {
    expect(sanitize(['ISSN 1234-5678', 'invalid', 'ISSN 8765-4321'])).toEqual(['12345678', '87654321']);
  });

  test('should handle input with extra spaces and different formats', () => {
    expect(sanitize([' ISSN 1234-5678 ', 'ISSN:8765-4321', 'ISSN 2345 6789', 'ISSN: 98765432'])).toEqual(['12345678', '87654321', '23456789', '98765432']);
  });
});