const quick_select = (arr, k, start = 0, end = arr.length - 1) => {
  const pivotIndex = randomInRange(start, end);
  const pivotValue = arr[pivotIndex];
  swap(arr, start, pivotIndex);

  let lessIndex = start;
  let equalIndex = start + 1;
  let greaterIndex = end;
  //Ascesding sorting: Change line 32,36 to make it descending
  while (equalIndex <= greaterIndex) {
    if (pivotValue > arr[equalIndex]) {
      lessIndex += 1;
      swap(arr, equalIndex, lessIndex);
      equalIndex += 1;
    } else if (pivotValue < arr[equalIndex]) {
      swap(arr, equalIndex, greaterIndex);
      greaterIndex -= 1;
    } else {
      equalIndex += 1;
    }
  }
  swap(arr, start, lessIndex);

  if (k < lessIndex) {
    return quick_select(arr, k, start, lessIndex - 1);
  } else if (k > greaterIndex) {
    return quick_select(arr, k, greaterIndex + 1, end);
  } else {
    return pivotValue;
  }
};

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const arr = [1, 3, 2, 2, 5, 4, 1, 1, 2, 3];
console.log(
  "Quick Select",
  quick_select(arr, 0),
  arr.sort((a, b) => b - a)
);
