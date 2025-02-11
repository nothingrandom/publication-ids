import { test, expect, describe } from 'bun:test';
import parse from '../../src/global/parse';
describe('global - parse', () => {
  test('should return invalid for empty array', () => {
    const result = parse([]);
    expect(result).toEqual([]);
  });

  test('should return invalid for array with no valid IDs', () => {
    const result = parse(['invalid-id']);
    expect(result).toEqual([{ source: 'invalid-id', isValid: false }]);
  });

  test('should return valid for array with a valid DOI', () => {
    const result = parse(['10.1000/182']);
    expect(result).toEqual([{ source: '10.1000/182', isValid: true, doi: '10.1000/182',  resolve: 'https://doi.org/10.1000/182', isbn: { isValid: false } }]);
  });

  test('should return valid for string with a valid DOI', () => {
    const result = parse('10.1000/182');
    expect(result[0].source).toBe('10.1000/182');
  });

  test('should return valid for array with a valid ISBN', () => {
    const result = parse(['978-3-16-148410-0']);
    expect(result).toEqual([{ source: '978-3-16-148410-0', isValid: true, isbn10: '3161484100', isbn13: '9783161484100' }]);
  });

  test('should return valid for array with a valid ISSN', () => {
    const result = parse(['0378-5955']);
    expect(result).toEqual([{ source: '0378-5955', isValid: true, issn: '03785955' }]);
  });

  test('should return valid for array with a valid PMID', () => {
    const result = parse(['12345678']);
    expect(result).toEqual([{ source: '12345678', isValid: true, pmid: '12345678', resolve: 'https://pubmed.ncbi.nlm.nih.gov/12345678/' }]);
  });

  test('should return multiple results for array with multiple valid IDs', () => {
    const result = parse(['10.1000/182', '978-3-16-148410-0', '0378-5955', '12345678']);
    expect(result).toEqual([
      { source: '10.1000/182', isValid: true, doi: '10.1000/182', resolve: 'https://doi.org/10.1000/182', isbn: { isValid: false } },
      { source: '978-3-16-148410-0', isValid: true, isbn10: '3161484100', isbn13: '9783161484100' },
      { source: '0378-5955', isValid: true, issn: '03785955' },
      { source: '12345678', isValid: true, pmid: '12345678', resolve: 'https://pubmed.ncbi.nlm.nih.gov/12345678/' }
    ]);
  });

  test('should return mixed results for array with valid and invalid IDs', () => {
    const result = parse(['10.1000/182', 'invalid-id', '0378-5955']);
    expect(result).toEqual([
      { source: '10.1000/182', isValid: true, doi: '10.1000/182', resolve: 'https://doi.org/10.1000/182', isbn: { isValid: false } },
      { source: 'invalid-id', isValid: false },
      { source: '0378-5955', isValid: true, issn: '03785955' }
    ]);
  });

  test('should return mixed results for PMC ID that is also a ISSN', () => {
    const result = parse('PMC11793961');
    expect(result).toEqual([
      { source: 'PMC11793961', isValid: true, issn: '11793961' },
      { source: 'PMC11793961', isValid: true, pmcid: 'PMC11793961', pmid: undefined, resolve: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11793961/' },
    ]);
  })
});