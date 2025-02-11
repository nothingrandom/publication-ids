import REGEX_ISSN from './regex';

const issnRegex = new RegExp(REGEX_ISSN, 'gi');
/**
 * Sanitizes ISSN (International Standard Serial Number) strings from the input.
 *
 * @param {string | string[]} input - The input string or array of strings to sanitize.
 * @returns {string[]} An array of unique, sanitized ISSNs.
 */
export default (input: string | string[]): string[] => {
  if (!input) {
    return [];
  }

  const inputArray = Array.isArray(input) ? input : [...input.split(' '), input];

  const cleanIssns = inputArray.reduce<string[]>((acc, inputString) => {
    const matches = inputString.trim().match(issnRegex)?.filter(Boolean);

    if (matches) {
      matches.forEach((candidate) => {
        acc.push(candidate.replace(/[-\s]|^ISSN:?/g, ''));
      });
    }

    return acc;
  }, []);

  return [...new Set(cleanIssns)];
};
