/*
 * Complete the 'sort_array' function below.
 *
 * The function accepts Character Array arr as parameter.
 */

function sort_array(arr) {
  // Write your code here
  const charArr = arr.map(a => a.charCodeAt(0));
  return quickSort(charArr, 0, charArr.length - 1).map(a =>
    String.fromCharCode(a)
  );

  // return arr.sort((a,b) => a.charCodeAt(0) - b.charCodeAt(0));
}

function quickSort(arr, start, end) {
  if (end <= start) {
    return arr;
  }
  const pivotIndex = getRand(start, end);
  const pivotValue = arr[pivotIndex];

  swap(arr, start, pivotIndex);

  let orange = start;
  let blue = start;

  for (let green = start + 1; green <= end; green++) {
    if (arr[green] === pivotValue) {
      orange++;
      swap(arr, orange, green);
    } else if (arr[green] < pivotValue) {
      orange++;
      swap(arr, orange, green);

      blue++;
      swap(arr, orange, blue);
    }
  }

  swap(arr, start, blue);

  quickSort(arr, start, blue - 1);
  quickSort(arr, blue + 1, end);

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

