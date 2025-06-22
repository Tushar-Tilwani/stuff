/**
 * k = size(arr);
 * integers appear > k/4
 * arr is soorted
 *
 * @param {Number[]} arr
 */

function popularNumbers(arr) {
  const set = new Set();
  const k = arr.length;

  const Q1 = arr[Math.floor((1 * k) / 4)];
  const Q2 = arr[Math.floor((2 * k) / 4)];
  const Q3 = arr[Math.floor((3 * k) / 4)];

  const Q1Count = findRight(arr, Q1) - findLeft(arr, Q1) + 1;
  const Q2Count = findRight(arr, Q2) - findLeft(arr, Q2) + 1;
  const Q3Count = findRight(arr, Q3) - findLeft(arr, Q3) + 1;

  Q1Count > k / 4 && set.add(Q1);
  Q2Count > k / 4 && set.add(Q2);
  Q3Count > k / 4 && set.add(Q3);

  return Array.from(set.values());
}
function findLeft(arr, val, start = 0, end = arr.length - 1) {
  if (start > end) {
    return Infinity;
  }
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] === val) {
    return Math.min(mid, findLeft(arr, val, start, mid - 1));
  } else if (val < arr[mid]) {
    return findLeft(arr, val, start, mid - 1);
  } else {
    return findLeft(arr, val, mid + 1, end);
  }
}

function findRight(arr, val, start = 0, end = arr.length - 1) {
  if (start > end) {
    return -Infinity;
  }
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] === val) {
    return Math.max(mid, findRight(arr, val, mid + 1, end));
  } else if (val < arr[mid]) {
    return findRight(arr, val, start, mid - 1);
  } else {
    return findRight(arr, val, mid + 1, end);
  }
}
const f = [0,0,0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 5];
console.log(f.length / 4, popularNumbers(f));
