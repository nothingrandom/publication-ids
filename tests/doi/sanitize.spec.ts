import { test, expect, describe } from 'bun:test';
import sanitize from '../../src/doi/sanitize';

describe('doi - sanitize', () => {
  test('should just return a valid DOI', () => {
    const doi = '10.1234/5678';
    expect(sanitize(doi)).toEqual([doi]);
  });

  test('should return multiple valid DOIs', () => {
    const dois = ['10.1234/5678', '10.1234/abcd'];
    const result = sanitize(dois);
    expect(result).toEqual(dois);
    expect(result).toHaveLength(2);
  });

  test('should remove duplicate valid DOIs', () => {
    const dois = ['10.1234/ABCD', '10.1234/abcd', '10.1234/5678'];
    expect(sanitize(dois)).toEqual(['10.1234/abcd', '10.1234/5678']);
  });

  test('should return DOI with extra slashes', () => {
    const doi = '10.1234/abcd1234/123';
    expect(sanitize(doi)).toEqual([doi]);
  });

  test('should return valid DOI, trimming hash', () => {
    const doi = '10.1234/abcd';
    expect(sanitize('10.1234/abcd#hash')).toEqual([doi]);
  });

  test('should return valid DOI, trimming trailing period', () => {
    const doi = '10.1234/abcd';
    expect(sanitize('10.1234/abcd.')).toEqual([doi]);
  });

  test('should just return a valid DOI, keeping bad endings within the DOI', () => {
    const doi = '10.1234/56pdf78';
    expect(sanitize(doi)).toEqual([doi]);

    const doi2 = '10.1234/pdf5678';
    expect(sanitize(doi2)).toEqual([doi2]);
  });

  test('should return valid DOI, trimming bad endings', () => {
    const doi = '10.1234/abcd';
    expect(sanitize('10.1234/abcd/pdf')).toEqual([doi]);
    expect(sanitize('10.1234/abcd/reference')).toEqual([doi]);
    expect(sanitize('10.1234/abcd/endnote')).toEqual([doi]);
    expect(sanitize('10.1234/abcd/epub')).toEqual([doi]);
    expect(sanitize('10.1234/abcd/text')).toEqual([doi]);
    expect(sanitize('10.1234/abcd/bibtext')).toEqual([doi]);
    expect(sanitize('10.1234/abcd/full')).toEqual([doi]);
    expect(sanitize('10.1234/abcd/html/full')).toEqual([doi]);
    expect(sanitize('10.1234/abcd.pdf')).toEqual([doi]);
    expect(sanitize('10.1234/abcdv1.full.pdf')).toEqual([doi]);
    expect(sanitize('10.1234/abcdv123.pdf')).toEqual([doi]);
  });

  test('should return valid DOI, trimming file paths', () => {
    const doi = '10.1234/abcd';
    expect(sanitize('10.1234/abcd/asset/filePath/image.gif')).toEqual([doi]);
  })

  test('should return valid DOI, trimming whitespace', () => {
    const doi = '10.1234/abcd';
    expect(sanitize('10.1234/abcd ')).toEqual([doi]);
    expect(sanitize(' 10.1234/abcd ')).toEqual([doi]);
    expect(sanitize(' 10.1234/abcd')).toEqual([doi]);
  });

  test('should return falsy, not a DOI', () => {
    expect(sanitize('some other string')).toBeEmpty();
  });

  test('should return falsy, invalid doi - missing registrant code', () => {
    const invalidDoi = '10./abcd1234';
    expect(sanitize(invalidDoi)).toBeEmpty();
  });

  test('should return falsy, invalid doi - missing slash', () => {
    const invalidDoi = '10.1234abcd1234';
    expect(sanitize(invalidDoi)).toBeEmpty();
  });

  test('should return falsy, no DOI provided', () => {
    expect(sanitize(null)).toEqual([]);
    expect(sanitize(undefined)).toEqual([]);
    expect(sanitize('')).toEqual([]);
    expect(sanitize([])).toEqual([]);
  });
});
