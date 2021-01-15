/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const DP_TABLE = [];
  for (let i = 0; i < prices.length; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j < prices.length; j++) {
      DP_TABLE[i].push(0);
    }
  }

  for (let i = 0; i < prices.length; i++) {
    for (let j = 0; j < prices.length; j++) {
      const profit = prices[j] - prices[i];
      if (j > i && profit > 0) {
        DP_TABLE[j][i] = profit;
      }
    }
  }

  const resultArr = new Array(prices.length).fill(0).map(() => []);

  for (let i = 0; i < prices.length; i++) {
    for (let j = 0; j < prices.length; j++) {
      resultArr[Math.abs(i - j)].push(DP_TABLE[i][j]);
    }
  }
  console.log(DP_TABLE);

  let result = 0;

  for (const arr of resultArr) {
    result = Math.max(result, getAlternateMax(arr, 0), getAlternateMax(arr, 1));
  }

  return result;
};

function getAlternateMax(arr, start) {
  let result = 0;
  for (i = start; i < arr.length; i = i + 2) {
    result += arr[i];
  }
  return result;
}

const arr = [1, 4, 3, 5];
const arr1 = [3, 3, 5, 0, 0, 3, 1, 4];

console.log(maxProfit(arr1));

