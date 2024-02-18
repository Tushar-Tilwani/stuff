function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) {
    return arr;
  }

  return helper(arr, start, end);
}

function helper(arr, start, end) {
  const pivotIndex = getRandInt(start, end);
  const pivotValue = arr[pivotIndex];
  swap(arr, start, pivotIndex);

  let leftPointer = start;
  for (let rightPointer = start + 1; rightPointer <= end; rightPointer++) {
    if (arr[rightPointer] < pivotValue) {
      leftPointer++;
      swap(arr, leftPointer, rightPointer);
    }
  }

  swap(arr, start, leftPointer);
  quickSort(arr, start, leftPointer - 1);
  quickSort(arr, leftPointer + 1, end);

  return arr;
}

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const arr = [2, 10, 13, 4, 9, 1, 6, 8, 5, 12, 17];
console.log(quickSort([2, 6, 1, 8, 4, 9, 5]));
