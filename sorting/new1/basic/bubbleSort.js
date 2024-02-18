// Decrease and conquer

function insertionSort(arr) {
  helper(arr, arr.length - 1);
  return arr;
}

function helper(arr, startIndex) {
  if (startIndex < 0) {
    return;
  }
  const endIndex = arr.length - 1;
  for (let i = startIndex; i < endIndex; i++) {
    if (arr[i] > arr[i + 1]) {
      swap(arr, i, i + 1);
    }
  }
  helper(arr, startIndex - 1);
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}


const inputArr = [2, 6, 1, 8, 4, 9, 5];

console.log(insertionSort(inputArr));
