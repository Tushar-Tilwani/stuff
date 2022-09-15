/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (num, k) {
  const result = [];
  const arr1 = numberToArray(k);
  const arr2 = num.reverse();
  const len = Math.max(arr2.length, arr1.length);
  let remainder = 0;
  for (let i = 0; i < len; i++) {
    const value = (arr2[i] ?? 0) + (arr1[i] ?? 0) + remainder;
    remainder = Math.floor(value / 10);

    result.push(value % 10);
  }

  if (remainder > 0) {
    result.push(remainder);
  }

  return result.reverse();
};

function numberToArray(num) {
  const result = [];
  while (num > 0) {
    result.push(num % 10);
    num = Math.floor(num / 10);
  }
  return result;
}
