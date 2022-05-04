/**
 * @param {list_int32} price
 * @return {int32}
 */
function get_maximum_profit(price) {
  // Write your code here.
  const rodLen = price.length;
  const prices = [0, ...price];
  const TABLE = [0];
  for (let i = 1; i <= rodLen; i++) {
    TABLE[i] = prices[i];
    for (let j = 0; j <= Math.floor(i / 2); j++) {
      TABLE[i] = Math.max(TABLE[i], TABLE[i - j] + TABLE[j]);
    }
  }
  return TABLE[rodLen];
}
