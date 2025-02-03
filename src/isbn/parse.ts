import sanitize from './sanitize';
import validateIsbn from './validate';

export interface ISBNParse {
  source: string;
  isValid: boolean;
  isbn10?: string;
  isbn13?: string;
}

export default (source: string): ISBNParse[] => {
  const sanitizedIsbns = sanitize(source);
  if (!sanitizedIsbns.length) {
    return [{
      source,
      isValid: false,
    }];
  }

  return sanitizedIsbns.map((sanitizedIsbn) => {
    const valid = validateIsbn(sanitizedIsbn);

    return {
      source,
      isValid: valid,
      ...valid && {
        isbn10: sanitizedIsbn.length === 13 ? sanitizedIsbn.slice(3, 13) : sanitizedIsbn,
        isbn13: sanitizedIsbn.length === 10 ? `978${sanitizedIsbn}` : sanitizedIsbn,
      },
    };
  });
};
