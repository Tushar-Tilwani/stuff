function qSort(arr, start = 0, end = arr.length - 1) {
  if (!(start < end || start < 0 || end > arr.length)) {
    return;
  }
  const pivot = arr[end];
  let leftPointer = start;
  let rightPointer = start;
  while (rightPointer < end) {
    if (arr[rightPointer] > pivot) {
      rightPointer += 1;
    } else {
      swap(arr, leftPointer, rightPointer);
      leftPointer += 1;
      rightPointer += 1;
    }
  }
  swap(arr, leftPointer + 1, end);
  // qSort(arr, start, leftPointer);
  // qSort(arr, rightPointer, end);
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
