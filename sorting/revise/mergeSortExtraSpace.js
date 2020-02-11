function mergeSort(arr) {
  const len = arr.length;
  if (len <= 1) {
    return arr;
  }
  const mid = Math.floor(len / 2);
  return merge(
    mergeSort(arr.slice(0, mid)),
    mergeSort(arr.slice(mid, len))
  );
}

function merge(sortedArr1, sortedArr2) {
  let i = 0,
    j = 0;
  const result = [];
  while (i < sortedArr1.length && j < sortedArr2.length) {
    if (sortedArr1[i] <= sortedArr2[j]) {
      result.push(sortedArr1[i]);
      i++;
    } else {
      result.push(sortedArr2[j]);
      j++;
    }
  }

  while (i < sortedArr1.length) {
    result.push(sortedArr1[i]);
    i++;
  }

  while (j < sortedArr2.length) {
    result.push(sortedArr2[j]);
    j++;
  }
  return result;
}

console.log(mergeSort([5, 2, 3, 8, 1, 10, 0]));
