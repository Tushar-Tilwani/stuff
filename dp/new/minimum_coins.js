/**
 * @param {list_int32} coins
 * @param {int32} value
 * @return {int32}
 */
function minimum_coins(coins, value) {
  const TABLE = new Array(value + 1).fill(0);
  TABLE[0] = 1;
  // Write your code here.

  for (let i = 1; i <= value; i++) {
    TABLE[i] = 0;
    for (const coin of coins) {
      if (i - coin < 0) {
        continue;
      }
      TABLE[i] += TABLE[i - coin];
    }
  }
  return TABLE[value];
}
