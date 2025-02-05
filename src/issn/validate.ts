import REGEX_ISSN from './regex';
import sanitize from './sanitize';

/**
 * Validates an ISSN (International Standard Serial Number).
 *
 * @param {string} identifier - The ISSN to validate.
 * @returns {boolean} `true` if the ISSN is valid, `false` otherwise.
 */
export default (identifier: string | undefined): boolean => {
  if (!identifier) {
    return false;
  }

  if (!REGEX_ISSN.test(identifier)) {
    return false;
  }

  // Remove non ISSN digits, then split into an array
  const chars = sanitize(identifier)[0].split('');
  // Remove the final ISBN digit from `chars`, and assign it to `last`
  const last = chars.pop();
  let sum = 0;

  for (let i = 0; i < chars.length; i++) {
    sum += parseInt(chars[i], 10) * (8 - i);
  }

  const remainder = sum % 11;
  const checkDigit = remainder === 0 ? '0' : (11 - remainder === 10 ? 'X' : (11 - remainder).toString());

  return checkDigit === last;
};
