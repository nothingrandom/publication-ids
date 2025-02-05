import { test, expect, describe } from 'bun:test';
import validate from '../../src/issn/validate';

describe('issn - validate', () => {
  test('should return false for undefined identifier', () => {
    expect(validate(undefined)).toBe(false);
  });

  test('should return false for invalid ISSN format', () => {
    expect(validate('1234-567')).toBe(false);
    expect(validate('1234-56789')).toBe(false);
    expect(validate('abcd-efgh')).toBe(false);
  });

  test('should return false for ISSN with invalid check digit', () => {
    expect(validate('1234-5670')).toBe(false);
    expect(validate('0317-8472')).toBe(false);
  });

  test('should return true for valid ISSN', () => {
    expect(validate('0378-5955')).toBe(true);
    expect(validate('0317-8471')).toBe(true);
  });

  test('should return true for valid ISSN with X as check digit', () => {
    expect(validate('2090-424X')).toBe(true);
  });
});