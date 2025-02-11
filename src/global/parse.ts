import parseDoi, { type DoiParse } from '../doi/parse';
import validateDoi from '../doi/validate';
import parseIsbn, { type ISBNParse } from '../isbn/parse';
import validateIsbn from '../isbn/validate';
import parseIssn, { type ISSNParse } from '../issn/parse';
import validateIssn from '../issn/validate';
import parsePmid, { type PMIDParse } from '../pmid/parse';
import validatePmid from '../pmid/validate';

/**
 * Parses an input string or array of strings and returns an array of parsed identifiers.
 * The identifiers can be DOI, ISBN, ISSN, or PMID.
 *
 * @param {string | string[]} input - The input string or array of strings to be parsed.
 * @returns {Array<DoiParse | ISBNParse | ISSNParse | PMIDParse>} An array of parsed identifiers.
 * Each identifier is parsed into its respective type (DOI, ISBN, ISSN, or PMID).
 * If the identifier is not valid, an object with the source and isValid set to false is returned.
 */
export default (input: string | string[]): DoiParse[] & ISBNParse[] & ISSNParse[] & PMIDParse[] => {
  const inputArray = Array.isArray(input) ? input : [...input.split(' '), input];

  return inputArray.map((id) => {
    if (validateDoi(id)) {
      return parseDoi(id);
    } else if (validateIsbn(id)) {
      return parseIsbn(id);
    } else if (validateIssn(id)) {
      return parseIssn(id);
    } else if (validatePmid(id)) {
      return parsePmid(id);
    }

    return {
      source: id,
      isValid: false,
    };
  }).flat();
};
