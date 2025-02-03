import validateDoi from './validate';
import parseIsbn, { type ISBNParse } from '../isbn/parse';
import sanitize from './sanitize';

interface DoiParse {
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
    const valid = validateDoi(sanitizedDoi);

    const potentialIsbn = /97[89][0-9]{10}/.exec(sanitizedDoi)?.[0] ?? '';
    let isbn = {
      isValid: false,
    };

    if (potentialIsbn) {
      isbn = parseIsbn(potentialIsbn)[0];
    }

    return {
      source,
      doi: sanitizedDoi,
      isValid: valid,
      resolve: valid ? `https://doi.org/${sanitizedDoi}` : '',
      isbn: {
        ...isbn,
        ...isbn.isValid && {
          chapter: source.split('-')[1] ?? '',
        },
      },
    };
  });
};
