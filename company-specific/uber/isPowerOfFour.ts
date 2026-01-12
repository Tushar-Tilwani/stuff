function isPowerOfFour(n: number): boolean {
  if (n === 1) {
    return true;
  }
  if (!Number.isInteger(n) || n <= 0) {
    return false;
  }
  return isPowerOfFour(n / 4);
}
