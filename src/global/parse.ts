import doiParse, { type DoiParse } from '../doi/parse';
import doiValidate from '../doi/validate';
import isbnParse, { type ISBNParse } from '../isbn/parse';
import isbnValidate from '../isbn/validate';
import issnParse, { type ISSNParse } from '../issn/parse';
import issnValidate from '../issn/validate';
import pmidParse, { type PMIDParse } from '../pmid/parse';
import pmidValidate from '../pmid/validate';

// Function to attempt to parse each string in the array
export default (ids: string[]): DoiParse[] & ISBNParse[] & ISSNParse[] & PMIDParse[] => {
  return ids.map((id) => {
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
