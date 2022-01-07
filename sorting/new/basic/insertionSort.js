function insertionSort1(a, max = a.length - 1) {
  if (max <= 0) {
    return a;
  }

  const lastVal = a[max];
  let swapIndex = max;
  const arr = insertionSort1(a, max - 1);
  // const arr = a;

  for (let i = 0; i < max; i++) {
    if (arr[max] < arr[i]) {
      swapIndex = i;
      break;
    }
  }

  //Left Shift
  for (let i = max; i > swapIndex; i--) {
    // console.log(i);
    swap(arr, i, i - 1);
    // console.log(arr);
  }

  arr[swapIndex] = lastVal;
  return arr;
}

function insertionSort2(a, max = a.length - 1) {
  if (max <= 0) {
    return a;
  }
  const arr = insertionSort2(a, max - 1);
  // const arr = a;
  const lastVal = arr[max];

  for (let i = max - 1; i >= 0; i--) {
    if (lastVal < arr[i]) {
      swap(arr, i, i + 1);
    } else {
      //arr[i] = lastVal;
      break;
    }
  }

  return arr;
}

function insertionSort3(a, max = a.length - 1) {
  if (max <= 0) {
    return a;
  }
  const arr = insertionSort3(a, max - 1);
  // const arr = a;
  const lastVal = arr[max];

  for (let i = max - 1; i >= 0; i--) {
    if (lastVal < arr[i]) {
      arr[i + 1] = arr[i];
    } else {
      arr[i + 1] = lastVal;
      break;
    }
  }

  return arr;
}

function insertionSort4(a, max = a.length - 1) {
  if (max <= 0) {
    return a;
  }
  const lastVal = a[max];

  const arr = insertionSort4(a, max - 1);
  for (let i = max - 1; i >= 0; i--) {
    if (lastVal < arr[i]) {
      arr[i + 1] = arr[i];
    } else {
      arr[i + 1] = lastVal;
      break;
    }
  }
  return arr;
}

function insertionSort5(a, max = a.length - 1) {
  if (max <= 0) {
    return a;
  }
  const lastVal = a[max];
  const newMax = max - 1;
  const arr = insertionSort5(a, newMax);
  let i = newMax;
  while (lastVal < arr[i] && i >= 0) {
    arr[i + 1] = arr[i];
    i--;
  }
  arr[i + 1] = lastVal;
  return arr;
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

//insertionSort5 is the best implementation
console.log(insertionSort5([1, 3, 2, 6, 5, 8, 9]));
