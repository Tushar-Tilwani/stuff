/*
 * Complete the 'doStringsInterleave' function below.
 *
 * The function is expected to return a BOOLEAN.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 *  3. STRING i
 */

function doStringsInterleave(a, b, i) {
  // Write your code here
  return helper(a, 0, b, 0, i, 0);
}

function helper(a, pA, b, pB, i, pI) {
  if (pA === a.length && pB === b.length && pI === i.length) {
    return true;
  }
  if (a[pA] === i[pI] && b[pB] === i[pI]) {
    return (
      helper(a, pA + 1, b, pB, i, pI + 1) || helper(a, pA, b, pB + 1, i, pI + 1)
    );
  }

  if (a[pA] === i[pI]) {
    return helper(a, pA + 1, b, pB, i, pI + 1);
  }

  if (b[pB] === i[pI]) {
    return helper(a, pA, b, pB + 1, i, pI + 1);
  }

  return false;
}

var a, b, i;

// a = "123";

// b = "456";

// i = "123456";

// a = "AAB";

// b = "AAC";

// i = "AAAABC";

// a = "AAB"

// b = "AAC"

// i = "AAABAC"

(a = "aabcc"), (b = "dbbca"), (i = "aadbbbaccc");

a = "AAABC";
b = "ADEFG";

i = "AADAABCEFG";

console.log(doStringsInterleave(a, b, i));
