import parse from './global/parse';

import doiParse from './doi/parse';
import doiSanitize from './doi/sanitize';
import doiValidate from './doi/validate';

import isbnParse from './isbn/parse';
import isbnSanitize from './isbn/sanitize';
import isbnValidate from './isbn/validate';

import issnParse from './issn/parse';
import issnSanitize from './issn/sanitize';
import issnValidate from './issn/validate';

import pmidParse from './pmid/parse';
import pmidSanitize from './pmid/sanitize';
import pmidValidate from './pmid/validate';

// the user can import the modules like this:
// import { parse } from 'ids';
// and use the functions like this:
// parse('12345678');
export { doiParse, doiSanitize, doiValidate };
export { isbnParse, isbnSanitize, isbnValidate };
export { issnParse, issnSanitize, issnValidate };
export { pmidParse, pmidSanitize, pmidValidate };

export { parse };

// the module can also be imported like this:
// import ids from 'ids';
// and used like this:
// ids.parse('12345678');
export default {
  doiParse,
  doiSanitize,
  doiValidate,
  isbnParse,
  isbnSanitize,
  isbnValidate,
  issnParse,
  issnSanitize,
  issnValidate,
  pmidParse,
  pmidSanitize,
  pmidValidate,
  parse,
};
