import REGEX_DOI from './regex';

export default (identifier: string): boolean => {
  const doiRegex = new RegExp(`^${REGEX_DOI.source}$`, 'gi');
  return doiRegex.test(identifier);
};
