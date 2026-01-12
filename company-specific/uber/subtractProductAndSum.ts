function subtractProductAndSum(n: number): number {
  if (n === 0) {
    return 0;
  }
  const nums = [];
  let num = n;
  while (num > 0) {
    nums.push(num % 10);
    num = Math.floor(num / 10);
  }
  const sum = nums.reduce((acc, num) => acc + num, 0);
  const product = nums.reduce((acc, num) => acc * num, 1);

  return product - sum;
}
