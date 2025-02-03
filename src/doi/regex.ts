// https://www.crossref.org/blog/dois-and-matching-regular-expressions/
const REGEX_DOI = /(10.\d{4,9}\/[-._;()/:A-Z0-9]+)/gi;

export default REGEX_DOI;
