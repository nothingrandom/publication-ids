import sanitize from './sanitize';
import validateIsbn from './validate';

export interface ISSNParse {
  source: string | string[];
  isValid: boolean;
  issn?: string;
}

/**
 * Parses a given source string to extract and validate ISSNs.
 *
 * @param {string | string[]} source - The source string or array of strings containing potentialISSNs.
 * @returns {ISSNParse[]} An array of objects representing the parsed IDs, including their validity
 *
 * @typedef {Object} ISSNParse
 * @property {string | string[]} source - The original source string.
 * @property {string | undefined} issn - The parsed ISSN, if valid.
 * @property {boolean} isValid - Indicates whether the parsed ID is valid.
 */
export default (source: string | string[]): ISSNParse[] => {
  const sanitizedIssns = sanitize(source);
  if (!sanitizedIssns.length) {
    return [{
      source,
      isValid: false,
    }];
  }

  return sanitizedIssns.map((sanitizedIssn) => {
    const isValid = validateIsbn(sanitizedIssn);

    return {
      source,
      isValid,
      ...isValid && {
        issn: sanitizedIssn,
      },
    };
  });
};
