import sanitize from './sanitize';
import validate from './validate';

export interface PMIDParse {
  source: string;
  isValid: boolean;
  pmid?: string;
  pmcid?: string;
  resolve?: string;
}

export default (source: string): PMIDParse[] => {
  const sanitizedPMIDs = sanitize(source);

  if (!sanitizedPMIDs.length) {
    return [{
      source,
      pmid: undefined,
      pmcid: undefined,
      isValid: false,
    }];
  }

  return sanitizedPMIDs.map((sanitizedId) => {
    const isValid = validate(sanitizedId);
    const isPMCID = sanitizedId.startsWith('PMC');

    return {
      source,
      isValid,
      ...isPMCID
        ? {
            pmcid: sanitizedId,
            pmid: undefined,
            resolve: `https://www.ncbi.nlm.nih.gov/pmc/articles/${sanitizedId}/`,
          }
        : {
            pmid: sanitizedId,
            pmcid: undefined,
            resolve: `https://pubmed.ncbi.nlm.nih.gov/${sanitizedId.replace('PMID: ', '')}/`,
          },
    };
  });
};
