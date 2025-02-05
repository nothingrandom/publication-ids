import { REGEX_PMID, REGEX_PMCID } from './regex';

export default (identifier: string): boolean => {
  const pmidRegex = new RegExp(`^${REGEX_PMID.source}$`, 'gi');
  const pmcidRegex = new RegExp(`^${REGEX_PMCID.source}$`, 'gi');
  return pmidRegex.test(identifier) || pmcidRegex.test(identifier);
};
