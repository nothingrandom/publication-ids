import parse from './global/parse';

import parseDoi from './doi/parse';
import sanitizeDoi from './doi/sanitize';
import validateDoi from './doi/validate';

import parseIsbn from './isbn/parse';
import sanitizeIsbn from './isbn/sanitize';
import validateIsbn from './isbn/validate';

import parseIssn from './issn/parse';
import sanitizeIssn from './issn/sanitize';
import validateIssn from './issn/validate';

import parsePmid from './pmid/parse';
import sanitizePmid from './pmid/sanitize';
import validatePmid from './pmid/validate';

export { parseDoi, sanitizeDoi, validateDoi };
export { parseIsbn, sanitizeIsbn, validateIsbn };
export { parseIssn, sanitizeIssn, validateIssn };
export { parsePmid, sanitizePmid, validatePmid };

export { parse };

export default {
  parseDoi,
  sanitizeDoi,
  validateDoi,
  parseIsbn,
  sanitizeIsbn,
  validateIsbn,
  parseIssn,
  sanitizeIssn,
  validateIssn,
  parsePmid,
  sanitizePmid,
  validatePmid,
  parse,
};
