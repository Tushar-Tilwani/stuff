function subtractProductAndSum(n: number): number {
  const digits: number[] = [];
  while (n > 0) {
    digits.push(n % 10);
    n = Math.floor(n / 10);
  }
  return digits.reduce((acc, v) => acc * v) - digits.reduce((acc, v) => acc + v);
}
