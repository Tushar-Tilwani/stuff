function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (temp >= arr[j]) {
        temp = arr[j];
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }

  return arr;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(selectionSort([8, 1, 9, 2, 7]));
