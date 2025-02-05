import REGEX_DOI from './regex';

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
    // some DOIs end with a - and numbers, dictating a chapter of an ebook
    /-\d+$/,
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

  const cleanDois = matches.map((candidate) => {
    const cleanDoi = badEndings.reduce((acc, badEnding) => {
      return acc.toString().replace(badEnding, '');
    }, candidate);

    return cleanDoi.toString().toLowerCase().trim();
  });

  return [...new Set(cleanDois)];
};
