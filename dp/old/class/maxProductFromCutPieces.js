/*
 * Complete the max_product_from_cut_pieces function below.
 */
function max_product_from_cut_pieces(n) {
  /*
   * Write your code here.
   */
  const DP = [0, 1];

  for (let i = 2; i <= n; i++) {
    DP[i] = -Infinity;
    for (let j = 1; j < i; j++) {
      DP[i] = Math.max(DP[i], j * DP[i - j], j * (i - j));
    }
  }

  //console.log(DP);

  return DP[n];
}

console.log(max_product_from_cut_pieces(3));
