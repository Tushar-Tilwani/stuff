/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const freqMap = nums.reduce((acc, num) => {
    acc.set(num, (acc.get(num) ?? 0) + 1);
    return acc;
  }, new Map());
  const entries = Array.from(freqMap.entries());
  quickSelect(entries, 0, entries.length - 1, k - 1);
  return entries.slice(0, k).map((a) => a[0]);
};

function getRandom(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function quickSelect(arr, start = 0, end = arr.length - 1, k) {
  const pivotIndex = getRandom(start, end);
  const [, pivotVal] = arr[pivotIndex];
  swap(arr, pivotIndex, start);
  let mid = start;
  for (let i = start; i <= end; i++) {
    const [, curreVal] = arr[i];
    if (curreVal > pivotVal) {
      mid += 1;
      swap(arr, mid, i);
    }
  }
  swap(arr, mid, start);
  if (mid < k) {
    return quickSelect(arr, mid + 1, end, k);
  } else if (mid > k) {
    return quickSelect(arr, start, mid - 1, k);
  }
  return arr;
}
