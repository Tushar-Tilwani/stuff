function fixedPoint(arr: number[]): number {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (arr[mid] < mid) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return arr[start] !== start ? -1 : start;
}
