// Decrease and conquer

function insertionSort(arr) {
  const end = arr.length - 1;
  for (let i = 0; i <= end; i++) {
    let temp = arr[i];

    let j = i - 1;
    while (j >= 0 && temp < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = temp;
  }

  return arr;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

const inputArr = [2, 6, 1, 8, 4, 9, 5];

console.log(insertionSort(inputArr));
