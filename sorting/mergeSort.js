function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) {
    return arr;
  }
  const mid = Math.floor((start + end) / 2);
  mergeSort(arr, start, mid);
  mergeSort(arr, mid + 1, end);
  return merge(arr, start, mid, end);
}

function merge(arr, start, mid, end) {
  const aux = [];
  let p1 = start;
  let p2 = mid + 1;

  while (p1 <= mid && p2 <= end) {
    if (arr[p1] <= arr[p2]) {
      aux.push(arr[p1]);
      p1++;
    } else {
      aux.push(arr[p2]);
      p2++;
    }
  }

  while (p1 <= mid) {
    aux.push(arr[p1]);
    p1++;
  }

  while (p2 <= end) {
    aux.push(arr[p2]);
    p2++;
  }

  let c = 0;
  for (let i = start; i <= end; i++) {
    arr[i] = aux[c++];
  }

  return arr;
}

console.log(mergeSort([4, 3, 1, 9, 0, 2]));
