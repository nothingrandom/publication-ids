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

/**
 * Parses a source string to extract and validate DOIs.
 *
 * @param {string | string[]} source - The source string or array of strings containing potential DOIs
 * @returns {DOIParse[]} An array of objects representing the parsed IDs, including their validity and resolution URLs.
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

  return sanitizedDois.map((sanitizedDoi, index) => {
    const isValid = validateDoi(sanitizedDoi);
    const potentialIsbn = /97[89][0-9]{10}/.exec(sanitizedDoi)?.[0] ?? '';
    const isbn = potentialIsbn ? parseIsbn(potentialIsbn)[0] : { isValid: false };

    if (isbn.isValid) {
      const sourceArray = Array.isArray(source) ? source : source.split(' ');
      const chapter = sourceArray[index].split('-')[1] ?? '';

      return {
        source,
        doi: sanitizedDoi,
        isValid,
        resolve: isValid ? `https://doi.org/${sanitizedDoi}` : '',
        isbn: {
          ...isbn,
          chapter,
        },
      };
    }

    return {
      source,
      doi: sanitizedDoi,
      isValid,
      resolve: isValid ? `https://doi.org/${sanitizedDoi}` : '',
      isbn,
    };
  });
};
