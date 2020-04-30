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
  const DP_TABLE = [];
  for (let row = 0; row <= a.length; row++) {
    DP_TABLE[row] = [];
    for (let col = 0; col <= b.length; col++) {
      DP_TABLE[row][col] = true;
    }
  }

  let pI = 0,
    pA = 0,
    pB = 0;
  for (let row = a.length - 1; row >= 0; row--) {
    for (let col = b.length - 1; col >= 0; col--) {
      if (i[pI] === a[pA] && i[pI] === b[pB]) {
        DP_TABLE[row][col] = DP_TABLE[row + 1][col] || DP_TABLE[row][col + 1];
        if (DP_TABLE[row + 1][col]) {
          pA++;
        }
        if (DP_TABLE[row][col + 1]) {
          pB++;
        }
        pI++;
      } else if (i[pI] === a[pA]) {
        DP_TABLE[row][col] = DP_TABLE[row + 1][col];
        pI++;
        pA++;
      } else if (i[pI] === b[pB]) {
        DP_TABLE[row][col] = DP_TABLE[row][col + 1];
        pI++;
        pB++;
      } else {
        DP_TABLE[row][col] = false;
      }
    }
  }
  return DP_TABLE;
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

a = "AAB";

b = "AAC";

i = "AAAABC";

console.log(doStringsInterleave(a, b, i));
