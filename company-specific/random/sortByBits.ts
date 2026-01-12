function sortByBits(arr: number[]): number[] {
  const bitArray = arr.map((num) => [num, countBits(num)]);
  //   console.log(bitArray);
  return bitArray
    .sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] - b[0];
      }
      return a[1] - b[1];
    })
    .map((a) => a[0]);
}

function countBits(num: number) {
  let count = 0;
  while (num > 0) {
    count += num % 2;
    num = Math.floor(num / 2);
  }
  return count;
}
