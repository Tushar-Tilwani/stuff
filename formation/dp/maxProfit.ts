// Problem: Max profit with at most k stock transactions (buy+sell pairs).
// Reference video for explanation: https://www.youtube.com/watch?v=qSGdZfkQ8C8
// Current complexity: O(k * n^2) (where k = max transactions, n = number of days).
// Goal: Can be optimized to O(k * n), but this version still works correctly.

function maxProfit(k: number, prices: number[]): number {
  const len = prices.length;

  // Create a DP table with (k+1) rows and len columns.
  // TABLE[i][j] = maximum profit achievable with at most i transactions 
  // considering days [0..j] (i.e., up to and including day j).
  //
  // - Dimensions:
  //    rows    = k+1 (0 transactions up to k transactions)
  //    columns = len (0 to len-1 days)
  //
  // Initialize all values to 0.
  const TABLE = new Array(k + 1).fill(null).map(() => new Array(len).fill(0));

  // Outer loop over number of transactions allowed (1..k).
  for (let i = 1; i <= k; i++) {
    // Loop over days (1..len-1), since day 0 has no transactions possible.
    for (let j = 1; j < len; j++) {
      let sellProfit = 0; // Tracks the best profit if we sell on day j.

      const currentPrice = prices[j]; // Price of stock on current day j.

      // Try all possible earlier buy days (brute force).
      // Loop variable l = "distance from j to earlier buy day".
      // j-l gives the candidate buy day.
      for (let l = 1; l <= j; l++) {
        const tentativeBoughtPrice = prices[j - l]; // Price if we had bought earlier at (j-l).
        const tentativeSellProfit = currentPrice - tentativeBoughtPrice; 
        // Raw profit if we buy at (j-l) and sell at j.

        // Profit achievable before day (j-l), using at most (i-1) transactions.
        // NOTE: This ensures we don’t double-count transactions, because the buy/sell
        // we are considering now is the i-th transaction.
        const profitTillPreviousTransaction = TABLE[i - 1][j - l];

        // Total profit if we buy at (j-l), sell at j, and include earlier profits.
        sellProfit = Math.max(
          sellProfit, 
          tentativeSellProfit + profitTillPreviousTransaction
        );
      }

      // Option 1: Skip selling on day j → carry forward previous day's profit
      const skipProfit = TABLE[i][j - 1];

      // Option 2: Sell on day j → take the best possible profit found above
      // Take the maximum of skipping vs. selling
      TABLE[i][j] = Math.max(sellProfit, skipProfit);
    }
  }

  // Answer is in TABLE[k][len-1]:
  // max profit achievable with at most k transactions across all days
  return TABLE[k][len - 1];
}
