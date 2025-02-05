import validateDoi from './validate';
import parseIsbn, { type ISBNParse } from '../isbn/parse';
import sanitize from './sanitize';

export interface DoiParse {
  source: string;
  isValid: boolean;
  doi?: string;
  resolve?: string;
  isbn?: Partial<ISBNParse> & {
    chapter?: string;
  };
}

export default (source: string): DoiParse[] => {
  const sanitizedDois = sanitize(source);

  if (!sanitizedDois.length) {
    return [{
      source,
      doi: undefined,
      isValid: false,
    }];
  }

  return sanitizedDois.map((sanitizedDoi) => {
    const isValid = validateDoi(sanitizedDoi);
    const potentialIsbn = /97[89][0-9]{10}/.exec(sanitizedDoi)?.[0] ?? '';
    const isbn = potentialIsbn ? parseIsbn(potentialIsbn)[0] : { isValid: false };

    return {
      source,
      doi: sanitizedDoi,
      isValid,
      resolve: isValid ? `https://doi.org/${sanitizedDoi}` : '',
      isbn: {
        ...isbn,
        ...(isbn.isValid && { chapter: source.split('-')[1] ?? '' }),
      },
    };
  });
};
