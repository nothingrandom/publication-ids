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
    '/endnote',
    '/reference',
    '/epub',
    '/text',
    '/bibtext',
  ];

  const cleanDois = matches.map((candidate) => {
    let cleanDoi = candidate.toLowerCase().trim();
    badEndings.forEach((ending) => {
      if (ending instanceof RegExp) {
        cleanDoi = cleanDoi.replace(ending, '');
      } else if (cleanDoi.endsWith(ending)) {
        cleanDoi = cleanDoi.slice(0, -ending.length);
      }
    });
    return cleanDoi;
  });

  return [...new Set(cleanDois)];
};
