/*
 * Complete the 'merge_sort' function below.
 *
 * The function accepts an integer array as parameter.
 */

function merge_sort(arr, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return arr;
  }

  const mid = Math.floor((start + end) / 2);
  merge_sort(arr, start, mid);
  merge_sort(arr, mid + 1, end);
  return merge(arr, start, mid, end);
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

  let k = start;
  for (const val of aux) {
    arr[k] = val;
    k++;
  }

  return arr;
}

console.log(merge_sort([5, 2, 3, 8, 1, 10, 0]));
