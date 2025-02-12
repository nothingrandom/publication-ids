import REGEX_ISBN from './regex';

const isbnRegex = new RegExp(REGEX_ISBN);

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

  const inputArray = Array.isArray(input) ? input : [...input.split(' '), input];

  const cleanIsbns = inputArray.reduce<string[]>((acc, inputString) => {
    // remove all hyphens
    const cleanInput = inputString.replace(/-/g, '');
    const matches = cleanInput.trim().match(isbnRegex)?.filter(Boolean);

    if (matches) {
      matches.forEach((candidate) => {
        acc.push(candidate.replace(/[-\s]|^ISBN(?:-1[03])?:?/g, ''));
      });
    }

    return acc;
  }, []);

  return [...new Set(cleanIsbns)];
};
