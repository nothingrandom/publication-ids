import { test, expect, describe } from 'bun:test';
import parse from '../../src/pmid/parse';

describe('pmid - parse', () => {
  test('should return invalid result for empty source', () => {
    const result = parse('');
    expect(result).toEqual([{
      source: '',
      pmid: undefined,
      pmcid: undefined,
      isValid: false,
    }]);
  });

  test('should return valid PMID result', () => {
    const result = parse('PMID: 123456');
    expect(result).toEqual([{
      source: 'PMID: 123456',
      pmid: 'PMID: 123456',
      pmcid: undefined,
      isValid: true,
      resolve: 'https://pubmed.ncbi.nlm.nih.gov/123456/',
    }]);
  });

  test('should return valid PMCID result', () => {
    const result = parse('PMC123456');
    expect(result).toEqual([{
      source: 'PMC123456',
      pmid: undefined,
      pmcid: 'PMC123456',
      isValid: true,
      resolve: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC123456/',
    }]);
  });

  test('should return invalid result for invalid ID', () => {
    const result = parse('INVALID123');
    expect(result).toEqual([{
      source: 'INVALID123',
      pmid: undefined,
      pmcid: undefined,
      isValid: false,
    }]);
  });

  test('should handle multiple IDs', () => {
    const result = parse('PMID: 123456 PMC654321');
    expect(result).toEqual([
      {
        source: 'PMID: 123456 PMC654321',
        pmid: 'PMID: 123456',
        pmcid: undefined,
        isValid: true,
        resolve: 'https://pubmed.ncbi.nlm.nih.gov/123456/',
      },
      {
        source: 'PMID: 123456 PMC654321',
        pmid: undefined,
        pmcid: 'PMC654321',
        isValid: true,
        resolve: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC654321/',
      },
    ]);
  });
});