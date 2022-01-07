function qSort(arr, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return arr;
  }
  const pivotIndex = getRand(start, end);
  const pivotValue = arr[pivotIndex];
  swap(arr, start, pivotIndex);

  let lp = start;
  for (let rp = start + 1; rp <= end; rp++) {
    if (arr[rp] < pivotValue) {
      lp++;
      swap(arr, lp, rp);
    }
  }
  swap(arr, start, lp);
  qSort(arr, start, lp - 1);
  qSort(arr, lp + 1, end);

  return arr;
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(qSort([5, 2, 3, 8, 1, 10, 0]));
