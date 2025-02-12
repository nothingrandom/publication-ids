import validateDoi from './validate';
import parseIsbn, { type ISBNParse } from '../isbn/parse';
import sanitize from './sanitize';

export interface DoiParse {
  source: string | string[];
  isValid: boolean;
  doi?: string;
  resolve?: string;
  isbn?: Partial<ISBNParse> & {
    chapter?: string;
  };
}

const ISBN13_REGEX = /97[89][0-9]{10}/;

/**
 * Parses a source string to extract and validate DOIs.
 *
 * @param {string | string[]} source - The source string or array of strings containing potential DOIs
 * @returns {DoiParse[]} An array of objects representing the parsed IDs, including their validity and resolution URLs.
 *
 * @typedef {Object} DOIParse
 * @property {string | string[]} source - The original source string.
 * @property {string | undefined} doi - The parsed DOI, if valid.
 * @property {boolean} isValid - Indicates whether the parsed ID is valid.
 * @property {string} resolve - The URL to resolve the ID.
 */
export default (source: string | string[]): DoiParse[] => {
  const sanitizedDois = sanitize(source);

  if (!sanitizedDois.length) {
    return [{
      source,
      doi: undefined,
      isValid: false,
    }];
  }

  return sanitizedDois.map((sanitizedDoi) => {
    const isValid = validateDoi(sanitizedDoi);
    const potentialIsbnFragment = sanitizedDoi.replace(/-/g, '');
    const potentialIsbn = ISBN13_REGEX.exec(potentialIsbnFragment)?.[0] ?? '';
    const isbn = potentialIsbn ? parseIsbn(potentialIsbn)[0] : { isValid: false };

    if (isbn.isValid) {
      const [doiWithoutChapter, chapter] = sanitizedDoi.split(/[-_]/).reduce<[string, string | undefined]>((acc, part, index, array) => {
        if (index === array.length - 1 && /^\d+$/.test(part) && /10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/.test(acc[0])) {
          acc[1] = part;
        } else {
          acc[0] += (acc[0] ? '-' : '') + part;
        }
        return acc;
      }, ['', undefined]);
      const resolve = isValid ? `https://doi.org/${doiWithoutChapter}` : '';

      return {
        source,
        doi: doiWithoutChapter,
        isValid,
        resolve,
        isbn: {
          ...isbn,
          chapter,
        },
      };
    }

    const resolve = isValid ? `https://doi.org/${sanitizedDoi}` : '';

    return {
      source,
      doi: sanitizedDoi,
      isValid,
      resolve,
      isbn,
    };
  });
};
