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
  const tuples = Array.from(freqMap.entries());
  quickSelect(tuples, k - 1);
  return tuples.slice(0, k).map(([key]) => key);
};

function quickSelect(tuples, k, start = 0, end = tuples.length - 1) {
  const pivotIndex = getRandom(start, end);
  const [, pivotvalue] = tuples[pivotIndex];
  swap(tuples, start, pivotIndex);
  let mid = start;
  for (let i = start + 1; i <= end; i++) {
    const [, value] = tuples[i];
    if (value > pivotvalue) {
      mid++;
      swap(tuples, i, mid);
    }
  }
  swap(tuples, start, mid);

  if (mid < k) {
    return quickSelect(tuples, k, mid + 1, end);
  }

  if (mid > k) {
    return quickSelect(tuples, k, start, mid - 1);
  }

  return tuples;
}

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return temp;
};

//console.log(topKFrequent([10, 10, 10, 20, 20, 30, 30, 30, 30, 30, 50, 50, 50, 50, 20, 70], 2));
