import { test, expect, describe } from 'bun:test';
import sanitize from '../../src/pmid/sanitize';
describe('pmid - sanitize', () => {
  test('should return an empty array when input is null or undefined', () => {
    expect(sanitize(null)).toEqual([]);
    expect(sanitize(undefined)).toEqual([]);
    expect(sanitize('')).toEqual([]);
    expect(sanitize([])).toEqual([]);
  });

  test('should return an array of sanitized PMIDs and PMCIDs from a string input', () => {
    const input = 'PMID: 12345678, PMCID: PMC1234567';
    const expectedOutput = ['PMID: 12345678', 'PMC1234567'];
    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('should return an array of sanitized PMIDs and PMCIDs from an array input', () => {
    const input = ['PMID: 12345678', 'PMCID: PMC1234567'];
    const expectedOutput = ['PMID: 12345678', 'PMC1234567'];
    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('should return an array of sanitized PMIDs and PMCIDs from an array input, even missing prefixes', () => {
    const input = ['12345678', 'PMC1234567'];
    const expectedOutput = ['12345678', 'PMC1234567'];
    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('should return unique PMIDs and PMCIDs', () => {
    const input = 'PMID: 12345678, PMID: 12345678, PMCID: PMC1234567, PMCID: PMC1234567';
    const expectedOutput = ['PMID: 12345678', 'PMC1234567'];
    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('should handle mixed case and extra spaces', () => {
    const input = '  pmid: 12345678 , pmcid: pmc1234567  ';
    const expectedOutput = ['PMID: 12345678', 'PMC1234567'];
    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('should decode URI components', () => {
    const input = 'PMID%3A%2012345678%2C%20PMCID%3A%20PMC1234567';
    const expectedOutput = ['PMID: 12345678', 'PMC1234567'];
    expect(sanitize(input)).toEqual(expectedOutput);
  });
});