import REGEX_ISBN from './regex';
import sanitize from './sanitize';

// https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s13.html
export default (identifier: string | undefined): boolean => {
  if (!identifier) {
    return false;
  }

  if (!REGEX_ISBN.test(identifier)) {
    return false;
  }

  // Remove non ISBN digits, then split into an array
  const chars = sanitize(identifier)[0].split('');
  // Remove the final ISBN digit from `chars`, and assign it to `last`
  const last = chars.pop();
  let sum = 0;
  let check;

  if (chars.length === 9) {
    // Compute the ISBN-10 check digit
    for (let i = 0; i < chars.length; i++) {
      sum += (i + 1) * parseInt(chars[i], 10);
    }
    check = sum % 11;
    check = check === 10 ? 'X' : check.toString();
  } else {
    // Compute the ISBN-13 check digit
    for (let i = 0; i < chars.length; i++) {
      sum += (i % 2 === 0 ? 1 : 3) * parseInt(chars[i], 10);
    }
    check = (10 - (sum % 10)) % 10;
    check = check.toString();
  }

  return check === last;
};
