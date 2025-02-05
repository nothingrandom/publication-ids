import REGEX_ISSN from './regex';

export default (input: string | string[]): string[] => {
  if (!input) {
    return [];
  }

  const issnRegex = new RegExp(REGEX_ISSN, 'gi');
  const inputArray = Array.isArray(input) ? input : [...input.split(' '), input];

  const cleanIssns = inputArray.reduce<string[]>((acc, inputString) => {
    const matches = inputString.trim().match(issnRegex)?.filter(Boolean);

    if (matches) {
      matches.forEach((candidate) => {
        acc.push(candidate.replace(/[-\s]|^ISSN:?/g, ''));
      });
    }

    return acc;
  }, []);

  return [...new Set(cleanIssns)];
};
