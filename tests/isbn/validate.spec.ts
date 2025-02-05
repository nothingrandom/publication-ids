import { test, expect, describe } from 'bun:test';
import validate from '../../src/isbn/validate';
describe('isbn - validate', () => {
  test('valid ISBN-10 without hyphens', () => {
    expect(validate('0306406152')).toBe(true);
  });

  test('valid ISBN-10 with hyphens', () => {
    expect(validate('0-306-40615-2')).toBe(true);
  });

  test('valid ISBN-10 with spaces', () => {
    expect(validate('0 306 40615 2')).toBe(true);
  });

  test('invalid ISBN-10', () => {
    expect(validate('0306406153')).toBe(false);
  });

  test('valid ISBN-13 without hyphens', () => {
    expect(validate('9780306406157')).toBe(true);
  });

  test('valid ISBN-13 with hyphens', () => {
    expect(validate('978-0-306-40615-7')).toBe(true);
  });

  test('valid ISBN-13 with spaces', () => {
    expect(validate('978 0 306 40615 7')).toBe(true);
  });

  test('invalid ISBN-13', () => {
    expect(validate('9780306406158')).toBe(false);
  });

  test('invalid format', () => {
    expect(validate('123456789')).toBe(false);
  });

  test('empty string', () => {
    expect(validate('')).toBe(false);
  });
});