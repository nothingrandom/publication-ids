import sanitize from './sanitize';
import validate from './validate';

export interface PMIDParse {
  source: string | string[];
  isValid: boolean;
  pmid?: string;
  pmcid?: string;
  resolve?: string;
}

/**
 * Parses a source string to extract and validate PubMed IDs (PMID) and PubMed Central IDs (PMCID).
 *
 * @param {string | string[]} source - The source string or array of strings containing potentialPMIDs or PMCIDs.
 * @returns {PMIDParse[]} An array of objects representing the parsed IDs, including their validity and resolution URLs.
 *
 * @typedef {Object} PMIDParse
 * @property {string | string[]} source - The original source string.
 * @property {string | undefined} pmid - The parsed PubMed ID, if valid.
 * @property {string | undefined} pmcid - The parsed PubMed Central ID, if valid.
 * @property {boolean} isValid - Indicates whether the parsed ID is valid.
 * @property {string} resolve - The URL to resolve the ID.
 */
export default (source: string | string[]): PMIDParse[] => {
  const sanitizedPMIDs = sanitize(source);

  if (!sanitizedPMIDs.length) {
    return [{
      source,
      pmid: undefined,
      pmcid: undefined,
      isValid: false,
    }];
  }

  return sanitizedPMIDs.map((sanitizedId) => {
    const isValid = validate(sanitizedId);
    const isPMCID = sanitizedId.startsWith('PMC');

    return {
      source,
      isValid,
      ...isPMCID
        ? {
            pmcid: sanitizedId,
            pmid: undefined,
            resolve: `https://www.ncbi.nlm.nih.gov/pmc/articles/${sanitizedId}/`,
          }
        : {
            pmid: sanitizedId,
            pmcid: undefined,
            resolve: `https://pubmed.ncbi.nlm.nih.gov/${sanitizedId.replace('PMID: ', '')}/`,
          },
    };
  });
};
