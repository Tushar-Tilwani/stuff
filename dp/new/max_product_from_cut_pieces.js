/**
 * @param {int32} n
 * @return {int64}
 */
function max_product_from_cut_pieces(n) {
  const TABLE = new Array(n + 1).fill(0);

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      const localMax = Math.max(TABLE[j], j) * Math.max(TABLE[i - j], i - j);
      TABLE[i] = Math.max(TABLE[i], localMax);
    }
  }

  // Write your code here.
  return TABLE[n];
}
