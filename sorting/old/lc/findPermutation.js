/**
 * @param {string} s
 * @return {number[]}
 */
var findPermutation = function (s) {
  const strArr = s.split("");
  const arr = [];
  const len = strArr.length + 1;

  for (let i = 1; i <= len; i++) {
    arr.push(i);
  }

  const result = [];
  let start = 0;
  let end = null;

  for (let i = 0; i <= strArr.length; i++) {
    if (strArr[i] === "D" && (strArr[i - 1] === "I" || !strArr[i - 1])) {
      start = i;
    }

    if (strArr[i] === "D" && (strArr[i + 1] === "I" || !strArr[i + 1])) {
      end = i + 1;
      result.push([start, end]);
    }
  }

  for (const [left, right] of result) {
    reverse(arr, left, right);
  }

  return arr;
};

function reverse(arr, start, end) {
  if (start >= end) {
    return;
  }

  const mid = Math.floor((end - start) / 2);
  for (let i = 0; i <= mid; i++) {
    swap(arr, start + i, end - i);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(findPermutation("DDIDDID"));
