import REGEX_DOI from './regex';

const doiRegex = new RegExp(`^${REGEX_DOI.source}$`, 'gi');

/**
 * Validates if the given identifier could be a DOI
 *
 * @param {string} identifier - The identifier string to validate.
 * @returns {boolean} `true` if the identifier could be a valid DOI, `false` otherwise.
 */
export default (identifier: string | undefined): boolean => {
  if (!identifier) {
    return false;
  }

  return doiRegex.test(identifier);
};
