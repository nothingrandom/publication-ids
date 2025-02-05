import sanitize from './sanitize';
import validateIsbn from './validate';

export interface ISBNParse {
  source: string | string[];
  isValid: boolean;
  isbn10?: string;
  isbn13?: string;
}

/**
 * Parses a given source string to extract and validate ISBNs.
 *
 * @param {string | string[]} source - The source string or array of strings containing potential ISBNs.
 * @returns {ISBNParse[]} An array of objects representing the parsed IDs, including their validity
 *
 * @typedef {Object} ISBNParse
 * @property {string | string[]} source - The original source string.
 * @property {string | undefined} isbn10 - The parsed ISBN-10, if valid.
 * @property {string | undefined} isbn13 - The parsed ISBN-13, if valid.
 * @property {boolean} isValid - Indicates whether the parsed ID is valid.
 */
export default (source: string | string[]): ISBNParse[] => {
  const sanitizedIsbns = sanitize(source);
  if (!sanitizedIsbns.length) {
    return [{
      source,
      isValid: false,
    }];
  }

  return sanitizedIsbns.map((sanitizedIsbn) => {
    const isValid = validateIsbn(sanitizedIsbn);

    return {
      source,
      isValid,
      ...isValid && {
        isbn10: sanitizedIsbn.length === 13 ? sanitizedIsbn.slice(3, 13) : sanitizedIsbn,
        isbn13: sanitizedIsbn.length === 10 ? `978${sanitizedIsbn}` : sanitizedIsbn,
      },
    };
  });
};
