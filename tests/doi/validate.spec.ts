import { test, expect, describe } from 'bun:test';
import validate from '../../src/doi/validate';

describe('doi - validate', () => {
  test('should return true for a valid DOI', () => {
    expect(validate('10.1234/5678')).toBeTrue();
  });

  test('should return false for an invalid string', () => {
    expect(validate('some other string')).toBeFalse();
  });
});
