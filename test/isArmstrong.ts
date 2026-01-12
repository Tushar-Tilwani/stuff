function isArmstrong(n: number): boolean {
  let num = n;
  const nums: number[] = [];
  while (num > 0) {
    nums.push(num % 10);
    num = Math.floor(num / 10);
  }
  const k = nums.length;
  const sum = nums.reduce((acc, val) => acc + Math.pow(val, k), 0);
  return sum === n;
}
