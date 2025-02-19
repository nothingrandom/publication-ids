# publication-ids
Javascript / Typescript validator and parse for publication ids; DOI, PMID, PMCID, ISBN, and ISSN.
Allows for validation of publication ids and parsing of publication ids from text.

## Installation
```bash
npm install publication-ids
```

## Usage
```ts
import PublicationIds from 'publication-ids';

// To guess the type of publication id, use the parse function.
// Parse will return an **array** of all possible publication ids that can be parsed from the input.
// The input can be a string or an array of strings.
const ids = PublicationIds.parse('10.1234/5678');
ids.map(id => {
  console.log(id);
  /*
    {
      source: '10.1234/5678';
      isValid: true;
      doi: '10.1234/5678';
      resolve: https://doi.org/10.1234/5678;
    }
  */
});

const dois = PublicationIds.parseDoi('10.1234/5678')
dois.map(doi => {
  console.log(doi);
  /*
    {
      source: '10.1234/5678';
      isValid: true;
      doi: '10.1234/5678';
      resolve: https://doi.org/10.1234/5678;
    }
  */

  // Due to the nature of the DOI system, it is not possible to validate a DOI without resolving it.
  fetch(doi.resolve)
    .then(response => response.ok)
});

const isbns = PublicationIds.parseIsbn('978-3-16-148410-0');
isbns.map(isbn => {
  console.log(isbn);
  /*
    {
      source: '978-3-16-148410-0',
      isValid: true,
      isbn10: '3161484100',
      isbn13: '9783161484100',
    }
  */

 // ISBNs can be validated without resolving them, due to a checksum in the ISBN.
});

const issns = PublicationIds.parseIssn('0378-5955');
issns.map(issn => {
  console.log(issn);
  /*
    {
      source: '0378-5955',
      isValid: true,
      issn: '03785955',
    }
  */

 // ISSNs can be validated without resolving them, due to a checksum in the ISBN.
});

// PMIDs and PMCIDs can be parsed using the same function.
const pmids = PublicationIds.parsePmid('PMC123456')
pmids.map(pmid => {
  console.log(pmid);
  /*
    {
      source: 'PMC123456';
      isValid: true;
      pmid: 'PMC123456';
      resolve: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC123456/;
    }
  */

  // Due to the nature of the PMID & PMCID system, it is not possible to validate a DOI without resolving it.
  fetch(doi.resolve)
    .then(response => response.ok)
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
