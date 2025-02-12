import { test, expect, describe } from 'bun:test';
import parse from '../../src/doi/parse';

describe('doi - parse', () => {
  test('should return valid DOI with valid ISBN (no hyphen) and chapter (hyphenated)', () => {
    const result = parse('10.4324/9780203765449-11');
    expect(result).toEqual([{
      source: '10.4324/9780203765449-11',
      doi: '10.4324/9780203765449',
      isValid: true,
      resolve: 'https://doi.org/10.4324/9780203765449',
      isbn: {
        isValid: true,
        source: '9780203765449',
        isbn10: '0203765443',
        isbn13: '9780203765449',
        chapter: '11',
      },
    }]);
  });

  test('should return valid DOI with valid ISBN (hyphenated) and chapter (underscore)', () => {
    const result = parse('10.1007/978-981-15-2329-8_6');
    expect(result).toEqual([{
      source: '10.1007/978-981-15-2329-8_6',
      doi: '10.1007/978-981-15-2329-8',
      isValid: true,
      resolve: 'https://doi.org/10.1007/978-981-15-2329-8',
      isbn: {
        isValid: true,
        source: '9789811523298',
        isbn10: '9811523290',
        isbn13: '9789811523298',
        chapter: '6',
      },
    }]);
  });

  test('should return valid DOI with valid ISBN (hyphenated) and chapter (hyphenated)', () => {
    const result = parse('10.1007/978-981-15-2329-8-6');
    expect(result).toEqual([{
      source: '10.1007/978-981-15-2329-8-6',
      doi: '10.1007/978-981-15-2329-8',
      isValid: true,
      resolve: 'https://doi.org/10.1007/978-981-15-2329-8',
      isbn: {
        isValid: true,
        source: '9789811523298',
        isbn10: '9811523290',
        isbn13: '9789811523298',
        chapter: '6',
      },
    }]);
  });

  test('should return valid DOI with valid ISBN (prefixed) with tricky non-chapter', () => {
    const result = parse('10.1016/B978-0-12-819714-1.00020-8');
    expect(result).toEqual([{
      source: '10.1016/B978-0-12-819714-1.00020-8',
      doi: '10.1016/b978-0-12-819714-1.00020-8',
      isValid: true,
      resolve: 'https://doi.org/10.1016/b978-0-12-819714-1.00020-8',
      isbn: {
        isValid: true,
        source: '9780128197141',
        isbn10: '0128197145',
        isbn13: '9780128197141',
        chapter: undefined,
      },
    }]);
  })

  test('should return valid DOI without ISBN and chapter', () => {
    const result = parse('10.48550/arXiv.2307.12108');
    expect(result).toEqual([{
      source: '10.48550/arXiv.2307.12108',
      doi: '10.48550/arxiv.2307.12108',
      isValid: true,
      resolve: 'https://doi.org/10.48550/arxiv.2307.12108',
      isbn: {
        isValid: false,
      },
    }]);
  });

  test('sanity checks', () => {
    expect(parse('10.1007/s11831-023-09928-7')[0]).toEqual(
      {
        source: '10.1007/s11831-023-09928-7',
        doi: '10.1007/s11831-023-09928-7',
        isValid: true,
        resolve: 'https://doi.org/10.1007/s11831-023-09928-7',
        isbn: {
          isValid: false,
        }
      }
    );
    expect(parse('10.1007/s00521-022-07662-y')[0]).toEqual(
      {
        source: '10.1007/s00521-022-07662-y',
        doi: '10.1007/s00521-022-07662-y',
        isValid: true,
        resolve: 'https://doi.org/10.1007/s00521-022-07662-y',
        isbn: {
          isValid: false,
        }
      }
    );
    expect(parse('10.1007/s12070-023-03779-1')[0]).toEqual(
      {
        source: '10.1007/s12070-023-03779-1',
        doi: '10.1007/s12070-023-03779-1',
        isValid: true,
        resolve: 'https://doi.org/10.1007/s12070-023-03779-1',
        isbn: {
          isValid: false,
        }
      }
    );
  })

  test('should return invalid DOI', () => {
    const result = parse('invalid-doi');
    expect(result).toEqual([{
      source: 'invalid-doi',
      doi: undefined,
      isValid: false,
    }]);

    expect(result[0].resolve).toBeUndefined();
  });

  test('should return valid DOI with invalid ISBN', () => {
    const result = parse('10.4324/1234567890123-11');
    expect(result).toEqual([{
      source: '10.4324/1234567890123-11',
      doi: '10.4324/1234567890123-11',
      isValid: true,
      resolve: 'https://doi.org/10.4324/1234567890123-11',
      isbn: {
        isValid: false,
      },
    }]);
  });
});
