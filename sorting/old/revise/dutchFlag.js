function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function dutchNationalFlag(arr) {
  let left = -1;
  let middle = 0;
  let right = arr.length;

  while (middle < right) {
    if (arr[middle] === 0) {
      left++;
      swap(arr, left, middle);
      middle++;
      continue;
    }
    if (arr[middle] === 2) {
      right--;
      swap(arr, middle, right);
      continue;
    }
    middle++;
  }
  return arr;
}

console.log(dutchNationalFlag([2, 0, 2, 1, 1, 0]));
