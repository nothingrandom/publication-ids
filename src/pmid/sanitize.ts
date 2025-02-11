import { REGEX_PMID, REGEX_PMCID } from './regex';

/**
 * Sanitizes PubMed IDs (PMIDs) and PubMed Central IDs (PMCIDs) strings from the input
 *
 * @param {string | string[]} input - The input string or array of strings to sanitize.
 * @returns {string[]} An array of unique, sanitized PMIDs and PMCIDs.
 */
export default (input: string | string[]): string[] => {
  if (!input) {
    return [];
  }

  const inputString = Array.isArray(input) ? input.join(' ') : input;
  const decoded = decodeURIComponent(inputString);

  const pmidMatches = decoded.match(new RegExp(REGEX_PMID, 'gi')) ?? [];
  const pmcidMatches = decoded.match(new RegExp(REGEX_PMCID, 'gi')) ?? [];

  const matches = [...pmidMatches, ...pmcidMatches].filter(Boolean);

  if (!matches.length) {
    return [];
  }

  const cleanPMIDs = matches.map(candidate => candidate.toString().toUpperCase().trim());

  return [...new Set(cleanPMIDs)];
};
