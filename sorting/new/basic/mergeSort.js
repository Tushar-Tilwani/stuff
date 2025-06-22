function quickSort_fixedPivot(arr, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return arr;
  }

  let mid = Math.floor((start + end) / 2);

  quickSort_fixedPivot(arr, start, mid);
  quickSort_fixedPivot(arr, mid + 1, end);
  const resultArr = merge(arr, start, mid, end);

  for (let i = 0; i < resultArr.length; i++) {
    arr[start + i] = resultArr[i];
  }

  return arr;
}

function merge(arr, start, mid, end) {
  let i1 = start;
  let i2 = mid + 1;
  const result = [];
  while (i1 <= mid && i2 <= end) {
    if (arr[i1] < arr[i2]) {
      result.push(arr[i1]);
      i1++;
    } else {
      result.push(arr[i2]);
      i2++;
    }
  }

  while (i1 <= mid) {
    result.push(arr[i1]);
    i1++;
  }

  while (i2 <= end) {
    result.push(arr[i2]);
    i2++;
  }

  return result;
}

console.log(quickSort_fixedPivot([2, 9, 4, 8, 1, 5]));
