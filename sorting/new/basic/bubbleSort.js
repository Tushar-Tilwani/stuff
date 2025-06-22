function selectionSort(a) {
  const len = a.length;
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (a[j - 1] > a[j]) {
        swap(a, j - 1, j);
      }
    }
  }

  return a;
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

console.log(selectionSort([2, 9, 4, 8, 1, 5]));
