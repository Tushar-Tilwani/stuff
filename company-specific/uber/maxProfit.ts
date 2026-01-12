function maxProfit(prices: number[]): number {
  let min = Infinity;
  let result = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] > min) {
      result = Math.max(result, prices[i] - min);
    }
    min = Math.min(min, prices[i]);
  }
  return result;
}
