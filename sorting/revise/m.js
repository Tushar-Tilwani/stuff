/*
 * Complete the 'merge_sort' function below.
 *
 * The function accepts an integer array as parameter.
 */

function merge_sort(arr) {
  // Write your code here
  return _merge_sort(arr, 0, arr.length - 1);
}

function _merge_sort(arr, start, end) {
  if (end <= start) {
    return arr;
  }
  // Write your code here
  const mid = Math.floor((start + end) / 2);
  _merge_sort(arr, start, mid);
  _merge_sort(arr, mid + 1, end);
  merge(arr, start, mid, end);
  //   console.log(arr);
  return arr;
}

function merge(arr, start, mid, end) {
  let i = start;
  let j = mid + 1;
  const aux = [];

  while (i <= mid && j <= end) {
    if (arr[i] <= arr[j]) {
      aux.push(arr[i]);
      i++;
    } else {
      aux.push(arr[j]);
      j++;
    }
  }

  while (i <= mid) {
    aux.push(arr[i]);
    i++;
  }

  while (j <= end) {
    aux.push(arr[j]);
    j++;
  }
  
  let c = start;
  for (const val of aux) {
    arr[c] = val;
    c++;
  }

  return arr;
}

console.log(merge_sort([5, 2, 3, 8, 1, 10, 0]));
