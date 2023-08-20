function moveElementToEnd(array, toMove) {
  // Write your code here.

  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    while (array[end] === toMove) {
      end--;
    }
    if (end < 0) {
      continue;
    }
    if (array[start] === toMove) {
      swap(array, start, end);
      continue;
    }
    start++;
  }
  return array;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Do not edit the line below.
exports.moveElementToEnd = moveElementToEnd;
