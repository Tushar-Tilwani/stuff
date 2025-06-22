function mergeSort(array, start = 0, end = array.length - 1) {
  if (start >= end) {
    return array;
  }
  const mid = Math.floor((end - start) / 2) + start;
  mergeSort(array, start, mid);
  mergeSort(array, mid + 1, end);
  const mergedArr = merge(array, start, mid, array, mid + 1, end);
//   console.log(mergedArr, start, mid, end);
  for (let i = start; i <= end; i++) {
    array[i] = mergedArr[i - start];
  }
  return array;
}

function merge(arr1, start1, end1, arr2, start2, end2) {
  let i1 = start1;
  let i2 = start2;
  const result = [];
  while (i1 <= end1 && i2 <= end2) {
    if (arr1[i1] <= arr2[i2]) {
      result.push(arr1[i1]);
      i1++;
    } else {
      result.push(arr2[i2]);
      i2++;
    }
  }

  while (i1 <= end1) {
    result.push(arr1[i1]);
    i1++;
  }

  while (i2 <= end2) {
    result.push(arr2[i2]);
    i2++;
  }

  return result;
}

// Do not edit the line below.
exports.mergeSort = mergeSort;

console.log(mergeSort([8, 5, 2, 9, 5, 6, 3]));
