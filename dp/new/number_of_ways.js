/**
 * @param {list_int32} coins
 * @param {int32} amount
 * @return {int32}
 */
 function number_of_ways(coins, amount) {
    // Write your code here.
    const result = [0];
    helper(coins, 0, 0, amount, result);
    return result[0];
  }
  
  function helper(coins, index, sum, target, result) {
    if (sum === target) {
      result[0] += 1;
      return;
    }
    if (sum > target) {
      return;
    }
    if (index >= coins.length) {
      return;
    }
    helper(coins, index, sum + coins[index], target, result);
    helper(coins, index + 1, sum, target, result);
  }
  