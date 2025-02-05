import { test, expect, describe } from 'bun:test';
import parse from '../../src/issn/parse';

describe('issn - parse', () => {
  test('should return invalid for empty source', () => {
    const result = parse('');
    expect(result).toEqual([{ source: '', isValid: false }]);
  });

  test('should return invalid for source with no valid ISSN', () => {
    const result = parse('invalid-issn');
    expect(result).toEqual([{ source: 'invalid-issn', isValid: false }]);
  });

  test('should return valid for source with a valid ISSN', () => {
    const result = parse('0378-5955');
    expect(result).toEqual([{ source: '0378-5955', isValid: true, issn: '03785955' }]);
  });

  test('should return multiple results for source with multiple ISSNs', () => {
    const result = parse('0378-5955, 0317-8471');
    expect(result).toEqual([
      { source: '0378-5955, 0317-8471', isValid: true, issn: '03785955' },
      { source: '0378-5955, 0317-8471', isValid: true, issn: '03178471' }
    ]);
  });
});
