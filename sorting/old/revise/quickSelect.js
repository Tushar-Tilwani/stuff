function _qSelect(arr, k, start = 0, end = arr.length - 1) {
  const pivotIndex = getRand(start, end);
  const pivotValue = arr[pivotIndex];

  swap(arr, start, pivotIndex);

  let orange = start;
  for (let green = start + 1; green <= end; green++) {
    if (arr[green] < pivotValue) {
      orange++;
      swap(arr, orange, green);
    }
  }
  swap(arr, start, orange);
  if (k === orange) {
    return pivotValue;
  } else if (k > orange) {
    return _qSelect(arr, k, orange + 1, end);
  } else {
    return _qSelect(arr, k, start, orange - 1);
  }
}

function qSelect(arr, k) {
  const index = arr.length - k;
  if (index < 0 || k < 1) {
    return null;
  }

  return _qSelect(arr, index);
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// console.log(qSelect([5, 2, 3, 10, 8, 1, 10, 0, 4, 6, 7, 9], 1));

console.log(qSelect([5, 2, 3, 10, 8, 1, 10, 0, 4, 6, 7, 9], 1));
