function qSort(arr, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return;
  }

  let pIndex = getRandIndex(start, end);
  let pivot = arr[pIndex];
  swap(arr, pIndex, start);

  let left = start;
  let right = start + 1;

  while (right <= end) {
    if (pivot > arr[right]) {
      swap(arr, left + 1, right);
      left++;
    }
    right += 1;
  }

  swap(arr, start, left);

  qSort(arr, start, left - 1);
  qSort(arr, left + 1, end);
}

function getRandIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [4, 1, 5, 3, 2, 7, 6];
qSort(arr);
console.log(arr);

/*
 * Complete the function below.
 */

/*
 * Complete the function below.
 */
function solve(arr) {
  if (!(arr && arr.length)) {
    return arr;
  }
  let left = -1;
  let right = 0;

  while (right < arr.length) {
    if (arr[right] % 2 === 0) {
      swap(arr, left + 1, right);
      left++;
    }
    right++;
  }
  return arr;
}

const arr1 = [1, 2, 3, 4];
solve(arr);

console.log(arr);
