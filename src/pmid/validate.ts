import { REGEX_PMID, REGEX_PMCID } from './regex';

const pmidRegex = new RegExp(`^${REGEX_PMID.source}$`, 'gi');
const pmcidRegex = new RegExp(`^${REGEX_PMCID.source}$`, 'gi');

/**
 * Validates if the given identifier could be a PubMed ID (PMID) or PubMed Central ID (PMCID).
 *
 * @param {string} identifier - The identifier string to validate.
 * @returns {boolean} `true` if the identifier could be a valid PMID or PMCID, `false` otherwise.
 */
export default (identifier: string | undefined): boolean => {
  if (!identifier) {
    return false;
  }

  return pmidRegex.test(identifier) || pmcidRegex.test(identifier);
};
