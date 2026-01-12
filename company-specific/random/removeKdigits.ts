function removeKdigits(num: string, k: number): string {
  if (num.length === k) {
    return "0";
  }
  const STACK: number[] = [parseInt(num[0])];
  let maxPop = k;
  let i = 1;
  while (i < num.length) {
    const n = parseInt(num[i]);
    while (n < STACK[STACK.length - 1] && maxPop !== 0) {
      STACK.pop();
      maxPop--;
    }
    STACK.push(n);
    i++;
  }

  const allowedNum = Math.min(num.length - k, STACK.length);
  const result = STACK.slice(0, allowedNum);
  while (result[0] === 0) {
    result.shift();
  }

  return result.join("") || "0";
}
