import REGEX_DOI from './regex';

/**
 * Sanitizes DOIs strings from the input
 *
 * @param {string | string[]} input - The input string or array of strings to sanitize.
 * @returns {string[]} An array of unique, sanitized DOIs.
 */
export default (input: string | string[]): string[] => {
  if (!input) {
    return [];
  }

  const doiRegex = new RegExp(REGEX_DOI, 'gi');
  const inputString = Array.isArray(input) ? input.join(' ') : input;
  const decoded = decodeURIComponent(inputString);
  const matches = decoded.match(doiRegex)?.filter(Boolean);

  if (!matches) {
    return [];
  }

  const badEndings = [
    // 10.1234/5678v1.pdf
    /v.*\.pdf/,
    // 10.1234/5678/asset/filePath/image.gif
    /\/asset\/.*/,
    // PubMed sometimes adds a dot at the end of the DOI
    /\.$/,
    // other bad endings
    '.full.pdf',
    '.full.html',
    '.full.htm',
    '.full.txt',
    '.pdf',
    '.html',
    '.htm',
    '.txt',
    '.full',
    '/full',
    '/html',
    '/abstract',
    '/full/html',
    '/html/full',
    '/pdf',
  ];

  const badEndingsRegex = new RegExp(badEndings.map(ending => ending instanceof RegExp ? ending.source : ending.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gi');

  const cleanDois = matches.map(candidate => candidate.replace(badEndingsRegex, '').toLowerCase().trim());

  return [...new Set(cleanDois)];
};
