function insertionSort1(a) {
  for (let i = 0; i < a.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[minIndex] > a[j]) {
        minIndex = j;
      }
    }
    swap(a, minIndex, i);
  }

  return a;
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

console.log(insertionSort1([2, 9, 4, 8, 1, 5]));
