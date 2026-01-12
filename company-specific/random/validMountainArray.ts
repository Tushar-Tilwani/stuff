function validMountainArray(arr: number[]): boolean {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] > arr[i + 1]) {
      break;
    }
    i++;
  }

  while (i < arr.length) {
    if (arr[i] < arr[i + 1]) {
      break;
    }
    i++;
  }

  return i === arr.length;
}
