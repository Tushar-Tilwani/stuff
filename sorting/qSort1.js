function qSort(arr, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return arr;
  }
  // console.log(start, end);
  const pivotIndex = getRandIndex(start, end);
  const pivotValue = arr[pivotIndex];
  swap(arr, start, pivotIndex);
  let orange = start;
  for (let green = start + 1; green <= end; green++) {
    if (arr[green] < pivotValue) {
      orange++;
      swap(arr, orange, green);
    }
  }
  swap(arr, orange, start);

  qSort(arr, start, orange - 1);
  qSort(arr, orange + 1, end);
  return arr;
}

function getRandIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(qSort([2, 3, 1, 6, 4, 9]));
