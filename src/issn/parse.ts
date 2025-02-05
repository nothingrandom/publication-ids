import sanitize from './sanitize';
import validateIsbn from './validate';

export interface ISSNParse {
  source: string;
  isValid: boolean;
  issn?: string;
}

export default (source: string): ISSNParse[] => {
  const sanitizedIssns = sanitize(source);
  if (!sanitizedIssns.length) {
    return [{
      source,
      isValid: false,
    }];
  }

  return sanitizedIssns.map((sanitizedIssn) => {
    const isValid = validateIsbn(sanitizedIssn);

    return {
      source,
      isValid,
      ...isValid && {
        issn: sanitizedIssn,
      },
    };
  });
};
