function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) {
    return arr;
  }
  const mid = Math.floor(end - start / 2) + start;

  mergeSort(arr, start, mid - 1);
  mergeSort(arr, mid, end);
  merge(arr, start, mid - 1, mid, end);

  return arr;
}

function merge(arr, s1, e1, s2, e2) {
  const tempArr = [];
  let i = s1;
  let j = s2;

  while (i <= e1 && j <= e2) {
    if (arr[i] < arr[j]) {
      tempArr.push(arr[i]);
      i += 1;
      continue;
    }
    tempArr.push(arr[j]);
    j += 1;
  }

  while (i <= e1) {
    tempArr.push(arr[i]);
    i += 1;
  }

  while (j <= e2) {
    tempArr.push(arr[j]);
    j += 1;
  }

  let k = s1;
  for (const ele of tempArr) {
    arr[k++] = ele;
  }
  return arr;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

console.log(mergeSort([2, 6, 88, 82, 1, 8, 4, 9, 5]));
