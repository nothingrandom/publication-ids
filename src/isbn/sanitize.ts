import REGEX_ISBN from './regex';

export default (input: string | string[]): string[] => {
  if (!input) {
    return [];
  }

  const isbnRegex = new RegExp(REGEX_ISBN);
  const inputArray = Array.isArray(input) ? input : [input];

  const cleanIsbns = inputArray.reduce<string[]>((acc, inputString) => {
    const matches = inputString.trim().match(isbnRegex);

    if (matches) {
      matches.forEach((candidate) => {
        acc.push(candidate.replace(/[- ]|^ISBN(?:-1[03])?:?/g, ''));
      });
    }

    return acc;
  }, []);

  return [...new Set(cleanIsbns)];
};
