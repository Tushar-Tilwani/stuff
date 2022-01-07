function quickSort_fixedPivot(arr, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return arr;
  }

  const pivotValue = arr[start];
  let pivotIndex = start;

  for (let i = start; i <= end; i++) {
    if (arr[i] < pivotValue) {
      pivotIndex += 1;
      swap(arr, i, pivotIndex);
    }
  }

  swap(arr, pivotIndex, start);

  quickSort_fixedPivot(arr, start, pivotIndex - 1);
  quickSort_fixedPivot(arr, pivotIndex + 1, end);

  return arr;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return arr;
  }

  let pivotIndex = randomInRange(start, end);
  const pivotValue = arr[pivotIndex];
  swap(arr, start, pivotIndex);
  let orange = start;
  for (let green = start + 1; green <= end; green++) {
    if (arr[green] < pivotValue) {
      orange += 1;
      swap(arr, orange, green);
    }
  }
  swap(arr, orange, start);

  quickSort(arr, start, orange - 1);
  quickSort(arr, orange + 1, end);

  return arr;
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(quickSort([4, 9, 0, 8, 1, 5]));

