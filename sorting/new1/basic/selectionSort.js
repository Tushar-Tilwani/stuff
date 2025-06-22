function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let minValIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[minValIndex] > arr[j]) {
        minValIndex = j;
      }
    }
    swap(arr, i, minValIndex);
  }
  return arr;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

console.log(selectionSort([2, 6, 1, 8, 4, 9, 5]));
