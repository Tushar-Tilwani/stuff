// needed a hint on monotonic stack
function finalPrices(prices: number[]): number[] {
  const result: number[] = prices;
  const STACK = [-1];
  for (let i = 0; i < prices.length; i++) {
    const currPrice = prices[i];
    while (prices[STACK[STACK.length - 1]] >= currPrice) {
      const prevIndex = STACK.pop() ?? -1;
      if (prevIndex >= 0) {
        result[prevIndex] -= currPrice;
      }
    }

    STACK.push(i);
  }

  return result;
}
