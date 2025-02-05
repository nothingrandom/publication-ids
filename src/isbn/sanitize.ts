import REGEX_ISBN from './regex';

/**
 * Sanitizes ISBN (International Standard Book Number) strings from the input.
 *
 * @param {string | string[]} input - The input string or array of strings to sanitize.
 * @returns {string[]} An array of unique, sanitized ISBNs.
 */
export default (input: string | string[]): string[] => {
  if (!input) {
    return [];
  }

  const isbnRegex = new RegExp(REGEX_ISBN);
  const inputArray = Array.isArray(input) ? input : [...input.split(' '), input];

  const cleanIsbns = inputArray.reduce<string[]>((acc, inputString) => {
    const matches = inputString.trim().match(isbnRegex)?.filter(Boolean);

    if (matches) {
      matches.forEach((candidate) => {
        acc.push(candidate.replace(/[-\s]|^ISBN(?:-1[03])?:?/g, ''));
      });
    }

    return acc;
  }, []);

  return [...new Set(cleanIsbns)];
};
