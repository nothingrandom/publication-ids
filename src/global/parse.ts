import doiParse, { type DoiParse } from '../doi/parse';
import doiValidate from '../doi/validate';
import isbnParse, { type ISBNParse } from '../isbn/parse';
import isbnValidate from '../isbn/validate';
import issnParse, { type ISSNParse } from '../issn/parse';
import issnValidate from '../issn/validate';
import pmidParse, { type PMIDParse } from '../pmid/parse';
import pmidValidate from '../pmid/validate';

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
    if (doiValidate(id)) {
      return doiParse(id);
    } else if (isbnValidate(id)) {
      return isbnParse(id);
    } else if (issnValidate(id)) {
      return issnParse(id);
    } else if (pmidValidate(id)) {
      return pmidParse(id);
    }

    return {
      source: id,
      isValid: false,
    };
  }).flat();
};
