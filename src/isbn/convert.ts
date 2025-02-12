// Function to calculate ISBN-10 checksum digit
const calculateIsbn10Checksum = (isbn: string): string => {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += (i + 1) * parseInt(isbn[i], 10);
  }
  const remainder = sum % 11;
  return remainder === 10 ? 'X' : remainder.toString();
};

// Function to calculate ISBN-13 checksum digit
const calculateIsbn13Checksum = (isbn: string): string => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += (i % 2 === 0 ? 1 : 3) * parseInt(isbn[i], 10);
  }
  const remainder = sum % 10;
  return ((10 - remainder) % 10).toString();
};

// Function to convert ISBN-13 to ISBN-10
export const convertIsbn13ToIsbn10 = (isbn13: string): string => {
  const isbn10Base = isbn13.substring(3, 12);
  const checksum = calculateIsbn10Checksum(isbn10Base);
  return isbn10Base + checksum;
};

// Function to convert ISBN-10 to ISBN-13
export const convertIsbn10ToIsbn13 = (isbn10: string): string => {
  const isbn13Base = '978' + isbn10.substring(0, 9);
  const checksum = calculateIsbn13Checksum(isbn13Base);
  return isbn13Base + checksum;
};
