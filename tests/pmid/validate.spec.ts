import { test, expect, describe } from 'bun:test';
import validate from '../../src/pmid/validate';
describe('pmid - validate', () => {
  test('valid PMID', () => {
    const validPMID = '12345678';
    expect(validate(validPMID)).toBe(true);
  });

  test('valid PMID', () => {
    const validPMID = 'PMID: 12345678';
    expect(validate(validPMID)).toBe(true);
  });

  test('valid PMCID', () => {
    const validPMCID = 'PMC1234567';
    expect(validate(validPMCID)).toBe(true);
  });

  test('invalid identifier', () => {
    const invalidIdentifier = 'INVALID123';
    expect(validate(invalidIdentifier)).toBe(false);
  });

  test('empty string', () => {
    const emptyString = '';
    expect(validate(emptyString)).toBe(false);
  });

  test('null value', () => {
    const nullValue = null;
    expect(validate(nullValue as unknown as string)).toBe(false);
  });

  test('undefined value', () => {
    const undefinedValue = undefined;
    expect(validate(undefinedValue as unknown as string)).toBe(false);
  });
});