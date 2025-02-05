import { REGEX_PMID, REGEX_PMCID } from './regex';

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
