/*
 * Complete the function below.
 */
function findZeroSum(arr) {
  const sortFunc = (a, b) => a - b;
  const sortedArr = arr.sort(sortFunc);
  const len = sortedArr.length;
  const result = new Set();

  for (let i = 0; i < len; i++) {
    let sum = sortedArr[i];
    let start = 0;
    let end = len - 1;
    while (start < end) {
      if (start === i) {
        start++;
        continue;
      }

      if (end === i) {
        end--;
        continue;
      }

      if (sortedArr[start] + sortedArr[end] === -sum) {
        result.add(
          [sortedArr[start], sortedArr[end], sum].sort(sortFunc).join(",")
        );
        start++;
        end--;
      } else if (sortedArr[start] + sortedArr[end] < -sum) {
        start++;
      } else {
        end--;
      }
    }
  }
  return Array.from(result.values());
}
const g1 = [6, -1, -1, 0, 0, 1, 1];
const g = [5, -2, 2, 0, -1, 1];
const test2 = [
  22,
  -71,
  -32,
  26,
  -80,
  -1,
  -24,
  45,
  53,
  20,
  -20,
  26,
  25,
  -13,
  -11,
  45,
  27,
  50,
  -21,
  49,
  -55,
  -33,
  -40,
  28,
  21,
  -68,
  -4,
  16,
  35,
  -3,
  -44,
  -16,
  -48,
  -8,
  -80,
  -42,
  -66,
  61,
  -51,
  -20,
  2,
  65,
  -5,
  -7,
  22,
  -6,
  12,
  -49,
  13,
  -80,
  49,
  39,
  -9,
  3,
  41,
  25,
  0,
  -25,
  -16,
  -33,
  21,
  13,
  -17,
  40,
  43,
  -15,
  -29,
  24,
  -1,
  -34,
  -41,
  -28,
  -14,
  34,
  -9,
  -78,
  0,
  -7,
  -31,
  9,
  44,
  47,
  -17,
  -29,
  40,
  -57,
  -20,
  -38,
  -21,
  -13,
  -4,
  -28,
  11
];

console.log(findZeroSum(test2));
